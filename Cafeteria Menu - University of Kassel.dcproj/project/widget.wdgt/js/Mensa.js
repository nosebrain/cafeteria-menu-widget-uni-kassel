function Mensa(name, url) {
  this.name = name;
  this.url = url;
  this.request = null;
}

Mensa.prototype.getName = function() {
  return this.name;
}

Mensa.prototype.getDay = function(day) {
  return this.days[day];z
}

Mensa.prototype.getURL = function() {
  return BASE_URL + this.url;
}

Mensa.prototype.updated = function(lastDay) {
  var dateStr = lastDay.split(/\./);
  
  var year = dateStr[2];
  var month = dateStr[1] - 1;
  var day = myParseInt(dateStr[0]);
  day += 2; // friday => sunday
  
  var date = new Date(year, month, day, 14, 0, 0);
  
  var updateTime = getPref(PREF_UPDATE);	
  
  if (updateTime) {
    var update = new Date(updateTime);
    if (updateTime == date && updateTime.getHours() < 6) { // monday 6 o'clock => stop trying only once per hour try all time; there must be an update soon
      date.setHours(update.getHours() + 1);
    }
  }
  
  // save it
  setPref(PREF_UPDATE, date.getTime()); 
}

Mensa.prototype.updateNecessary = function() {
  // now
  var now = new Date();
  // get updateTime from prefs
  var updateTime = getPref(PREF_UPDATE);
  
  if (!updateTime) {
    return true;
  }
  
  var update = new Date(updateTime);
  
  if (now >= update) {
    alert("Autoupdate " + update);
    return true;
  }
  
  return false;
}

Mensa.prototype.clear = function() {
  this.days = new Array();
  
  for (var i = 0; i < 5; i++) {
    this.days.push(new Day());
  }
}

Mensa.prototype.analyseData = function(source, autoUpdateContent) {
  // clear new lines and 
  lines = source.split("\n");
  source = lines.join(" ");
  lines = source.split("\r");
  source = lines.join(" ");
  
  setStatus(STATUS_MESSAGE_PARSING);
  
  try {
  
    var menuTable = source.match(SEARCH_EXPRESSIONS.table);
  
    var menuStr = menuTable[0].split(SEARCH_EXPRESSIONS.menus);
    menuStr.shift();
  
    this.parseMenu(menuStr);
  
    this.parseWeek(source);
    
    if (autoUpdateContent) {
      autosetMenuAreaContent();
    }
    
    setStatus("");
    
  } catch (e) {
    alert(e);
    setStatus(ERROR_MESSAGE_PARSING);
  }
}

Mensa.prototype.parseWeek = function(source) {
  setStatus(STATUS_MESSAGE_PARSING_WEEK);
  
  var actWeek = source.match(SEARCH_EXPRESSIONS.week);
  
  this.updated(actWeek[3]);
  
  setWeek(actWeek[1] + "-" + actWeek[3]);
}

Mensa.prototype.parseMenu = function(menuStr) {
  setStatus(STATUS_MESSAGE_MENU_PARSING);
  
  for (var i = 0; i < menuStr.length; i++) {
    var priceMenuSplit = menuStr[i].split(SEARCH_EXPRESSIONS.priceMenuSplit);
  
    // get menus for category i
    var menus = priceMenuSplit[0].split(SEARCH_EXPRESSIONS.menusSplit);
    menus.shift();
    
    // get prices for each menu
    var prices = priceMenuSplit[1].split(SEARCH_EXPRESSIONS.priceSplit);
    prices.shift();
    
    for (var j = 0; j < menus.length; j++) {
      // get description
      var clearMenu = menus[j].split(/<\/tr>/);
      menus[j] = clearMenu[0];
            
      var description = removeHTMLCode(menus[j]);      
      description = description.replace(/- /, " ");
      
      if (description != " " ) {
        var menu = new Menu();
        
        menu.setDescription(description);
//        alert(description);
      
        // add it to day
        this.days[j].addToMenus(menu);
        
        // get price
        var price = prices[j].match(SEARCH_EXPRESSIONS.price);
        
        if (price) {
          for (var x = 0; x < price.length; x++) {
            menu.setPrice(x, price[x]);
          }
        } else {
          alert("price not found");
        }
         
      }      
      
      // holidays
      // var holiday = description.match(/<span class="important">/); // FIXME: important doesn't mean holiday
      
      //if (holiday != null) {
        //this.days[j].setHoliday(true);
        //break;
      //}
    }
  }
  
  setStatus(STATUS_MESSAGE_READY);
}

Mensa.prototype.update = function(autoUpdateContent) {
  // stop request
  if (this.request != null) {
    this.request.abort();
    this.request = null;
  }
  
  // clear old data
  this.clear();
  
  // Change status message
  setStatus(STATUS_MESSAGE_LOADING);
  
  this.request = new XMLHttpRequest(); // Exception TODO
    
  self = this;
  
  this.request.onreadystatechange = function () {
    if (this.readyState == 4) {
      // "OK"
      switch(this.status) {
        case 404: setStatus(ERROR_MESSAGE_404); break;
        case 200: self.analyseData(this.responseText, autoUpdateContent); break;
        default: setStatus(this.status);
      }
    }
  };
  
  this.request.open("GET", this.getURL(), true);
  
  this.request.send(null);
}

Mensa.prototype.getMenusByDay = function(day) { 
  if (day < 0 || day > 4) {
    throw "IllegalSate getMenusByDay";
  }
  return this.days[day].to_s();
}
