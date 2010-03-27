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

function CafeteriaParserListener(parser) {
  this.parser = parser;
}

CafeteriaParserListener.prototype.startedDownload = function() {
  this.setCurrentState(STATE_LOADING);
}


CafeteriaParserListener.prototype.startedParsing = function(response) {
  this.setCurrentState(STATE_PARSING);
}


CafeteriaParserListener.prototype.gotInformation = function(result) {
  PREF.savePref(PREF_INFO, result, true);
  ElementUtils.getScrollArea(ELEMENT_ID_INFO_SCROLL_AREA).setContent(result);
}


CafeteriaParserListener.prototype.gotWeek = function(start, end) {
  var dateStr = end.split(/\./); 
  // var dateStart = start.split(/\./); // TODO: first day of the week
  
  var year = dateStr[2];
  var month = dateStr[1] - 1;
  var day = myParseInt(dateStr[0]) + 2;  // 2 <=> friday => sunday
  
  var date = new Date(year, month, day, 14, 0, 0);
  
  var now = new Date();
  
  if (now >= date) {
    date.setHours(now.getHours());
  }
  
  var nextUpdate = this.parser.getCafeteria().getNextUpdate();	
  
  if (nextUpdate) {
    // TODO: add 60 minutes
  }
  
  // save it
  this.parser.getCafeteria().setNextUpdate(date);
  
  // update week
  ElementUtils.replaceInnerHTML(ELEMENT_ID_WEEK, start + "-" + end);
}


CafeteriaParserListener.prototype.finishedParsing = function(result) {
  // change state
  this.setCurrentState(STATE_OK);
}


CafeteriaParserListener.prototype.parsingFailed = function(error) {
  // change state
  alert("exception while " + this.currentState + ": " + error);
  this.setCurrentState(STATE_FAILED);
}


CafeteriaParserListener.prototype.setCurrentState = function(state) {
  this.currentState = state;
  
  // display state
  ElementUtils.replaceInnerHTML(ELEMENT_ID_STATUS_LABEL, dashcode.getLocalizedString(state));
}