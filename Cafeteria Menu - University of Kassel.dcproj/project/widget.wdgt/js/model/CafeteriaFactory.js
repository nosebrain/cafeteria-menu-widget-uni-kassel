function CafeteriaFactory() {
  reader = new InfoPlistReader();
  
  this.cafeteriaData = reader.get("Cafeterias");
  this.baseURL = reader.get("CafeteriaBaseAddress");
}


CafeteriaFactory.prototype.getCafeteriaById = function(id) {
  var cafeteriaInfo = this.cafeteriaData[id];
  
  var cafeteria = new Cafeteria(id);
  cafeteria.setName(cafeteriaInfo["Name"]);
  cafeteria.setURL(this.baseURL + cafeteriaInfo["Address"]);
  cafeteria.setMenu(new Menu());
  
  return cafeteria;
}