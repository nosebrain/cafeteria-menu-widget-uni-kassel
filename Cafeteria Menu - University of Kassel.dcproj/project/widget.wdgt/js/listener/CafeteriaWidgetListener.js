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
    content = day.getDescription();
  } else {    
    // get menu for new day
    content = day.getMenuAsString();
  }
  
  // set new content
  ElementUtils.getScrollArea(ELEMENT_ID_MENU_SCROLL_AREA).setContent(content);
}