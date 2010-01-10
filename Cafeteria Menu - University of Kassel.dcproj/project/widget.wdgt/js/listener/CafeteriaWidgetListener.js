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
    popupSetSelected(ELEMENT_ID_POPUP_CAFETERIACHOOSER, id);
  
    // change name
    replaceInnerHTML(ELEMENT_ID_CAFETERIA, newCaf.getName());
  }
}


CafeteriaWidgetListener.prototype.dayChanged = function(oldDay, newDay) {
  // set popup
  popupSetSelected(ELEMENT_ID_POPUP_WEEKCHOOSER, newDay);
  
  var day = this.widget.getCafeteria().getMenu().getDay(newDay);
  
  if (!day) {
    alert("no day " + newDay);
  }
  
  if (day.isHoliday()) {
    hideElement(ELEMENT_ID_MENU_SCROLL_AREA);
    showElement(ELEMENT_ID_HOLIDAY);
  } else {
    hideElement(ELEMENT_ID_HOLIDAY);
    showElement(ELEMENT_ID_MENU_SCROLL_AREA);
    
     // get menu for new day
    newContent = day.getMenuAsString();
    replaceScrollAreaContent(ELEMENT_ID_MENU_SCROLL_AREA, newContent);
  }
}