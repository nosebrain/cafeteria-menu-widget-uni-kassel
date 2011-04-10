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

function Cafeteria(id) {
  this.id = id;
}

Cafeteria.prototype.getId = function() {
  return this.id;
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