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

function Day(index) {
  this.index = index;
  this.foods = new Array();
  this.holiday = false;
  this.info = '';
}

Day.prototype.addToFoods = function(food) {
  this.foods.push(food);
}

Day.prototype.removeFromFoods = function(food) {
  var pos = this.foods.indexOf(food);
  if (pos >= 0) {
    this.foods.splice(pos, 1);
  }
}

Day.prototype.getFoods = function() {
  return this.foods;
}

Day.prototype.setHoliday = function(holiday) {
  this.holiday = holiday;
}

Day.prototype.isHoliday = function() {
  return this.holiday;
}

Day.prototype.setInfo = function(info) {
  this.info = info;
}

Day.prototype.getInfo = function() {
  return this.info;
}

Day.prototype.getIndex = function() {
  return this.index;
}