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

function Menu() {
  this.days = new Array();
  
  for (var i = 0; i < 5; i++) {
    this.days.push(new Day(i));
  }
  
  this.week = null;
}

Menu.prototype.getWeek = function() {
  return this.week;
}

Menu.prototype.setWeek = function(week) {
  this.week = week;
}

Menu.prototype.getDays = function() {
  return this.days;
}

Menu.prototype.getDay = function(day) {
  return this.days[day];
}