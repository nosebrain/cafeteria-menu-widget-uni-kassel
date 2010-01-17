function Cafeteria(id) {
  this.id = id;
  this.nextUpdate = null;
  this.parser = new CafeteriaParser(this);
}

Cafeteria.prototype.getId = function() {
  return this.id;
}


Cafeteria.prototype.getNextUpdate = function() {
  if (!this.nextUpdate) {
    // load from pref TODO: move to cafeteria load method
    updateTime = PREF.getPref(PREF_UPDATE);
    if (updateTime) {
      this.nextUpdate = new Date(updateTime);
    }
  }
  
  return this.nextUpdate;
}


Cafeteria.prototype.setNextUpdate = function(date) {
  this.nextUpdate = date;
  
  // save it TODO: Property change listener
  PREF.savePref(PREF_UPDATE, date.getTime());
}


Cafeteria.prototype.getName = function() {
  return this.name;
}


Cafeteria.prototype.setName = function(name) {
  this.name = name;
}


Cafeteria.prototype.getURL = function() {
  return this.url;
}


Cafeteria.prototype.setURL = function(url) {
  this.url = url;
}


Cafeteria.prototype.getMenu = function() {
  return this.menu;
}


Cafeteria.prototype.setMenu = function(menu) {
  this.menu = menu;
}


Cafeteria.prototype.updateNecessary = function() {
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


Cafeteria.prototype.update = function() {
  this.parser.parse();
}