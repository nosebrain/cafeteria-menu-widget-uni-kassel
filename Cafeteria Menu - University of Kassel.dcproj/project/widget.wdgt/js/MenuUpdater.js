function MenuUpdater() {
  /*
  if (this.cafeteria.updateNecessary()) {
    this.cafeteria.update(true);
  }
  */
}

MenuUpdater.prototype.checkForUpdate = function() {
  if (this.updateNeccessary()) {
    var parser = new CafeteriaParser(this.widget.getCafeteria(), new CafeteriaParserListener());
    parser.parse();
  }
}

MenuUpdater.prototype.setNextUpdate = function(date) {
  this.nextUpdate = date;
  
  // save it TODO: Property change listener
  PREF.savePref(PREF_UPDATE, date.getTime());
}

MenuUpdater.prototype.getNextUpdate = function() {
  if (!this.nextUpdate) {
    // load from pref TODO: move to cafeteria load method
    updateTime = PREF.getPref(PREF_UPDATE);
    if (updateTime) {
      this.nextUpdate = new Date(updateTime);
    }
  }
  
  return this.nextUpdate;
}

MenuUpdater.prototype.updateNeccessary = function() {
  // now
  var now = new Date();
  // get updateTime from prefs
  var update = this.getNextUpdate();
  
  if (!update || now >= update) {
    alert("Autoupdate " + update);
    return true;
  }
  
  return false;
}


MenuUpdater.prototype.setWidget = function(widget) {
  this.widget = widget;
}

MenuUpdater.prototype.setFrontViewController = function(frontViewController) {
  this.frontViewController = frontViewController;
}