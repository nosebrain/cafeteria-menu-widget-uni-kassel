function CafeteriaWidget() {
  this.updater = new Updater();
  this.cafeteria = null;
  
  this.reader = new InfoPlistReader();
  this.listener = new CafeteriaWidgetListener(this);
}


CafeteriaWidget.prototype.init = function() {
  // init cafeteria
  this.setCafeteriaById(PREF.getPref(PREF_CAFETERIA));
  
  this.initCafeteriaChooser(); // XXX: databinding?!?
}

// TODO: databinding?!?
CafeteriaWidget.prototype.initCafeteriaChooser = function() {
  var cafs = this.reader.get("Cafeterias");
  
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
  this.autosetMenu();
}

CafeteriaWidget.prototype.remove = function() {
  // delete prefs
  for (var i = 0; i < PREFS.length; i++) {
    PREF.savePref(PREFS[i], null);
  }
}


CafeteriaWidget.prototype.autosetMenu = function() {
  var now = new Date();
  var day = now.getDay();
  var hour = now.getHours();
  
  if (hour < 14) {
    day--;
  }
  
  // day--; // because 0 => Sunday
  
  // TODO: what about weekends ?
  
  day = Math.max(day, 0);
  day = Math.min(day, 4);
  
  this.setDay(day);
}


CafeteriaWidget.prototype.getReader = function() {
  return this.reader;
}


CafeteriaWidget.prototype.getUpdater = function() {
  return this.updater;
}


CafeteriaWidget.prototype.getCafeteria = function(cafeteria) {
  return this.cafeteria;
}


CafeteriaWidget.prototype.setCafeteria = function(cafeteria) {
  var old = this.cafeteria;

  this.cafeteria = cafeteria;
  
  this.listener.cafeteriaChanged(old, cafeteria); // TODO: maybe fire propertyChange only on change?
}


CafeteriaWidget.prototype.setCafeteriaById = function(id) {
  var cafFactory = new CafeteriaFactory();
  var caf = cafFactory.getCafeteriaById(id);
  
  this.setCafeteria(caf);  
}


CafeteriaWidget.prototype.setDay = function(day) {
  var old = this.day;
  
  this.day = day;
  alert("setting day to : " + day); // XXX: remove me
  this.listener.dayChanged(old, day);
}