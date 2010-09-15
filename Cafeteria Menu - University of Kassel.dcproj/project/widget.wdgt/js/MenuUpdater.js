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
var STATE_LOADING = "Loading data ...";
var STATE_PARSING = "Parsing data ...";
var STATE_OK = "";
var STATE_FAILED = "Error while parsing informations";

function MenuUpdater() {
}

MenuUpdater.prototype.setNextUpdate = function(date) {
  this.nextUpdate = date;
  
  // save it TODO: Property change listener
  PREF.savePref(PREF_UPDATE, date.getTime());
}

MenuUpdater.prototype.getNextUpdate = function() {
  if (!this.nextUpdate) {
    // load from pref TODO: move to cafeteria load method
    updateTime = PREF.getPref(PREF_UPDATE);
    if (updateTime) {
      this.nextUpdate = new Date(updateTime);
    }
  }
  
  return this.nextUpdate;
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
  var parser = new CafeteriaParser(this.widget.getCafeteria(), this);
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
  
  // TODO: backViewController
  $('#information').scrollArea().setContent(result);
}

MenuUpdater.prototype.gotWeek = function(start, end) {
  var dateStr = end.split(/\./); 
  // var dateStart = start.split(/\./); // TODO: first day of the week
  
  var year = dateStr[2];
  var month = dateStr[1] - 1;
  var day = myParseInt(dateStr[0]) + 1;  // 2 <=> friday => saturday
  
  var date = new Date(year, month, day, 14, 0, 0);
  
  var now = new Date();
  
  if (now >= date) {
    date.setHours(now.getHours());
  }
  
  var nextUpdate = this.getNextUpdate();	
  
  if (nextUpdate && this.manUpdate) {
    alert("add 120 minutes");
    // TODO: add 120 minutes
  }
  
  // save it
  this.setNextUpdate(date);
  
  // inform front view controller
  this.frontViewController.showWeek(start, end);
}

MenuUpdater.prototype.finishedParsing = function(result) {
  // change state
  this.setCurrentState(STATE_OK);
}

MenuUpdater.prototype.parsingFailed = function(error) {
  // change state
  alert("exception while " + this.currentState + ": " + error);
  this.setCurrentState(STATE_FAILED);
}

MenuUpdater.prototype.setCurrentState = function(state) {
  var oldState = this.currentState;
  this.currentState = state;
  
  this.frontViewController.changedState(oldState, state);
}

MenuUpdater.prototype.setWidget = function(widget) {
  this.widget = widget;
}

MenuUpdater.prototype.setFrontViewController = function(frontViewController) {
  this.frontViewController = frontViewController;
}

MenuUpdater.prototype.setBackViewController = function(backViewController) {
  this.backViewController = backViewController;
}