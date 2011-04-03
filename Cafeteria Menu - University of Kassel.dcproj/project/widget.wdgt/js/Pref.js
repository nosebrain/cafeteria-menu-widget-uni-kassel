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
var PREF_INFO = "info";

// pref keys instance
var PREF_CAFETERIA = "mensa";
var PREF_UPDATE = "lastUpdated";
var PREF_PRICE = "priceType";
var PREF_COLLAPSED = "collapsed";
var PREF_WIDTH = "myWidth";
var PREF_HEIGHT = "myHeight";

// all pref keys (info not added because saved for all instances of this widget)
var PREFS = new Array(PREF_CAFETERIA, PREF_UPDATE, PREF_PRICE, PREF_COLLAPSED);

function Pref() {
  this.initPrefs();
}


Pref.prototype.initPrefs = function() {
  for (var i = 0; i < PREFS.length; i++) {
    if (!this.getPref(PREFS[i])) { // no pref present …
      this.savePref(PREFS[i], 0); // … init it with 0
    }
  }
  
  var reader = new InfoPlistReader();
  
  if (!this.getPref(PREF_WIDTH)) {
    this.savePref(PREF_WIDTH, reader.get("Width"));
    this.savePref(PREF_HEIGHT, reader.get("Height"));
  }
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