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
 
var WEEK_DAY_CHOOSER_SELECTOR = '#weekdayChooser';
var MENU_AREA_SELECTOR = '#scrollArea';
var CAFETERIA_LABEL_SELECTOR = '#cafeteria-name';
var INFO_LABEL_SELECTOR = '#state';
var WEEK_LABEL_SELECTOR = '#week';
var INFO_BUTTON_SELECTOR = '#info';
var RESIZE_SELECTOR = '#resize';

var COLLAPSED_CLASS_NAME = 'collapsed';
var EXPANDED_CLASS_NAME = 'expanded';


function FrontViewController() {
  this.foodRecommender = new MenuRecommender();
}

FrontViewController.prototype.changedCafeteria = function(oldCafeteria, newCafeteria) {
  // change name
  $(CAFETERIA_LABEL_SELECTOR).html(newCafeteria.getName());
}

FrontViewController.prototype.switchedWeekday = function() {
  var day = $(WEEK_DAY_CHOOSER_SELECTOR).popup().getSelectedIndex();
  this.widget.setDay(day);
}

FrontViewController.prototype.showWeek = function(start, end) {
  // update week
  $(WEEK_LABEL_SELECTOR).html(start + '-' + end);
}

FrontViewController.prototype.dayChanged = function(oldDay, newDay) {
  // set popup
  $(WEEK_DAY_CHOOSER_SELECTOR).popup().setSelectedIndex(newDay);
  
  var day = this.widget.getCafeteria().getMenu().getDay(newDay);
  
  if (!day) {
    alert("no day " + newDay);
  }
  
  var content = "";
  
  if (day.isHoliday()) {
    // content = day.getDescription();
  } else {
    // get recommendation for the day
    this.foodRecommender.recommendFood(day.getFoods());
  
    // get menu for new day
    content = this.getViewForDay(day);
    $('#content').children().remove();
    $('#content').append(content);
    
    // set new content
    $(MENU_AREA_SELECTOR).scrollArea().refresh();
  }  
}

FrontViewController.prototype.getViewForDay = function(day) {
  var result = $('<table></table>');
  var foods = day.getFoods();
  
  for (var i = 0; i < foods.length; i++) {
    var food = foods[i];
    var tr = $('<tr></tr>');
    if (i % 2 == 1) {
      tr.addClass('alt');
    }
    
    tr.append(this.getViewForFood(food));
    tr.append(this.getViewForFoodPrice(food));
    result.append(tr);
  }
  return result;
}

FrontViewController.prototype.getViewForFoodPrice = function(food) {
  var priceId = PREF.getPref(PREF_PRICE);
  var price = food.getPrice(priceId);
  
  var priceTd = $('<td></td>').addClass('price');
  
  if (price) {
    priceTd.append(price);
    priceTd.append('€');
  }
  
  return priceTd;
}

FrontViewController.prototype.getViewForFood = function(food) {
  var foodElement = $('<td></td>');
  if (food.isRecommended()) {
    foodElement.append('<img src="Images/star.png" height="12" width="12" /> ');
  }
  
  var foodS = $('<span></span>').addClass('food');
  foodS.append(food.getDescription());
  foodElement.append($(foodS));
  foodElement.append('<br />');
  
  var menuS = $('<span></span>').addClass('foodMenu');
  menuS.append('( ')
    
  var self = this;
  var likeLink = $('<a></a>').append('like').click(function() { // TODO: i18n
    self.getFoodRecommender().likeFood(food);
  });
  
  var dislikeLink = $('<a></a>').append('dislike').click(function() { // TODO: i18n
    self.getFoodRecommender().dislikeFood(food);
  });
  
  menuS.append(likeLink);
  menuS.append(' | ');
  menuS.append(dislikeLink);
  menuS.append(' ) ');
  
  foodElement.append(menuS);
  return foodElement;
}

FrontViewController.prototype.changedState = function(oldState, newState) {
  // display state
  var message = dashcode.getLocalizedString(newState);
  $(INFO_LABEL_SELECTOR).html(message);
}

FrontViewController.prototype.viewDidLoad = function() {
  // restore size and collapse state
  this.resizeToWithAnimation(PREF.getPref(PREF_WIDTH), PREF.getPref(PREF_HEIGHT), this.restoreCollapse);
}

FrontViewController.prototype.restoreCollapse = function() {
  if (PREF.getPref(PREF_COLLAPSED)) {
    this.collapse();
  }
}

FrontViewController.prototype.viewWillAppear = function() {  
  this.refreshMenu();
}

FrontViewController.prototype.refreshMenu = function() {
  // autoset the day
  var now = new Date();
  var day = now.getDay();
  var hour = now.getHours();
  
  if (hour < 14) {
    day--;
  }
  
  // TODO: what to do with weekends?
  
  day = Math.max(day, 0);
  day = Math.min(day, 4);
  
  this.widget.setDay(day);
}

FrontViewController.prototype.viewWillDisappear = function() {
  this.resizeToWithAnimation(WIDGET.getReader().get("Width"), WIDGET.getReader().get("Height"), this.widget.showBackView);
}

FrontViewController.prototype.viewDidAppear = function() {
  this.resizeToWithAnimation(PREF.getPref(PREF_WIDTH), PREF.getPref(PREF_HEIGHT), null);
}

FrontViewController.prototype.resize = function(w, h) {
  // calcs for scroll area
  var divWidth = w - window.innerWidth;
  var divHeight = h - window.innerHeight;

  var scrollArea = $(MENU_AREA_SELECTOR).scrollArea();
  var scrollAreaWidth = scrollArea.viewWidth + divWidth + 18; // 18 = scrollbar width FIXME: how to get the value
  var scrollAreaHeight = scrollArea.viewHeight + divHeight;
  
  scrollArea.resize(scrollAreaWidth, scrollAreaHeight);

  this.resizeTo(w, h);
}

FrontViewController.prototype.resizeTo = function(w, h) {
  $(FRONT_VIEW_SELECTOR).width(w).height(h);
	if (window.widget) {
		window.resizeTo(w, h);
	}
}

FrontViewController.prototype.resizeToWithAnimation = function(w, h, callback) {
  $(FRONT_VIEW_SELECTOR).animate({ 
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

FrontViewController.prototype.collapse = function() {
  this.collapse_resize(80, 80, 1);
}

FrontViewController.prototype.expand = function() {
  this.collapse_resize(PREF.getPref(PREF_WIDTH), PREF.getPref(PREF_HEIGHT), 0);
}

FrontViewController.prototype.collapse_resize = function(w, h, collapse) {
  this.resizeToWithAnimation(w, h, null);
  var g_collapse = collapse;
  $(MENU_AREA_SELECTOR + ', ' + WEEK_DAY_CHOOSER_SELECTOR + ', ' + WEEK_LABEL_SELECTOR + ', ' + INFO_BUTTON_SELECTOR + ', ' + CAFETERIA_LABEL_SELECTOR + ', ' + RESIZE_SELECTOR + ', ' + UPDATE_DIV_SELECTOR + ', ' + INFO_LABEL_SELECTOR).animate({
    opacity: !collapse // XXX: not using 'toggle' cause #updateImg shown asyncron
  }, {
    query: false,
    duration: 500,
    complete: function() {
      var className = COLLAPSED_CLASS_NAME;
      if (!g_collapse) {
        className = EXPANDED_CLASS_NAME;
      }
    
      $(FRONT_VIEW_SELECTOR).removeClass().addClass(className);
    }
  });
}

FrontViewController.prototype.setWidget = function(widget) {
  this.widget = widget;
}

FrontViewController.prototype.getFoodRecommender = function() {
  return this.foodRecommender;
}