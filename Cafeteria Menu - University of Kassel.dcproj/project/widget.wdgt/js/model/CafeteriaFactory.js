var CAFETERIAS_ID = "Cafeterias";
var BASE_URL_ID = "CafeteriaBaseAddress";
var CAF_NAME_ID = "Name";
var CAF_ADDRESS_ID = "Address";

function CafeteriaFactory() {
  reader = new InfoPlistReader();
  
  this.cafeteriaData = reader.get(CAFETERIAS_ID);
  this.baseURL = reader.get(BASE_URL_ID);
}


CafeteriaFactory.prototype.getCafeteriaById = function(id) {
  cafeteria = this.cafeteriaData[id];
  
  return new Cafeteria(cafeteria[CAF_NAME_ID], this.baseURL + cafeteria[CAF_ADDRESS_ID])
}