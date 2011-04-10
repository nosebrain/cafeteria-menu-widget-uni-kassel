<?php

  include_once 'parser.php';
  
  class CafeteriaParser implements Parser {
    
    private static $MAIN_CONTENT = '/<table cellpadding="4" cellspacing="0" width="899">(.*)<\/html>/';
    private static $WEEK = '/Speiseplan vom&nbsp;([0-9]{2}.[0-9]{2}). (.*|-|bis) ([0-9]{2}.[0-9]{2}.[0-9]{4})/';
    private static $FOOD = '/<td class="gelb" cellpadding="0" valign="middle" width="125px"( height="50")? bgcolor="#fadc00">/';
    private static $PRICE_FOOD_SPLIT = '/<\/tr><tr>/';
    private static $FOOD_SPLIT = '/<td class="[^"]*" valign="top" width="150px" height="[0-9]*">/';
    private static $PRICE_SPLIT = '/<td class="[^"]*" valign="top" width="150px" height="10">/';    
    private static $PRICE = '/[0-9],[0-9]{2}/';
    
    private static $INFO = '/<td class="gelbunten" colspan="7" valign="top" width="875px" bgcolor="#fadc00">(.*)<\/td>/';
    
    public function parse($data) {
      $cafeteria = array();
      
      preg_match(self::$MAIN_CONTENT, $data, $mainContent);
      
      $content = $mainContent[1];
      
      preg_match(self::$WEEK, $content, $weekData);
      
      $year_split = preg_split('/\./', $weekData[3]);
      $year = $year_split[2];
      
      $cafeteria['weekStart'] = $weekData[1] . '.' . $year;
      $cafeteria['weekEnd'] = $weekData[3];
      
      $foodInfoData = preg_split(self::$FOOD, $content);
      unset($foodInfoData[0]);
      $foodInfoData = array_values($foodInfoData);
      
      for ($k = 0; $k < 5; $k++) {
        $days[] = array();
      }
      
      $checkForHoliday = array(false, false, false, false, false);
      $foundFood = array(false, false, false, false, false, false);
      $info = array("", "", "", "", "");
      $dayPrice = array(null, null, null, null, null);
      
      for ($j = 0; $j < count($foodInfoData); $j++) {
        $foodRowData = $foodInfoData[$j];
        $foodPriceData = preg_split(self::$PRICE_FOOD_SPLIT, $foodRowData);
        $foodDataStr = $foodPriceData[0];
        $priceDataStr = $foodPriceData[1];

        $foodData = preg_split(self::$FOOD_SPLIT, $foodDataStr);
        unset($foodData[0]);
        $foodData = array_values($foodData);

        $priceData = preg_split(self::$PRICE_SPLIT, $priceDataStr);
        unset($priceData[0]);
        $priceData = array_values($priceData);
        
        for ($i = 0; $i < count($foodData); $i++) {
          $foodStr = $foodData[$i];
          $cleanText = $this->cleanString($foodStr);
          
          $priceStr = $priceData[$i];
          // find prices
          preg_match_all(self::$PRICE, $priceStr, $prices);
          
          // important classs
          if (strpos($foodStr, '<span class="important">') !== false) {
            $checkForHoliday[$i] = true;
            if ($dayPrice[$i] == null) {
              $info[$i] = $cleanText;
              if (count($prices[0]) == 3) {
                $dayPrice[$i] = $prices[0];
              }
              continue;
            }
          }
          
          // create food if not empty (-) string
          $description = $cleanText;
          if ($description != "-") {
            $food = array();
            $food['description'] = utf8_encode($description);
            
            if (count($prices[0]) != 3) {
              $prices[0] = $dayPrice[$i];
            }
            $food['prices'] = $prices[0];
              
            $days[$i]['food'][] = $food;
          }
        }  
      }
      
      for ($k = 0; $k < count($checkForHoliday); $k++) {
        $holiday = true;
        if ($checkForHoliday[$k]) {
          if (count($days[$k]['food']) > 0) {
            $holiday = false;
          }
          
          if ($dayPrice[$k] != null) {
            // echo "rejected: day price found";
            $days[$k]['info'] = $info[$k] . '';
            $info[$k] = '';
            $holiday = false;
          }
        } else {
          $holiday = false;
        }
        if ($holiday) {
          $days[$k]['holiday'] = true;
          $days[$k]['info'] = $info[$k];
          $info[$k] = '';
        }
      }
      
      $infoStr = implode(" ", $info);
      if (trim($infoStr) != "") {
        $cafeteria['info'] = $infoStr;
      }
      
      preg_match(self::$INFO, $data, $info);
      
      if (count($info) == 2) {
        $foodInfo = $this->cleanString($info[1]);
        $foodInfo = str_replace("Wir verwenden ", "", $foodInfo);
        $cafeteria['foodInfo'] = utf8_encode($foodInfo);
      }
      
      $cafeteria['days'] = $days;      
      return $cafeteria;
    }
    
    protected function cleanString($string) {
      $string = preg_replace('/<br \/>/', " ", $string);
      $string = preg_replace('/&nbsp;/', " ", $string);
      $string = preg_replace("/\/> </", "/><", $string);
      return preg_replace("/\s+/", " ", trim(strip_tags($string)));
    }
  }

?>