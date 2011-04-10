<?php
  include_once 'parser.php';
  include_once 'cafeteria-parser.php';
  
  $CAFETERIA_BASE_URL = "http://www.studentenwerk-kassel.de/";
  $CAFETERIA_URLS = array(
    0 => "Zentralmensa-br-A-Bode-Stra.188.0.html",
    1 => "Mensa-br-Wilhelmshoeher-Alle.189.0.html",
    2 => "Cafeteria-br-Menzelstrasse.195.0.html",
    3 => "Mensa-br-Heinr-Plett-Strass.187.0.html",
    4 => "Mensa-Witzenhausen.415.0.html",
    5 => "?id=144",
    6 => "?id=146",
  );
  
  $REGISTERED_CLIENTS = array(
    "cafeteria-widget" => "firefly",
  );
  
  header('Content-type: application/json; charset=UTF8');
  
  // check authorization
  if (!isset($_SERVER['HTTP_SERVICE_AUTHORIZATION'])) {
    header('HTTP/1.1 401 Unauthorized');
    exit;
  }
  
  $auth = $_SERVER['HTTP_SERVICE_AUTHORIZATION'];
  $auth = str_replace("Basic ", "", $auth);
 
  // decode
  $decoded_auth = base64_decode($auth);
  
  // split
  $usernamePassword = preg_split('/:/', $decoded_auth);
  
  // check
  if ((count($usernamePassword) < 2) || !(isset($REGISTERED_CLIENTS[$usernamePassword[0]])) || ($REGISTERED_CLIENTS[$usernamePassword[0]] != $usernamePassword[1])) {
    header('HTTP/1.1 403 Forbidden');
    exit;
  }
  
  if (!isset($_GET['id']) || !isset($_GET['week'])) {
    echo "no id or/and week given"; 
    die;
  }
  
  $id = $_GET['id'];
  $week = $_GET['week'];
  
  $filename = getFile(date('Y-') . $week, $id);
  
  if (!file_exists($filename)) {
    // load info
    $data = loadInfos($id);
    
    // get loaded week
    $loadedWeek = date('W', strtotime($data['weekStart']));
    $loadedYearWeek = date('Y') . '-' . $loadedWeek;
    
    $dir = getDir($loadedYearWeek);
    $loadedFilename = getFile($loadedYearWeek, $id);
    
    // cache result if not already cached
    if (!file_exists($loadedFilename)) {
      saveData($dir, $loadedFilename, json_encode($data));
    }
  }
  
  if (!file_exists($filename)) {
    header('HTTP/1.1 404 Not Found');
    exit;
  }
  
  // TODO: delete old cache
  returnFile($filename);
  
  function getDir($week) {
    return './cache/' . $week . '/';
  }
  
  function getFile($week, $id) {
    return getDir($week) . $id . '.json';
  }
  
  function returnFile($filename) {
    echo file_get_contents($filename);
    exit;
  }
  
  function saveData($dir, $filename, $data) {
    if (!file_exists($dir)) {
      mkdir($dir);
    }
    
    // create file
    $fileHandler = fopen($filename, 'w+') or die("can't open file");
    
    // write data
    fwrite($fileHandler, $data);
    
    // close
    fclose($fileHandler);
  }
  
  function loadInfos($caf_id) {
    global $CAFETERIA_BASE_URL;
    global $CAFETERIA_URLS;
    
    $url = $CAFETERIA_BASE_URL . $CAFETERIA_URLS[$caf_id];
    
    $data = file_get_contents($url);
    $data = cleanHTMLString($data);
    
    $parser = new CafeteriaParser;
    return $parser->parse($data);
  }
  
  function cleanHTMLString($htmlString) {
    $htmlString = str_replace(array("\r\n", "\n", "\r"), " ", $htmlString);
    $htmlString = preg_replace("/\s+/", " ", $htmlString);
    $htmlString = preg_replace("/> </", "><", $htmlString);
    return $htmlString;
  }
?>