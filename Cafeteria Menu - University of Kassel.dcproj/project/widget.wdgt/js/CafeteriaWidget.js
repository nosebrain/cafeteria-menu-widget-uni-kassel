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
 
var FRONT_VIEW_SELECTOR = '#front';

function CafeteriaWidget() {
  this.updater = new WidgetUpdater();
  this.cafeteria = null;
  
  this.reader = new InfoPlistReader();
  
  this.frontViewController = new CafeteriaMenuViewController();
  this.frontViewController.setWidget(this);
  
  // TODO
  // this.backViewController = new BackViewController();
  // this.backViewController.setWidget(this);
  
  this.menuUpdater = new MenuUpdater();
  this.menuUpdater.setWidget(this);
  this.menuUpdater.setFrontViewController(this.frontViewController); // TODO
}

CafeteriaWidget.prototype.init = function() {
  // init cafeteria
  this.setCafeteriaById(PREF.getPref(PREF_CAFETERIA));
  
  this.frontViewController.viewDidLoad();
  
  
  
  // TODO: move to CafeteriaBackViewController.js
  // this.backViewController.viewDidLoad();
  this.initCafeteriaChooser(); // XXX: databinding?!?
}

CafeteriaWidget.prototype.showBack = function() {
  // this.backViewController.viewWillAppear();
  
}

CafeteriaWidget.prototype.initCafeteriaChooser = function() {
  var cafs = this.reader.get("Cafeterias");
  
  var cafeterias = new Array();
  for (i = 0; i < cafs.length; i++) {
    cafeterias.push(cafs[i]["Name"]);
  }
  
  $('#cafeteriaChooser').popup().setOptions(cafeterias);
}

CafeteriaWidget.prototype.show = function() {
  // check for widget updates TODO: wSparkle
  this.updater.checkForUpdate();
  
  // check for food updates  
  this.menuUpdater.checkForUpdate();
  
  // inform the view controllers
  this.frontViewController.viewDidAppear();
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

CafeteriaWidget.prototype.changedCafeteria = function(oldCafeteria, newCafeteria) {
  if (newCafeteria) {
    // update data
    this.menuUpdater.checkForUpdate();
    
    var id = newCafeteria.getId();
  
    // presist selected cafeteria id
    PREF.savePref(PREF_CAFETERIA, id);
    
    // change selected item
    // TODO: backviewController
    $('#cafeteriaChooser').popup().setSelectedIndex(id);
    // this.backViewController.cafeteriaChanged(oldCafeteria, newCafeteria);
    
    this.frontViewController.changedCafeteria(oldCafeteria, newCafeteria);
  }
}

CafeteriaWidget.prototype.setCafeteriaById = function(id) {
  var cafFactory = new CafeteriaFactory();
  var caf = cafFactory.getCafeteriaById(id);
  
  this.setCafeteria(caf);  
}

CafeteriaWidget.prototype.setDay = function(day) {
  var old = this.day;
  
  this.day = day;
  this.frontViewController.dayChanged(old, day);
}

CafeteriaWidget.prototype.getMenuUpdater = function() {
  return this.menuUpdater;
}

CafeteriaWidget.prototype.getFrontViewController = function() {
  return this.frontViewController;
}