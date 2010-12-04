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
  this.cafeteria = cafeteria; // set only url for the request
  this.listener = listener;
  this.active = false;
}

CafeteriaParser.prototype.parseResult = function(response) {
  try {
    this.listener.startedParsing(response);
    // clear new lines and 
    var lines = response.split('\n'); // TODO: replace(/\n/g, ' '); ?
    response = lines.join(' ');
    lines = response.split('\r');
    response = lines.join(' ');
  
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
  var specialDay = new Array();
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
       
      var rawDescription = menu[j];
      var description = removeHTMLCode(rawDescription.replace(/<br \/>/g, ' ')).replace(/- /, ' ');
      
      if ($.trim(description) != '') {      
        // get price
        var price = prices[j].match(SEARCH_EXPRESSIONS.price);
        var day = menuO.getDay(j);
        if (price) {
          var food = new Food();
          food.setDescription($.trim(description));
        
          for (var x = 0; x < price.length; x++) {
            food.setPrice(x, price[x]);
          }
          
          // add it to day
          day.addToFoods(food);
        } else {
          alert('price not found for ' + description);
          
          if (day.getFoods().length > 0) {
            var info = day.getFoods()[0];
            // there was allready a food all others must also be a food
            var food = new Food();
            food.setDescription($.trim(description));
            
            var infoPrice = info.getAllPrices();
            for (var x = 0; x < infoPrice.length; x++) {
              food.setPrice(x, infoPrice[x]);
            }
            
            // XXX: a set would be great
            var pos = specialDay.indexOf(j);
            if (pos == -1) specialDay.push(j);
                      
            // add it to day
            day.addToFoods(food);
          } else if (rawDescription.search(SEARCH_EXPRESSIONS.holiday) != -1) {
            // maybe it's a holiday
            alert('holiday');

            day.setHoliday(true);
            day.setInfo(removeHTMLCode(day.getInfo()) + description);
          }
        }        
      }
    }
  }
  
  for (var i = 0; i < specialDay.length; i++) {
    var special = menuO.getDay(specialDay[i]);
    var infoContainer = special.getFoods()[0];
    var info = infoContainer.getDescription();
    special.setInfo(info);
    special.removeFromFoods(infoContainer);
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
  
  info = info[1].replace(/, /g, '<br />');
  info = info.replace(/Wir verwenden /, '<br /><br />');
  
  this.listener.gotInformation(info);
}

CafeteriaParser.prototype.parse = function() {
  // other request running?
  if (this.active) {
    return;
  }
  
  var self = this;
  $.ajax({
    url: this.cafeteria.getURL(),
    success: function(data) {
      self.parseResult(data);
    },
    error: function(request, textStatus, errorThrown) {
      self.handleError(request, textStatus, errorThrown);
    }
  });
  
  this.listener.startedDownload();  
}

CafeteriaParser.prototype.handleError = function(request, textStatus, errorThrown) {
  // log error
  alert(textStatus + ' ' + errorThrown);
  this.active = false;
}