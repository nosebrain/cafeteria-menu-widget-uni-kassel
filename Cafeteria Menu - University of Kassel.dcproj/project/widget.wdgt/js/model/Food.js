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

function Food() {
  this.price = new Array();
  this.recommended = false;
}

Food.prototype.setPrice = function(index, price) {
  this.price[index] = price;
}

Food.prototype.getPrice = function(index) {
  if (index < 0 || index > 2) {
    return null;
  }
  
  return this.price[index];
}

Food.prototype.setDescription = function(description) {
  this.description = description;
}

Food.prototype.getDescription = function() {
  return this.description;
}

Food.prototype.isMeatless = function() {
  return this.description != null && (this.description.indexOf('(f)') > 0); // TODO: get all (...) split with , and look if it contains an "f"
}

Food.prototype.isRecommended = function() {
  return this.recommended;
}

Food.prototype.setRecommended = function(recommended) {
  this.recommended = recommended;
}