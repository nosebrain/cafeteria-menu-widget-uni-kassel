// pref keys
var PREF_CAFETERIA = "mensa";
var PREF_UPDATE = "lastUpdated";
var PREF_PRICE = "priceType";
var PREF_INFO = "info";

// all pref keys (info not added because saved for all instances of this widget)
var PREFS = new Array(PREF_CAFETERIA, PREF_UPDATE, PREF_PRICE);

function Pref() {
  this.initPrefs();
}


Pref.prototype.initPrefs = function() {
  for (var i = 0; i < PREFS.length; i++) {
    if (!this.getPref(PREFS[i])) { // no pref present …
      this.savePref(PREFS[i], 0); // … init it with 0
    }
  }
}


Pref.prototype.savePref = function(key, value) {
  this.savePref(key, value, false);
}


Pref.prototype.savePref = function(key, value, system) {
  if (!system) {
    key = createInstancePreferenceKey(key)
  }
  
  widget.setPreferenceForKey(value, key);
}


Pref.prototype.getPref = function(key) {
  return this.getPref(key, false);
}


Pref.prototype.getPref = function(key, system) {
  if (!system) {
    key = createInstancePreferenceKey(key);
  }
  
  return widget.preferenceForKey(key);
}
