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

// global pref keys
var PREF_INFO = 'info';
var PREF_LIKE_DISLIKE = 'likeDislike';
var PREF_LIKE_DISLIKE_LENGTH = 'likeDislikeLength';

// pref keys instance
var PREF_CAFETERIA = 'mensa';
var PREF_UPDATE = 'lastUpdated';
var PREF_PRICE = 'priceType';
var PREF_COLLAPSED = 'collapsed';
var PREF_WIDTH = 'myWidth';
var PREF_HEIGHT = 'myHeight';

var DICT_PREF_SEP = '|';
var DICT_PREF_KEY_VALUE_SEP = '=';


// all pref keys (info not added because saved for all instances of this widget)
var PREFS = new Array(PREF_CAFETERIA, PREF_UPDATE, PREF_PRICE, PREF_COLLAPSED, PREF_WIDTH, PREF_HEIGHT);
var INIT_PREFS = new Array(PREF_CAFETERIA, PREF_UPDATE, PREF_PRICE, PREF_COLLAPSED);

function Pref() {
  this.initPrefs();
}

Pref.prototype.initPrefs = function() {
  for (var i = 0; i < INIT_PREFS.length; i++) {
    if (!this.getPref(INIT_PREFS[i])) { // no pref present …
      this.savePref(INIT_PREFS[i], 0); // … init it with 0
    }
  }
  
  var reader = new InfoPlistReader();
  
  if (!this.getPref(PREF_WIDTH)) {
    this.savePref(PREF_WIDTH, reader.get('Width'));
    this.savePref(PREF_HEIGHT, reader.get('Height'));
  }
}

// TODO: extract this methods

Pref.prototype.saveDicPref = function(key, dic) {
  this.saveDicPref(key, dic, false);
}

Pref.prototype.saveDicPref = function(key, dic, system) {
  var value = '';
  for (var a in dic) {
    value += a;
    value += DICT_PREF_KEY_VALUE_SEP;
    value += dic[a];
    value += DICT_PREF_SEP;
  }
  
  this.savePref(key, value, system);
}

Pref.prototype.getDicPref = function(key) {
  this.getDicPref(key, false);
}

Pref.prototype.getDicPref = function(key, system) {
  var stringValue = this.getPref(key, system);
  
  var value = {};
  
  if (!stringValue) {
    return value;
  }
  
  var keyValues = stringValue.split(DICT_PREF_SEP);
  
  for (var i = 0; i < (keyValues.length - 1); i++) { // -1 cause last value is an empty string
    var keyValue = keyValues[i].split(DICT_PREF_KEY_VALUE_SEP);
    if (keyValue.length == 2) {
      value[keyValue[0]] = keyValue[1];
    }
  }
  
  return value;
}

Pref.prototype.savePref = function(key, value) {
  this.savePref(key, value, false);
}

Pref.prototype.savePref = function(key, value, system) {
  if (!system) {
    key = createInstancePreferenceKey(key);
  }
  
  widget.setPreferenceForKey(value, key);
}

Pref.prototype.getPref = function(key) {
  return this.getPref(key, false);
}

Pref.prototype.getPref = function(key, system) {
  if (!system) {
    key = createInstancePreferenceKey(key);
  }
  
  return widget.preferenceForKey(key);
}