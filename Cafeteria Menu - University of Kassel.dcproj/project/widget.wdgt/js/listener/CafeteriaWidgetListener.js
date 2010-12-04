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

function CafeteriaWidgetListener(widget) {
  this.widget = widget;
}


CafeteriaWidgetListener.prototype.cafeteriaChanged = function(oldCaf, newCaf) {
  if (newCaf) {
    // update data
    newCaf.update();
    
    var id = newCaf.getId();
  
    // presist selected cafeteria id
    PREF.savePref(PREF_CAFETERIA, id);
  
    // change selected item
    ElementUtils.getPopUp(ELEMENT_ID_POPUP_CAFETERIACHOOSER).setSelectedIndex(id);
  
    // change name
    ElementUtils.replaceInnerHTML(ELEMENT_ID_CAFETERIA, newCaf.getName());
  }
}


CafeteriaWidgetListener.prototype.dayChanged = function(oldDay, newDay) {
  // set popup
  ElementUtils.getPopUp(ELEMENT_ID_POPUP_WEEKCHOOSER).setSelectedIndex(newDay);
  
  var day = this.widget.getCafeteria().getMenu().getDay(newDay);
  
  if (!day) {
    alert("no day " + newDay);
  }
  
  var content = "";
  
  if (day.isHoliday()) {
    content = day.getInfo();
  } else {   
    // get menu for new day
    content = day.getMenuAsString();
  }
  
  // set new content
  ElementUtils.getScrollArea(ELEMENT_ID_MENU_SCROLL_AREA).setContent(content);
}