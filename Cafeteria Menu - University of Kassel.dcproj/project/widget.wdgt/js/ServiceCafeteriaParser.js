/**
 * Cafeteria Widget - University of Kassel
 *
 *
 * Copyright 2009 - 2011, Daniel Zoller
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

var SERVICE_URL = "http://services.nosebrain.de/uni-kassel/cafeteria/";
var SERVICE_AUTH = 'Basic Y2FmZXRlcmlhLXdpZGdldDpmaXJlZmx5';

function ServiceCafeteriaParser(cafeteria) {
  this.cafeteria = cafeteria;
  this.currentRequest = null;
  
  this.listener = new CafeteriaParserListener(this);
}


ServiceCafeteriaParser.prototype.parseResult = function(response) { 
  try {
    this.listener.startedParsing(response);
        
    this.parseMenu(response.days);
    this.parseWeek(response);
    
    this.parseInfo(response);
    
    // notify listener 
    this.listener.finishedParsing(this.cafeteria);
  } catch (e) {
    this.listener.parsingFailed(e);
  }
  
  this.currentRequest = null;
}

ServiceCafeteriaParser.prototype.parseMenu = function(days) {
  var menu = new Menu();
  
  $.each(days, function(dayIndex, day) {
    var mDay = menu.getDay(dayIndex);
    if (day.holiday) {
      mDay.holiday = true;
      mDay.info = day.info;
    } else {
      // convert 
      $.each(day.food, function(index, menu) {
        var food = new Food();
        food.setDescription(menu.description);
        mDay.addToFoods(food);
      
        $.each(menu.prices, function(priceIndex, price) {
          food.setPrice(priceIndex, price);
        });
      });
    }
  });
  
  this.cafeteria.setMenu(menu);
}


ServiceCafeteriaParser.prototype.parseWeek = function(weekSource) {
  var weekStart = weekSource.weekStart.split('\.');
  this.listener.gotWeek(weekStart[0] + "." + weekStart[1], weekSource.weekEnd);
}


ServiceCafeteriaParser.prototype.parseInfo = function(infoSource) {
  this.listener.gotInformation(infoSource.foodInfo);
}


ServiceCafeteriaParser.prototype.parse = function() {
  if (this.currentRequest != null) {
    this.currentRequest.abort();
  }
  
  var today = new Date();
  var week = today.getWeek();
  
  if (today.getDay() == 6) {
    week++;
  }
  
  var urlJ = SERVICE_URL + this.cafeteria.getId() + "/" + week  + ".json";
  
  var self = this;
  this.currentRequest = $.ajax({
    url : urlJ,
    success:  function(data) {
                self.parseResult(data);
              },
    statusCode: {
      404:  function() {
              self.listener.finishedParsing(self.cafeteria);
            }
    },
    headers: {
      'service-authorization' : SERVICE_AUTH,
    },
  });
  
  this.listener.startedDownload();
}


ServiceCafeteriaParser.prototype.getCafeteria = function() {
  return this.cafeteria;
}