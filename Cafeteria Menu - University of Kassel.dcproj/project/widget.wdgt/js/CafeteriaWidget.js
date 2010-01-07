function CafeteriaWidget() {
  this.updater = new Updater();
  this.cafeteria = null;
  
  this.reader = new InfoPlistReader(); // TODO
  this.listener = new CafeteriaWidgetListener();
}


CafeteriaWidget.prototype.init = function() {
  this.initPrefs();

  // init cafeteria
  this.setCafeteriaById(this.getPref(PREF_CAFETERIA));
  
  this.initCafeteriaChooser();
}


CafeteriaWidget.prototype.initPrefs = function() {
  for (var i = 0; i < PREFS.length; i++) {
    if (!this.getPref(PREFS[i])) {
      this.savePref(PREFS[i], 0); // init with 0
    }
  }
}


CafeteriaWidget.prototype.initCafeteriaChooser = function() {
  cafs = this.reader.get("Cafeterias");
  
  var cafeterias = new Array();
  for (i = 0; i < cafs.length; i++) {
    cafeterias.push(cafs[i]["Name"]);
  }
  
  $(ELEMENT_ID_POPUP_MENSACHOOSER).object.setOptions(cafeterias);
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


CafeteriaWidget.prototype.setCafeteria = function(cafeteria) {
  this.cafeteria = cafeteria;
  
  if (this.cafeteria) {
    this.cafeteria.update();
  }
}


CafeteriaWidget.prototype.setCafeteriaById = function(id) {
  cafFactory = new CafeteriaFactory();
  caf = cafFactory.getCafeteriaById(id);
  
  // presist cafeteria
  this.savePref(PREF_CAFETERIA, id);
  
  this.setCafeteria(caf);  
}