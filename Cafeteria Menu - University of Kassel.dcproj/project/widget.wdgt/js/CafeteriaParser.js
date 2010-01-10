function CafeteriaParser(cafeteria) {
  this.cafeteria = cafeteria;
  this.request = null;
  
  this.listener = new CafeteriaParserListener(this);
}

CafeteriaParser.prototype.parseResult = function(response) { 
  try {
    this.listener.startedParsing(response);
    // clear new lines and 
    lines = response.split("\n");
    response = lines.join(" ");
    lines = response.split("\r");
    response = lines.join(" ");
  
    foodTable = response.match(SEARCH_EXPRESSIONS.table);

    foodStr = foodTable[0].split(SEARCH_EXPRESSIONS.food);
    foodStr.shift();
    
    this.parseMenu(foodStr);
    this.parseWeek(response);
    
    this.parseInfo(response);
    
    // notify listener 
    this.listener.finishedParsing(this.cafeteria);
  } catch (e) {
    this.listener.parsingFailed(e);
  }
}

CafeteriaParser.prototype.parseMenu = function(foodSource) {
  this.cafeteria.setMenu(new Menu());
  
  for (var i = 0; i < foodSource.length; i++) {
    priceFoodSplit = foodSource[i].split(SEARCH_EXPRESSIONS.priceFoodSplit);
  
    // get all food for category i
    menu = priceFoodSplit[0].split(SEARCH_EXPRESSIONS.foodSplit);
    menu.shift();
    
    // get all prices for each menu
    prices = priceFoodSplit[1].split(SEARCH_EXPRESSIONS.priceSplit);
    prices.shift();
    
    for (var j = 0; j < menu.length; j++) {
      // get description
      clearMenu = menu[j].split(/<\/tr>/);
      menu[j] = clearMenu[0];
            
      description = removeHTMLCode(menu[j]);      
      description = description.replace(/- /, " ");
      
      if (description != " " ) {
        food = new Food();
        food.setDescription(description);
      
        // get price
        price = prices[j].match(SEARCH_EXPRESSIONS.price);
        
        if (price) {
          for (var x = 0; x < price.length; x++) {
            food.setPrice(x, price[x]);
          }
        } else {
          alert("price not found for " + food.getDescription());
        }
        
        // add it to day
        this.cafeteria.getMenu().getDay(j).addToFood(food);
      }
    }
  }
}

CafeteriaParser.prototype.parseWeek = function(weekSource) {
  actWeek = weekSource.match(SEARCH_EXPRESSIONS.week);
  
  // this.listener.gotWeek(actWeek[3]);
  
  dateStr = actWeek[3].split(/\./);
  dateStart = actWeek[2].split(/\./);
  
  year = dateStr[2];
  month = dateStr[1] - 1;
  day = myParseInt(dateStr[0]) + 2;  // 2 <=> friday => sunday
  
  date = new Date(year, month, day, 14, 0, 0);
  
  now = new Date();
  
  if (now >= date) {
    date.setHours(now.getHours());
  }
  
  nextUpdate = this.cafeteria.getNextUpdate();	
  
  if (nextUpdate) {
    // TODO
  }
  
  // save it
  PREF.savePref(PREF_UPDATE, date.getTime());
  
  this.cafeteria.getMenu().setWeek(actWeek[1] + "-" + actWeek[3]);
}

CafeteriaParser.prototype.parseInfo = function(infoSource) {
  info = infoSource.match(SEARCH_EXPRESSIONS.info);
  
  info = info[1].replace(/, /g, "<br />");
  info = info.replace(/Wir verwenden /, "<br /><br />");
  
  this.listener.gotInformation(info);
}


CafeteriaParser.prototype.parse = function() {
  // stop other request
  if (this.request) {
    this.request.abort();
  }
  
  this.request = new XMLHttpRequest(); // TODO: Exception
  
  var self = this;
  this.request.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        self.parseResult(this.responseText);
      } else {
        self.logError(this.status);
      }
    }
  };
  
  this.request.open("GET", this.cafeteria.getURL(), true);
  this.request.send(null);
  
  this.listener.startedDownload();
}