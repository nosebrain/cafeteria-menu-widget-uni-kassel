/**
 * Cafeteria Widget - University of Kassel
 *
 *
 * Copyright 2009 - 2010, Daniel Zoller
 *                        http://nosebrain.de
 *
 * This widget is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This widget is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this widget; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA 
 *
 *
 * @author Daniel Zoller<nosebrain@gmx.net>
 */


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
  var cafs = this.widget.getReader().get('Cafeterias');
  
  var cafeterias = new Array();
  for (i = 0; i < cafs.length; i++) {
    cafeterias.push(cafs[i]['Name']);
  }
  
  $(CAFETERIA_CHOOSER_SELECTOR).popup().setOptions(cafeterias);
  
  /*
   * bind all gui elements
   */
  
  $(CAFETERIA_CHOOSER_SELECTOR).change(function() {
    alert('changed');
    // TODO
  });
  
  $(PRICE_CHOOSER_SELECTOR).change(function() {
    // TODO
  });
}

BackViewController.prototype.viewWillAppear = function() {
  $(CAFETERIA_CHOOSER_SELECTOR).popup().setSelectedIndex(PREF.getPref(PREF_CAFETERIA));
  $(PRICE_CHOOSER_SELECTOR).popup().setSelectedIndex(PREF.getPref(PREF_PRICE));
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

BackViewController.prototype.gotInformation = function(result) {
  $(INFO_SCROLL_AREA_SELECTOR).scrollArea().setContent(result);
}