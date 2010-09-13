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

var WEEK_DAY_CHOOSER_SELECTOR = "#weekdayChooser";
var MENU_AREA_SELECTOR = "#scrollArea";
var CAFETERIA_LABEL_SELECTOR = "#cafeteria-name";


// TODO: rename to CafeteriaFrontViewController
function CafeteriaMenuViewController() {

}

CafeteriaMenuViewController.prototype.changedCafeteria = function(oldCafeteria, newCafeteria) {
  // change name
  $(CAFETERIA_LABEL_SELECTOR).html(newCafeteria.getName());
}

CafeteriaMenuViewController.prototype.dayChanged = function(oldDay, newDay) {
  // set popup
  $(WEEK_DAY_CHOOSER_SELECTOR).popup().setSelectedIndex(newDay);
  
  var day = this.widget.getCafeteria().getMenu().getDay(newDay);
  
  if (!day) {
    alert("no day " + newDay);
  }
  
  var content = "";
  
  if (day.isHoliday()) {
    content = day.getDescription();
  } else {    
    // get menu for new day
    content = this.getViewForDay(day);
  }  
  
  // set new content
  $(MENU_AREA_SELECTOR).scrollArea().setContent(content);
}

CafeteriaMenuViewController.prototype.getViewForDay = function(day) {
  var result = "<table>";
  
  var foods = day.getFoods();
  
  for (var i = 0; i < foods.length; i++) {
    result += "<tr";
    if (i % 2 == 1) {
      result += " class='alt'";
    } 
    result += ">";
    result += this.getViewForFood(foods[i]);
    result += "</tr>";
  }
  
  result += "</table>";
  
  return result;
}

CafeteriaMenuViewController.prototype.getViewForFood = function(food) {
  var result = "<td>";
  result += food.getDescription();
  result += "</td>";
  var priceId = PREF.getPref(PREF_PRICE);

  var price = food.getPrice(priceId);
  result += "<td class = \"price\">";
  
  if (price) {
    result += price;
    result += "€";
  }
  
  result += "</td>";
  
  return result;
}

CafeteriaMenuViewController.prototype.viewWillAppear = function() {
  alert("viewWillAppear"); // TODO: viewDidLoad
}

CafeteriaMenuViewController.prototype.viewDidAppear = function() {  
  // autoset the day
  var now = new Date();
  var day = now.getDay();
  var hour = now.getHours();
  
  if (hour < 14) {
    day--;
  }
  
  // day--; // because 0 => Sunday
  
  // TODO: what about weekends ?
  
  day = Math.max(day, 0);
  day = Math.min(day, 4);
  
  this.widget.setDay(day);
}

CafeteriaMenuViewController.prototype.setWidget = function(widget) {
  this.widget = widget;
}