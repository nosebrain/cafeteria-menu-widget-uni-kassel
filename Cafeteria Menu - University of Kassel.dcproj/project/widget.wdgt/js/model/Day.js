function Day() {
  this.food = new Array();
  this.holiday = false;
}

Day.prototype.addToFood = function(food) {
  this.food.push(food);
}

Day.prototype.setHoliday = function(holiday) {
  this.holiday = holiday;
}

Day.prototype.isHoliday = function() {
  return this.holiday;
}

Day.prototype.getMenuAsString = function() {
  var result = "<table>";
  
  for (var i = 0; i < this.food.length; i++) {
    result += "<tr";
    if (i % 2 == 1) {
      result += " class='alt'";
    } 
    result += ">";
    result += this.food[i].to_s();
    result += "</tr>";
  }
  
  result += "</table>";
  
  return result;
}