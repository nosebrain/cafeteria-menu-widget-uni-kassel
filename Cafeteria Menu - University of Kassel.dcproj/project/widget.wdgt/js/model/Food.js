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

Food.prototype.printPrice = function() {
  var priceId = PREF.getPref(PREF_PRICE);

  var price = this.getPrice(priceId);
  var print = "<td class = \"price\">";
  
  if (price) {
    print += price;
    print += "€";
  } 
  
  return print + "</td>";
}

Food.prototype.to_s = function() {
  return "<td>" + this.description + "</td>" + this.printPrice();
}