function Menu() {
  this.days = new Array();
  
  for (var i = 0; i < 5; i++) {
    this.days.push(new Day());
  }
  
  this.week = null;
}

Menu.prototype.getWeek = function() {
  return this.week;
}


Menu.prototype.setWeek = function(week) {
  this.week = week;
}


Menu.prototype.getDays = function() {
  return this.days;
}


Menu.prototype.getDay = function(day) {
  return this.days[day];
}