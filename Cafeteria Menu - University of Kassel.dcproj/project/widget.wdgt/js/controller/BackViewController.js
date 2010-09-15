var CAFETERIA_CHOOSER_SELECTOR = '#cafeteriaChooser';
var PRICE_CHOOSER_SELECTOR = '#priceChooser';
var INFO_SCROLL_AREA_SELECTOR = '#information';

function BackViewController() {

}

BackViewController.prototype.setWidget = function(widget) {
  this.widget = widget;
}

BackViewController.prototype.viewDidLoad = function() {
  // init cafeteria popup with the data in the info plist file
  var cafs = this.widget.getReader().get("Cafeterias");
  
  var cafeterias = new Array();
  for (i = 0; i < cafs.length; i++) {
    cafeterias.push(cafs[i]["Name"]);
  }
  
  $(CAFETERIA_CHOOSER_SELECTOR).popup().setOptions(cafeterias);
}

BackViewController.prototype.viewWillAppear = function() {
  $(CAFETERIA_CHOOSER_SELECTOR).popup().setSelectedIndex(PREF.getPref(PREF_CAFETERIA));
  $(CAFETERIA_CHOOSER_SELECTOR).popup().setSelectedIndex(PREF.getPref(PREF_PRICE));
}

BackViewController.prototype.viewWillDisappear = function() {
  
}

BackViewController.prototype.changeCafeteria = function() {
  var cafId = $(CAFETERIA_CHOOSER_SELECTOR).popup().getSelectedIndex();
  this.widget.setCafeteriaById(cafId);
}

BackViewController.prototype.changePrice = function() {
  var priceId = $(PRICE_CHOOSER_SELECTOR).popup().getSelectedIndex();
  PREF.savePref(PREF_PRICE, priceId);
}

BackViewController.prototype.cafeteriaChanged = function(oldCafeteria, newCafeteria) {
  if (newCafeteria) {
    $(CAFETERIA_CHOOSER_SELECTOR).popup().setSelectedIndex(newCafeteria.getId());
  }
}