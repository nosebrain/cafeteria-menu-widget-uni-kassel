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


// TODO: rename to FrontViewController
function CafeteriaMenuViewController() {

}

CafeteriaMenuViewController.prototype.changedCafeteria = function(oldCafeteria, newCafeteria) {
  // change name
  $(CAFETERIA_LABEL_SELECTOR).html(newCafeteria.getName());
}

CafeteriaMenuViewController.prototype.switchedWeekday = function() {
  var day = $(WEEK_DAY_CHOOSER_SELECTOR).popup().getSelectedIndex();
  this.widget.setDay(day);
}

CafeteriaMenuViewController.prototype.showWeek = function(start, end) {
  // update week
  $('#week').html(start + '-' + end);
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

CafeteriaMenuViewController.prototype.changedState = function(oldState, newState) {
  // display state
  var message = dashcode.getLocalizedString(newState);
  $("#info").html(message);
}

CafeteriaMenuViewController.prototype.viewDidLoad = function() {
  // restore size and collapse state
  this.resizeToWithAnimation(PREF.getPref(PREF_WIDTH), PREF.getPref(PREF_HEIGHT), this.restoreCollapse);
}

CafeteriaMenuViewController.prototype.restoreCollapse = function() {
  alert('restore collapse'); // TODO: implement me
}

CafeteriaMenuViewController.prototype.viewDidAppear = function() {  
  // autoset the day
  var now = new Date();
  var day = now.getDay();
  var hour = now.getHours();
  
  if (hour < 14) {
    day--;
  }
  
  // TODO: what with weekends?
  
  day = Math.max(day, 0);
  day = Math.min(day, 4);
  
  this.widget.setDay(day);
}

CafeteriaMenuViewController.prototype.viewWillDisappear = function() {
  this.resizeToWithAnimation(WIDGET.getReader().get("Width"), WIDGET.getReader().get("Height"), this.widget.showBackView);
}

CafeteriaMenuViewController.prototype.viewWillAppear = function() {
  this.resizeToWithAnimation(PREF.getPref(PREF_WIDTH), PREF.getPref(PREF_HEIGHT), null);
}

CafeteriaMenuViewController.prototype.resize = function(w, h) {
  // calcs for scroll area
  var divWidth = w - window.innerWidth;
  var divHeight = h - window.innerHeight;

  var scrollArea = $('#scrollArea').scrollArea();
  var scrollAreaWidth = scrollArea.viewWidth + divWidth + 18; // 18 = scrollbar width FIXME: how to get the value
  var scrollAreaHeight = scrollArea.viewHeight + divHeight;
  
  scrollArea.resize(scrollAreaWidth, scrollAreaHeight);

  this.resizeTo(w, h);
}

CafeteriaMenuViewController.prototype.resizeTo = function(w, h) {
  $('#front').width(w).height(h);
	if (window.widget) {
		window.resizeTo(w, h);
	}
}

CafeteriaMenuViewController.prototype.resizeToWithAnimation = function(w, h, callback) {
  $('#front').animate({ 
    width: w,
    height: h
  }, {
    query: false,
    duration: 500,
    step: function(now, fx) {
      var width = window.innerWidth;
      var height = window.innerHeight;
      if (fx.prop == 'width') {
        width = now;
      } else {
        height = now;
      }
      
      WIDGET.getFrontViewController().resize(width, height);
    }, 
    complete: function() {
      if (callback) {
        callback();
      }
    }
  });
}

CafeteriaMenuViewController.prototype.collapse = function() {
  this.collapse_resize(80, 80, 1);
}

CafeteriaMenuViewController.prototype.expand = function() {
  this.collapse_resize(PREF.getPref(PREF_WIDTH), PREF.getPref(PREF_HEIGHT), 0);
}

CafeteriaMenuViewController.prototype.collapse_resize = function(w, h, collapse) {
  this.resizeToWithAnimation(w, h, null);
  var g_collapse = collapse;
  $('#scrollArea, #weekdayChooser, #week, #info, #cafeteria-name, #resize, #updateImg, #state').animate({
    opacity: !collapse // XXX: not using 'toggle' cause #updateImg showed asyncron
  }, {
    query: false,
    duration: 500,
    easing: 'swing',
    complete: function() {
      var className = "collapsed";
      if (!g_collapse) {
        className = "expanded";
      }
    
      $('#front').removeClass().addClass(className);
    }
  });
}

CafeteriaMenuViewController.prototype.setWidget = function(widget) {
  this.widget = widget;
}