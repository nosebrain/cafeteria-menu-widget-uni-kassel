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

// states
var STATE_LOADING = 'Loading data ...';
var STATE_PARSING = 'Parsing data ...';
var STATE_OK = '';
var STATE_FAILED = 'Error while parsing informations';

var UPDATE_INTERVAL = 120 * 60 * 1000; // 2 hours
var START_HOUR = 14;

function MenuUpdater() {
}

MenuUpdater.prototype.setNextUpdate = function(date) {
  alert('old: ' + this.getNextUpdate() + '\n new: ' + date);
  this.nextUpdate = date;
  
  // save it
  PREF.savePref(PREF_UPDATE, date.getTime());
}

MenuUpdater.prototype.getNextUpdate = function() {
  if (!this.nextUpdate) {
    // load from pref
    updateTime = PREF.getPref(PREF_UPDATE);
    if (updateTime) {
      this.nextUpdate = new Date(updateTime);
    }
  }
  
  return this.nextUpdate;
}

MenuUpdater.prototype.resetNextUpdate = function() {
  PREF.savePref(PREF_UPDATE, null); // reset last update
  this.nextUpdate = null;
}

MenuUpdater.prototype.checkForUpdate = function() {
  if (this.updateNeccessary()) {
    this.manUpdate = false;
    this.update();
  }
}

MenuUpdater.prototype.updateMan = function() {
  this.manUpdate = true;
  this.update();
}

MenuUpdater.prototype.update = function() {
//  var parser = new CafeteriaParser(this.widget.getCafeteria(), this);
  var parser = new ServiceCafeteriaParser(this.widget.getCafeteria(), this);
  parser.parse();
}

MenuUpdater.prototype.updateNeccessary = function() {
  // now
  var now = new Date();
  // get updateTime from prefs
  var update = this.getNextUpdate();
  
  if (!update || now >= update) {
    alert("Autoupdate " + update);    
    return true;
  }
  
  return false;
}

MenuUpdater.prototype.startedDownload = function() {
  this.setCurrentState(STATE_LOADING);
}

MenuUpdater.prototype.startedParsing = function(response) {
  this.setCurrentState(STATE_PARSING);
}

MenuUpdater.prototype.gotInformation = function(result) {
  PREF.savePref(PREF_INFO, result, true);
  
  this.widget.getBackViewController().gotInformation(result);
}

MenuUpdater.prototype.gotWeek = function(start, end) {
  var dateStr = end.split(/\./);
  alert('start:' + start + ' end: ' + end);
  var year = myParseInt(dateStr[2]);
  var month = myParseInt(dateStr[1]) - 1;
  var day = myParseInt(dateStr[0]) + 1;  // end=friday; +1=saturday
  
  var date = new Date(year, month, day, START_HOUR, 0, 0); // at 14:00
  alert('date: ' + date);
  
  var nextUpdate = this.getNextUpdate();
  
  if (nextUpdate == null || nextUpdate < date) {
    alert('found new week: ' + date);
    this.setNextUpdate(date); // got new week
  } 
  
  // TODO: remove
  /*
  else if (nextUpdate && (nextUpdate.getDay() != 1) && !this.manUpdate) {    
    var newDate = new Date();
    newDate.setTime(nextUpdate.getTime() + UPDATE_INTERVAL);
    date = newDate;
  }
  
  if (!nextUpdate || (date > nextUpdate)) {
    // save it
    this.setNextUpdate(date);
  }*/
  
  // inform front view controller
  this.widget.getFrontViewController().showWeek(start, end);
}

MenuUpdater.prototype.noNewMenuAvailable = function() {
  // menu not available try UPDATE_INTERVAL seconds later
  if (!this.manUpdate) {
    this.extendUpdateTime();
  }
}

MenuUpdater.prototype.extendUpdateTime = function() {
  var nextUpdate = this.getNextUpdate();
  if (nextUpdate == null) {
    nextUpdate = new Date();
  }
  
  var newDate = new Date();
  newDate.setTime(nextUpdate.getTime() + UPDATE_INTERVAL);
  
  // set only if not monday and newDate
  if (newDate > nextUpdate && newDate.getDay() < 1) {
    this.setNextUpdate(newDate);
  }
}

MenuUpdater.prototype.gotMenu = function(menu) {
  this.widget.updateMenu(menu);
}

MenuUpdater.prototype.finishedParsing = function(result) {
  // change state
  this.setCurrentState(STATE_OK);
  this.manUpdate = false;
}

MenuUpdater.prototype.parsingFailed = function(error) {
  // change state
  alert('exception while ' + this.currentState + ': ' + error);
  this.setCurrentState(STATE_FAILED);
}

MenuUpdater.prototype.setCurrentState = function(state) {
  var oldState = this.currentState;
  this.currentState = state;
  
  this.widget.getFrontViewController().changedState(oldState, state);
}

MenuUpdater.prototype.setWidget = function(widget) {
  this.widget = widget;
}