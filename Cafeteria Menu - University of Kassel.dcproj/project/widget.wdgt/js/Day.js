function Day() {
  this.menus = new Array();
  this.holiday = false;
}

Day.prototype.addToMenus = function(menu) {
  this.menus.push(menu);
}

Day.prototype.setHoliday = function(holiday) {
  this.holiday = holiday;
}

Day.prototype.isHoliday = function() {
  return this.holiday;
}

Day.prototype.to_s = function() {
  var result = "<table>";
  
  for (var i = 0; i < this.menus.length; i++) {
    result += "<tr";
    if (i%2 == 1) {
      result += " class='alt'";
    } 
    result += ">";
    result += this.menus[i].to_s();
    result += "</tr>";
  }
  
  result += "</table>";
  
  return result;
}