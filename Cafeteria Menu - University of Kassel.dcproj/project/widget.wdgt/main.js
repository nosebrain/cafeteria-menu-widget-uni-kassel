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
  // TODO
  // WIDGET.hide();
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
  // WIDGET.sync(); // TODO:???
}

//
// Function: resizeAndShowBack(event)
// Called when the info button is clicked to show the back of the widget
//
// event: onClick event from the info button
//
function resizeAndShowBack(event) {
  // TODO move to CafeteriaBackController viewWillAppear(); viewDidAppear()
  WIDGET.showBack();
  WidgetUtils.resizeWithAnimationTo(WIDGET.getReader().get("Width"), WIDGET.getReader().get("Height"), showBack);
  
  // load settings TODO: refactor? 
  ElementUtils.getPopUp(ELEMENT_ID_POPUP_CAFETERIACHOOSER).setSelectedIndex(PREF.getPref(PREF_CAFETERIA));
  ElementUtils.getPopUp(ELEMENT_ID_POPUP_PRICECHOOSER).setSelectedIndex(PREF.getPref(PREF_PRICE));
}

function showBack() {
  if (window.widget) {
    widget.prepareForTransition("ToBack");
  }
  
  $('#front').hide();
  $('#back').show();

  if (window.widget) {
    setTimeout('widget.performTransition();', 0);
    
    // TODO: move view code WIDGET.backShowed();
    setTimeout('ElementUtils.getScrollArea(ELEMENT_ID_INFO_SCROLL_AREA).refresh()', 0);// TODO: this is a hack to get scroll bars to the scroll area
  }
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
  
  ElementUtils.show("front");
  ElementUtils.hide("back");
  

  if (window.widget) {
    setTimeout('widget.performTransition();', 0);
    // TODO: move View code 
    // setTimeout('WIDGET.autosetMenu();', 0);
    setTimeout('WIDGET.restoreSize();', 600);
  }
}

function switchWeekday(event) {
  WIDGET.getFrontViewController().switchedWeekday();
}

function openMenuInBrowser(event) {
  // WIDGET.openCafeteriaSite() TODO
  widget.openURL(WIDGET.getCafeteria().getURL());
}

function manupdate(event) {
  WIDGET.getMenuUpdater().updateMan();
}

function changeCafeteria(event) {
  var cafId = $("#" + ELEMENT_ID_POPUP_CAFETERIACHOOSER).popup().getSelectedIndex(); // TODO
  WIDGET.setCafeteriaById(cafId);
}

function changePrice(event) {
  var priceId = ElementUtils.getPopUp(ELEMENT_ID_POPUP_PRICECHOOSER).getSelectedIndex();
  PREF.savePref(PREF_PRICE, priceId);
}

function downloadLatestVersion(event) {
  // WIDGET.downloadNewestVersion(); // TODO: implement 
  widget.openURL(WIDGET.getUpdater().getDownloadURL());
}


if (window.widget) {
  widget.onremove = remove;
  widget.onhide = hide;
  widget.onshow = show;
  widget.onsync = sync;
}