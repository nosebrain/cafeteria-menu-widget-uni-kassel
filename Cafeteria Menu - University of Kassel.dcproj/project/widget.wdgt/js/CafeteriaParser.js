/**
 * Cafeteria Widget - University of Kassel
 *
 *
 * Copyright 2009 - 2010, Daniel Zoller
 *                        http://nosebrain.de
 *
 * This widget is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This widget is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this widget; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA 
 *
 *
 * @author Daniel Zoller<nosebrain@gmx.net>
 */

function CafeteriaParser(cafeteria) {
  this.cafeteria = cafeteria;
  this.request = null;
  
  this.listener = new CafeteriaParserListener(this);
}


CafeteriaParser.prototype.parseResult = function(response) { 
  try {
    this.listener.startedParsing(response);
    // clear new lines and 
    var lines = response.split("\n");
    response = lines.join(" ");
    lines = response.split("\r");
    response = lines.join(" ");
  
    var foodTable = response.match(SEARCH_EXPRESSIONS.table);

    var foodStr = foodTable[0].split(SEARCH_EXPRESSIONS.food);
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
    var priceFoodSplit = foodSource[i].split(SEARCH_EXPRESSIONS.priceFoodSplit);
  
    // get all food for category i
    var menu = priceFoodSplit[0].split(SEARCH_EXPRESSIONS.foodSplit);
    menu.shift();
    
    // get all prices for each menu
    var prices = priceFoodSplit[1].split(SEARCH_EXPRESSIONS.priceSplit);
    prices.shift();
    
    for (var j = 0; j < menu.length; j++) {
      // get description
      var clearMenu = menu[j].split(/<\/tr>/);
      menu[j] = clearMenu[0];
            
      var description = removeHTMLCode(menu[j]).replace(/- /, " ");
      
      if (description != " ") {      
        // get price
        var price = prices[j].match(SEARCH_EXPRESSIONS.price);
        
        if (price) {
          var food = new Food();
          food.setDescription(description);
        
          for (var x = 0; x < price.length; x++) {
            food.setPrice(x, price[x]);
          }
          
          // add it to day
          this.cafeteria.getMenu().getDay(j).addToFood(food);
        } else {
          alert("price not found for " + description);
          // maybe it's a holiday
          if (description.search(SEARCH_EXPRESSIONS.holiday) != -1) {
            var day = this.cafeteria.getMenu().getDay(j);
            day.setHoliday(true);
            // TODO: remove html code
            day.setDescription(day.getDescription() + description);
          }
        }        
      }
    }
  }
}


CafeteriaParser.prototype.parseWeek = function(weekSource) {
  var actWeek = weekSource.match(SEARCH_EXPRESSIONS.week);
  
  this.listener.gotWeek(actWeek[1], actWeek[3]);
}


CafeteriaParser.prototype.parseInfo = function(infoSource) {
  var info = infoSource.match(SEARCH_EXPRESSIONS.info);
  
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
        alert(this.status); // TODO
      }
    }
  };
  
  this.request.open("GET", this.cafeteria.getURL(), true);
  this.request.send(null);
  
  this.listener.startedDownload();
}


CafeteriaParser.prototype.getCafeteria = function() {
  return this.cafeteria;
}