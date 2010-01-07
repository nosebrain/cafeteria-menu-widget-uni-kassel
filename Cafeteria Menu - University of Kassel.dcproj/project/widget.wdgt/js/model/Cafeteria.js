function Cafeteria(name, url) {
  this.name = name;
  this.url = url;
  
  this.nextUpdate = null;
  this.parser = new CafeteriaParser(this);
}

Cafeteria.prototype.getName = function() {
  return this.name;
}

Cafeteria.prototype.getDay = function(day) {
  return this.days[day];
}

Cafeteria.prototype.getURL = function() {
  return this.url;
}

Cafeteria.prototype.setNextUpdate = function(date) {
  this.nextUpdate = date;
  
  // save it
  setPref(PREF_UPDATE, date.getTime());
}

Cafeteria.prototype.getNextUpdate = function() {
  if (!this.nextUpdate) {
    // load from pref
    updateTime = getPref(PREF_UPDATE);
    if (updateTime) {
      this.nextUpdate = new Date(updateTime);
    }
  }
  
  return this.nextUpdate;
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

Cafeteria.prototype.clear = function() {
  this.days = new Array();
  
  for (var i = 0; i < 5; i++) {
    this.days.push(new Day());
  }
}

Cafeteria.prototype.getDay = function(day) {
  return this.days[day]
}

Cafeteria.prototype.update = function(updateContent) {
  this.parser.parse();
}

Cafeteria.prototype.getMenusByDay = function(day) { 
  if (day < 0 || day > 4) {
    throw "IllegalSate getMenusByDay";
  }
  return this.days[day].to_s();
}
