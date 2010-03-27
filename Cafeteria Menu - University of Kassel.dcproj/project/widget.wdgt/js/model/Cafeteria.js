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

function Cafeteria(id) {
  this.id = id;
  this.nextUpdate = null;
  this.parser = new CafeteriaParser(this);
}

Cafeteria.prototype.getId = function() {
  return this.id;
}


Cafeteria.prototype.getNextUpdate = function() {
  if (!this.nextUpdate) {
    // load from pref TODO: move to cafeteria load method
    updateTime = PREF.getPref(PREF_UPDATE);
    if (updateTime) {
      this.nextUpdate = new Date(updateTime);
    }
  }
  
  return this.nextUpdate;
}


Cafeteria.prototype.setNextUpdate = function(date) {
  this.nextUpdate = date;
  
  // save it TODO: Property change listener
  PREF.savePref(PREF_UPDATE, date.getTime());
}


Cafeteria.prototype.getName = function() {
  return this.name;
}


Cafeteria.prototype.setName = function(name) {
  this.name = name;
}


Cafeteria.prototype.getURL = function() {
  return this.url;
}


Cafeteria.prototype.setURL = function(url) {
  this.url = url;
}


Cafeteria.prototype.getMenu = function() {
  return this.menu;
}


Cafeteria.prototype.setMenu = function(menu) {
  this.menu = menu;
}


Cafeteria.prototype.updateNecessary = function() {
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


Cafeteria.prototype.update = function() {
  this.parser.parse();
}