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

function CafeteriaWidget() {
  this.updater = new WidgetUpdater();
  this.cafeteria = null;
  
  this.reader = new InfoPlistReader();
  this.listener = new CafeteriaWidgetListener(this);
}

CafeteriaWidget.prototype.init = function() {
  // init cafeteria
  this.setCafeteriaById(PREF.getPref(PREF_CAFETERIA));
  
  this.initCafeteriaChooser(); // XXX: databinding?!?
  
  this.restoreSize();
}


CafeteriaWidget.prototype.initCafeteriaChooser = function() {
  var cafs = this.reader.get("Cafeterias");
  
  var cafeterias = new Array();
  for (i = 0; i < cafs.length; i++) {
    cafeterias.push(cafs[i]["Name"]);
  }
  
  ElementUtils.getPopUp(ELEMENT_ID_POPUP_CAFETERIACHOOSER).setOptions(cafeterias);
}


CafeteriaWidget.prototype.show = function() {
  // check for food updates
  if (this.cafeteria.updateNecessary()) {
    this.cafeteria.update(true);
  }
  
  // check for widget updates TODO: wSparkle
  this.updater.checkForUpdate();
  
  // set menu
  this.autosetMenu();
}

CafeteriaWidget.prototype.remove = function() {
  // delete prefs
  for (var i = 0; i < PREFS.length; i++) {
    PREF.savePref(PREFS[i], null);
  }
}


CafeteriaWidget.prototype.autosetMenu = function() {
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
  
  this.setDay(day);
}

CafeteriaWidget.prototype.restoreSize = function() {
  WidgetUtils.resizeWithAnimationTo(PREF.getPref(PREF_WIDTH), PREF.getPref(PREF_HEIGHT), this.restoreCollapse);
}

CafeteriaWidget.prototype.restoreCollapse = function() {
  if (PREF.getPref(PREF_COLLAPSED)) {
    WidgetUtils.collapse();
  }
}


CafeteriaWidget.prototype.resize = function(w, h) {
  // calcs for scroll area
  var divWidth = w - window.innerWidth;
  var divHeight = h - window.innerHeight;

  var scrollArea = ElementUtils.getScrollArea(ELEMENT_ID_MENU_SCROLL_AREA);
  var scrollAreaWidth = scrollArea.viewWidth + divWidth + 18; // 18 = scrollbar width FIXME: how to get the value
  var scrollAreaHeight = scrollArea.viewHeight + divHeight;
  
  scrollArea.resize(scrollAreaWidth, scrollAreaHeight);

  WidgetUtils.resizeTo(w, h);
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
  
  this.listener.cafeteriaChanged(old, cafeteria); // TODO: maybe fire propertyChange only on change?
}


CafeteriaWidget.prototype.setCafeteriaById = function(id) {
  var cafFactory = new CafeteriaFactory();
  var caf = cafFactory.getCafeteriaById(id);
  
  this.setCafeteria(caf);  
}


CafeteriaWidget.prototype.setDay = function(day) {
  var old = this.day;
  
  this.day = day;
  this.listener.dayChanged(old, day);
}