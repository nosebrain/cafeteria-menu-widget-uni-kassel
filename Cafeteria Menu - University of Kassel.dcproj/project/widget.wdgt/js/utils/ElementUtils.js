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

var ElementUtils = {};

ElementUtils.hide = function(id) {
  var element = ElementUtils.get(id);
  
  if (element) {
    element.style.display = "none";
  }
}


ElementUtils.show = function(id) {
  var element = ElementUtils.get(id);
  
  if (element) {
    element.style.display = "block";
  }
}


ElementUtils.setOpacity = function(id, value) {
  var element = ElementUtils.get(id);
  
  if (element) {
    element.style.opacity = value;
  }
}


ElementUtils.replaceInnerHTML = function(id, newContent) {
  var element = ElementUtils.get(id);
  
  if (element) {
    element.innerHTML = newContent;
  }
}


ElementUtils.resizeTo = function(id, width, height) {
  var element = ElementUtils.get(id);
  
  if (element) {
    element.style.width = width + "px";
    element.style.height = height + "px";
  }
}


ElementUtils.getObject = function(id) {
  var element = ElementUtils.get(id);
  
  if (element) {
    return element.object;
  }
  
  return null;
}


ElementUtils.getPopUp = function(id) {
  return ElementUtils.getObject(id);
}


ElementUtils.getScrollArea = function(id) {
  return ElementUtils.getObject(id);
}


ElementUtils.get = function(id) {
  return document.getElementById(id);
}