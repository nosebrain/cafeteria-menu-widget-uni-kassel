function Menu() {
  this.price = new Array();
}

Menu.prototype.setPrice = function(index, price) {
  this.price[index] = price;
}

Menu.prototype.getPrice = function(index) {
  if (index < 0 || index > 2) {
    return null;
  }
  
  return this.price[index];
}

Menu.prototype.getRowHeight = function() {
  return parseInt(this.description.length / (150 / 4) * 2 + 1.18);
}

Menu.prototype.setDescription = function(description) {
  this.description = description;
}

Menu.prototype.printPrice = function() {
  var priceId = getPref(PREF_PRICE);

  var price = this.getPrice(priceId);
  var print = "<td class = \"price\">";
  
  if (price) {
    print += price;
    print += "€";
  } 
  
  return print + "</td>";
}

Menu.prototype.to_s = function() {
  return "<td>" + this.description + "</td>" + this.printPrice(); // + this.category.to_s();
}