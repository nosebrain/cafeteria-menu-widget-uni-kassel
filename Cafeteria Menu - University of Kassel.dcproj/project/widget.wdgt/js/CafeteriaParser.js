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
 * @author Daniel Zoller<nosebrain@gmx.net>
 */

var SEARCH_EXPRESSIONS = {
  table : /<table cellpadding="4" cellspacing="0" width="899">.*<\/table><img/,
  food : /<tr><td class="gelb" cellpadding="0" bgcolor="#fadc00" height="50" valign="middle" width="125px">/, 
  foodSplit : /<td class="weiss" height="50" valign="top" width="150px">/,
  priceFoodSplit : /<\/tr><tr>/,
  priceSplit : /<td class="preis" height="10" valign="top" width="150px">/, 
  price : /[0-9],[0-9]{2}/g,
  week : /Speiseplan vom&nbsp;([0-9]{2}.[0-9]{2}). (.*|-|bis) ([0-9]{2}.[0-9]{2}.[0-9]{4})/,
  info : /<td class="gelbunten" colspan="7" bgcolor="#fadc00" valign="top" width="875px"><font face="Arial" size="1">(.*)<\/font><\/td>/,
  holiday : /<span class="important">/
};

function CafeteriaParser(cafeteria, listener) {
  this.cafeteria = cafeteria;
  this.request = null;
  this.listener = listener;
  this.active = false;
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
  
  // ready
  this.active = false;
}

CafeteriaParser.prototype.parseMenu = function(foodSource) {
  var menuO = new Menu();

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
          menuO.getDay(j).addToFood(food);
        } else {
          alert("price not found for " + description);
          // maybe it's a holiday
          if (description.search(SEARCH_EXPRESSIONS.holiday) != -1) {
            alert("holiday");
            var day = menuO.getDay(j);
            day.setHoliday(true);
            day.setDescription(removeHTMLCode(day.getDescription()) + description);
          }
        }        
      }
    }
  }
  
  // got menu
  this.listener.gotMenu(menuO);
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
  if (this.active) {
    return;
  }
  
  var self = this;
  $.ajax({
   url: this.cafeteria.getURL(),
   success: function(data) {
    self.parseResult(data);
   },
   error: this.handleError
  });
  
  this.listener.startedDownload();  
}

CafeteriaParser.prototype.handleError = function(request, textStatus, errorThrown) {
  // log error
  alert(textStatus + ' ' + errorThrown);
  this.active = false;
}