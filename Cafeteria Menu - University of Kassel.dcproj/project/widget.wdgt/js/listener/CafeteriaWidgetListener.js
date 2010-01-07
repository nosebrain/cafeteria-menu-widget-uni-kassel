function CafeteriaWidgetListener(widget) {
  this.widget = widget;
}


CafeteriaWidgetListener.prototype.cafeteriaChanged = function(oldCaf, newCaf) {
  // update data
  if (newCaf) {
    newCaf.update();
  }
  
  // presist cafeteria
  this.widget.savePref(PREF_CAFETERIA, newCaf.getId()); 
}