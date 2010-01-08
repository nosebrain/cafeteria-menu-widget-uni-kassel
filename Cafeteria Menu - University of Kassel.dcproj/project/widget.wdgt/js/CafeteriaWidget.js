function CafeteriaWidget() {
  this.updater = new Updater();
  this.cafeteria = null;
  
  this.reader = new InfoPlistReader(); // TODO
  this.listener = new CafeteriaWidgetListener(this);
}


CafeteriaWidget.prototype.init = function() {
  this.initPrefs();

  // init cafeteria
  this.setCafeteriaById(this.getPref(PREF_CAFETERIA));
  
  this.initCafeteriaChooser();
}

CafeteriaWidget.prototype.initPrefs = function() {
  for (var i = 0; i < PREFS.length; i++) {
    if (!this.getPref(PREFS[i])) { // no pref present …
      this.savePref(PREFS[i], 0); // … init it with 0
    }
  }
}

// TODO: databinding?!?
CafeteriaWidget.prototype.initCafeteriaChooser = function() {
  cafs = this.reader.get("Cafeterias");
  
  var cafeterias = new Array();
  for (i = 0; i < cafs.length; i++) {
    cafeterias.push(cafs[i]["Name"]);
  }
  
  $(ELEMENT_ID_POPUP_CAFETERIACHOOSER).object.setOptions(cafeterias);
}


CafeteriaWidget.prototype.show = function() {
  // check for food updates
  if (this.cafeteria.updateNecessary()) {
       this.cafeteria.update(true);
  }
  
  // check for widget updates TODO: wSparkle
  this.updater.checkForUpdate();
  
  // set menu
  this.autoSetMenu();
}


CafeteriaWidget.prototype.autoSetMenu = function() {
  now = new Date();
  day = now.getDay();
  hour = now.getHours();
  
  if (hour >= 14) {
    day++;
  }
  
  if (day > 5 || day < 0) { // FIXME: <= 0????
    // TODO weekends
    
    return;
  }

  day--; // because 0 => Sunday
  
  this.setDay(day);
}


CafeteriaWidget.prototype.savePref = function(key, value) {
  instanceKey = createInstancePreferenceKey(key)
  widget.setPreferenceForKey(value, instanceKey);
}


CafeteriaWidget.prototype.getPref = function(key) {
  instanceKey = createInstancePreferenceKey(key);
  return widget.preferenceForKey(instanceKey);
}


CafeteriaWidget.prototype.getUpdater = function() {
  return this.updater();
}


CafeteriaWidget.prototype.getCafeteria = function(cafeteria) {
  return this.cafeteria;
}


CafeteriaWidget.prototype.setCafeteria = function(cafeteria) {
  old = this.cafeteria;

  this.cafeteria = cafeteria;
  
  if (old != cafeteria) {
    this.listener.cafeteriaChanged(old, cafeteria);
  }
}


CafeteriaWidget.prototype.setCafeteriaById = function(id) {
  cafFactory = new CafeteriaFactory();
  caf = cafFactory.getCafeteriaById(id);
  
  this.setCafeteria(caf);  
}

CafeteriaWidget.prototype.setDay = function(day) {
  old = this.day;
  
  this.day = day;
  
  this.listener.dayChanged(old, day);
}