function CafeteriaWidgetListener(widget) {
  this.widget = widget;
}


CafeteriaWidgetListener.prototype.cafeteriaChanged = function(oldCaf, newCaf) {
  // update data
  if (newCaf) {
    newCaf.update();
    
    id = newCaf.getId();
  
    // presist cafeteria
    this.widget.savePref(PREF_CAFETERIA, id);
  
    // change selected item
    popupSetSelected(ELEMENT_ID_POPUP_CAFETERIACHOOSER, id);
  
    // change name
    replaceInnerHTML(ELEMENT_ID_CAFETERIA, newCaf.getName());
  }
}


CafeteriaWidgetListener.prototype.dayChanged = function(oldDay, newDay) {
  // set popup
  popupSetSelected(ELEMENT_ID_POPUP_WEEKCHOOSER, newDay);
  
  day = this.widget.getCafeteria().getMenu().getDay(newDay);
  
  if (day.isHoliday()) {
    hideElement(ELEMENT_ID_MENU_SCROLL_AREA);
    showElement("holiday");
  } else {
    hideElement("holiday");
    showElement(ELEMENT_ID_MENU_SCROLL_AREA);
    
     // get menu for new day
    newContent = day.getMenuAsString();
    replaceScrollAreaContent(ELEMENT_ID_MENU_SCROLL_AREA, newContent);
  }
}