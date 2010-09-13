/**
 *
 * Copyright 2009 - 2010, Daniel Zoller
 *                        http://nosebrain.de
 *
 * @author Daniel Zoller<nosebrain@gmx.net>
 */

function WidgetPref() {
}

WidgetPref.prototype.savePref = function(key, value) {
  this.savePref(key, value, false);
}


WidgetPref.prototype.savePref = function(key, value, system) {
  if (!system) {
    key = createInstancePreferenceKey(key);
  }
  
  widget.setPreferenceForKey(value, key);
}


WidgetPref.prototype.getPref = function(key) {
  return this.getPref(key, false);
}


WidgetPref.prototype.getPref = function(key, system) {
  if (!system) {
    key = createInstancePreferenceKey(key);
  }
  
  return widget.preferenceForKey(key);
}