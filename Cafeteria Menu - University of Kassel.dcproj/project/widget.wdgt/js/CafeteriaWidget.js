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
 
var FRONT_VIEW_SELECTOR = '#front';
var BACK_VIEW_SELECTOR = '#back';

function CafeteriaWidget() {
  // updater for the widget
  this.updater = new WidgetUpdater();
  
  // reader for accessing data saved in info.plist
  this.reader = new InfoPlistReader();
  
  // init view controllers
  this.frontViewController = new FrontViewController();
  this.frontViewController.setWidget(this);
  
  this.backViewController = new BackViewController();
  this.backViewController.setWidget(this);
  
  // init updater for menu
  this.menuUpdater = new MenuUpdater();
  this.menuUpdater.setWidget(this);
  
  // frags for assync show
  this.showingBack = false;
}

CafeteriaWidget.prototype.init = function() {
  // init cafeteria
  this.setCafeteriaById(PREF.getPref(PREF_CAFETERIA));
  
  // inform the controllers
  this.frontViewController.viewDidLoad();  
  this.backViewController.viewDidLoad();
}

CafeteriaWidget.prototype.showBack = function() {
  if (this.showingBack) {
    return;
  }
  
  this.frontViewController.viewWillDisappear(); // resizes the front view and calles showBackView when finished
  this.backViewController.viewWillAppear();
  this.showingBack = true;
}

CafeteriaWidget.prototype.showBackView = function() {
  if (window.widget) {
    widget.prepareForTransition("ToBack");
  }
  
  $(FRONT_VIEW_SELECTOR).hide();
  $(BACK_VIEW_SELECTOR).show();

  if (window.widget) {
    setTimeout('widget.performTransition();', 0);
    // TODO: this is a hack to get scroll bars to the scroll area
    setTimeout('$(INFO_SCROLL_AREA_SELECTOR).popup().refresh()', 0);
    
    WIDGET.setShowingBack(false);
  }
}

CafeteriaWidget.prototype.showFront = function() {
  this.backViewController.viewWillDisappear();
  this.frontViewController.viewWillAppear();
  this.showFrontView();
}

CafeteriaWidget.prototype.showFrontView = function() {
  if (window.widget) {
    widget.prepareForTransition('ToFront');
  }
  
  $(FRONT_VIEW_SELECTOR).show();
  $(BACK_VIEW_SELECTOR).hide();
  

  if (window.widget) {
    setTimeout('widget.performTransition();', 0);
    setTimeout('WIDGET.getFrontViewController().viewDidAppear();', 800);
  }
}

CafeteriaWidget.prototype.show = function() {
  // check for widget updates TODO: wSparkle
  this.updater.checkForUpdate();
  
  // check for food updates  
  this.menuUpdater.checkForUpdate();
  
  // inform the view controllers
  this.frontViewController.viewWillAppear();
}

CafeteriaWidget.prototype.hide = function() {
  // nothing to do
}

CafeteriaWidget.prototype.sync = function() {
  // TODO: implement sync
}

CafeteriaWidget.prototype.remove = function() {
  // delete prefs
  for (var i = 0; i < PREFS.length; i++) {
    PREF.savePref(PREFS[i], null);
  }
}

CafeteriaWidget.prototype.getReader = function() {
  return this.reader;
}

CafeteriaWidget.prototype.getUpdater = function() {
  return this.updater;
}

CafeteriaWidget.prototype.getCafeteria = function(cafeteria) {
  return this.cafeteria;
}

CafeteriaWidget.prototype.setCafeteria = function(cafeteria) {
  var old = this.cafeteria;
  this.cafeteria = cafeteria;
  
  this.changedCafeteria(old, cafeteria);
}

CafeteriaWidget.prototype.updateMenu = function(menu) {
  this.cafeteria.setMenu(menu);
  
  this.frontViewController.refreshMenu();
}

CafeteriaWidget.prototype.changedCafeteria = function(oldCafeteria, newCafeteria) {
  if (newCafeteria) {
    // update data
    this.menuUpdater.resetNextUpdate(); 
    this.menuUpdater.checkForUpdate();
    
    var id = newCafeteria.getId();
  
    // presist selected cafeteria id
    PREF.savePref(PREF_CAFETERIA, id);
    
    // change selected item
    this.backViewController.cafeteriaChanged(oldCafeteria, newCafeteria);
    this.frontViewController.changedCafeteria(oldCafeteria, newCafeteria);
  }
}

CafeteriaWidget.prototype.setCafeteriaById = function(id) {
  var cafFactory = new CafeteriaFactory();
  var caf = cafFactory.getCafeteriaById(id);
  
  this.setCafeteria(caf);  
}

CafeteriaWidget.prototype.setDayByIndex = function(index) {  
  this.setDay(this.cafeteria.getMenu().getDay(index));
}

CafeteriaWidget.prototype.setDay = function(day) {
  var old = this.day;
  this.day = day;
  
  this.frontViewController.dayChanged(old, day);
}

CafeteriaWidget.prototype.getDay = function() {
  return this.day;
} 

CafeteriaWidget.prototype.getMenuUpdater = function() {
  return this.menuUpdater;
}

CafeteriaWidget.prototype.getFrontViewController = function() {
  return this.frontViewController;
}

CafeteriaWidget.prototype.getBackViewController = function() {
  return this.backViewController;
}

CafeteriaWidget.prototype.setShowingBack = function(value) {
  this.showingBack = value;
}