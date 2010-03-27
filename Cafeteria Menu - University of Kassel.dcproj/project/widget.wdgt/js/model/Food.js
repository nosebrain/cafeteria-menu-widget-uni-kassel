function Food() {
  this.price = new Array();
}

Food.prototype.setPrice = function(index, price) {
  this.price[index] = price;
}

Food.prototype.getPrice = function(index) {
  if (index < 0 || index > 2) {
    return null;
  }
  
  return this.price[index];
}

Food.prototype.setDescription = function(description) {
  this.description = description;
}

Food.prototype.getDescription = function() {
  return this.description;
}

Food.prototype.printPrice = function() {
  var priceId = PREF.getPref(PREF_PRICE);

  var price = this.getPrice(priceId);
  var print = "<td class = \"price\">";
  
  if (price) {
    print += price;
    print += "€";
  } 
  
  return print + "</td>";
}

Food.prototype.to_s = function() {
  return "<td>" + this.description + "</td>" + this.printPrice();
}