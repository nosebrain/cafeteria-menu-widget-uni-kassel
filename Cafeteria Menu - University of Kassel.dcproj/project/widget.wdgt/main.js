var PREF = new Pref();
var WIDGET = new CafeteriaWidget();

//
// Function: load()
// Called by HTML body element's onload event when the widget is ready to start
//
function load() {
  dashcode.setupParts();
  
  WIDGET.init();
}

//
// Function: remove()
// Called when the widget has been removed from the Dashboard
//
function remove() {
  WIDGET.remove(); 
}

//
// Function: hide()
// Called when the widget has been hidden
//
function hide() {
  // WUDGET.hide();
}

//
// Function: show()
// Called when the widget has been shown
//
function show() {
  WIDGET.show();
}

//
// Function: sync()
// Called when the widget has been synchronized with .Mac
//
function sync() {
  // TODO
}

//
// Function: showBack(event)
// Called when the info button is clicked to show the back of the widget
//
// event: onClick event from the info button
//
function showBack(event) {
  if (window.widget) {
    widget.prepareForTransition("ToBack");
  }
  
  hideElement("front");
  showElement("back");
  
  refreshScrollArea(ELEMENT_ID_INFO_SCROLL_AREA); // TODO: this is a hack to get scroll bars to the scroll area


  if (window.widget) {
    setTimeout('widget.performTransition();', 0);
  }
  
  // TODO:
  popupSetSelected(ELEMENT_ID_POPUP_CAFETERIACHOOSER, PREF.getPref(PREF_CAFETERIA));
  popupSetSelected(ELEMENT_ID_POPUP_PRICECHOOSER, PREF.getPref(PREF_PRICE));
}

//
// Function: showFront(event)
// Called when the done button is clicked from the back of the widget
//
// event: onClick event from the done button
//
function showFront(event) {
  if (window.widget) {
    widget.prepareForTransition("ToFront");
  }
    
  showElement("front");
  hideElement("back");
  

  if (window.widget) {
    setTimeout('widget.performTransition();', 0);
    setTimeout('WIDGET.autosetMenu();', 0);
  }
}

function switchWeekday(event) {
  var day = popupGetSelected(ELEMENT_ID_POPUP_WEEKCHOOSER);
  WIDGET.setDay(day);
}


function openMenuInBrowser(event) {
  widget.openURL(WIDGET.getCafeteria().getURL());
}


function manupdate(event) {
  WIDGET.getCafeteria().update();
}


function changeCafeteria(event) {
  var cafId = popupGetSelected(ELEMENT_ID_POPUP_CAFETERIACHOOSER);
  WIDGET.setCafeteriaById(cafId);
}


function changePrice(event) {
  var priceId = popupGetSelected(ELEMENT_ID_POPUP_PRICECHOOSER);
  PREF.savePref(PREF_PRICE, priceId);
}


function downloadLatestVersion(event) {
  widget.openURL(WIDGET.getUpdater().getDownloadURL());
}


if (window.widget) {
  widget.onremove = remove;
  widget.onhide = hide;
  widget.onshow = show;
  widget.onsync = sync;
}