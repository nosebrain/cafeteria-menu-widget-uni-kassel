function CafeteriaParser(cafeteria) {
  this.cafeteria = cafeteria;
  this.request = null;
}

CafeteriaParser.prototype.parseResult = function(response) {  
  // clear new lines and 
  lines = response.split("\n");
  response = lines.join(" ");
  lines = response.split("\r");
  response = lines.join(" ");
  
  setStatus(STATUS_MESSAGE_PARSING); // TODO
  
  try {
    menuTable = response.match(SEARCH_EXPRESSIONS.table);

    menuStr = menuTable[0].split(SEARCH_EXPRESSIONS.menus);
    menuStr.shift();
    
    this.parseMenu(menuStr);
    this.parseWeek(response);
    
    // TODO
    /*if (autoUpdateContent) {
      autosetMenuAreaContent();
    }*/
    
    setStatus(""); // TODO
  } catch (e) {
    alert("exception while parsing site: " + e);
    setStatus(ERROR_MESSAGE_PARSING); // TODO
  }
}

CafeteriaParser.prototype.parseMenu = function(menuSource) {
  setStatus(STATUS_MESSAGE_MENU_PARSING); // TODO
  
  this.cafeteria.clear();
  
  for (var i = 0; i < menuStr.length; i++) {
    priceMenuSplit = menuStr[i].split(SEARCH_EXPRESSIONS.priceMenuSplit);
  
    // get menus for category i
    menus = priceMenuSplit[0].split(SEARCH_EXPRESSIONS.menusSplit);
    menus.shift();
    
    // get prices for each menu
    prices = priceMenuSplit[1].split(SEARCH_EXPRESSIONS.priceSplit);
    prices.shift();
    
    for (var j = 0; j < menus.length; j++) {
      // get description
      clearMenu = menus[j].split(/<\/tr>/);
      menus[j] = clearMenu[0];
            
      description = removeHTMLCode(menus[j]);      
      description = description.replace(/- /, " ");
      
      if (description != " " ) {
        menu = new Menu();
        
        menu.setDescription(description);
        alert(description);
      
        // add it to day
        this.cafeteria.getDay(j).addToMenus(menu);
        
        // get price
        price = prices[j].match(SEARCH_EXPRESSIONS.price);
        
        if (price) {
          for (var x = 0; x < price.length; x++) {
            menu.setPrice(x, price[x]);
          }
        } else {
          alert("price not found");
        }
         
      }      
      
      // holidays
      // holiday = description.match(/<span class="important">/); // FIXME: important doesn't mean holiday
      
      //if (holiday != null) {
        //this.days[j].setHoliday(true);
        //break;
      //}
    }
  }
  
  setStatus(STATUS_MESSAGE_READY);
}

CafeteriaParser.prototype.parseWeek = function(weekSource) {
  setStatus(STATUS_MESSAGE_PARSING_WEEK); // TODO
  
  actWeek = weekSource.match(SEARCH_EXPRESSIONS.week);
  
  dateStr = actWeek[3].split(/\./);
  
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
    
  }
  
  // save it
  setPref(PREF_UPDATE, date.getTime()); 
  
  setWeek(actWeek[1] + "-" + actWeek[3]);
}

CafeteriaParser.prototype.logError = function(errorCode) {
  alert(errorCode);
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
}