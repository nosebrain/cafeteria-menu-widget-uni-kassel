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
  WIDGET.hide();
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
  WIDGET.sync();
}

//
// Function: resizeAndShowBack(event)
// Called when the info button is clicked to show the back of the widget
//
// event: onClick event from the info button
//
function showBack(event) {
  WIDGET.showBack();
}

//
// Function: showFront(event)
// Called when the done button is clicked from the back of the widget
//
// event: onClick event from the done button
//
function showFront(event) {
  WIDGET.showFront();
}

function switchWeekday(event) {
  WIDGET.getFrontViewController().switchedWeekday();
}

function openMenuInBrowser(event) {
  widget.openURL(WIDGET.getCafeteria().getURL());
}

function manupdate(event) {
  WIDGET.getMenuUpdater().updateMan();
}

function changeCafeteria(event) {
  WIDGET.getBackViewController().changeCafeteria();
}

function changePrice(event) {
  WIDGET.getBackViewController().changePrice();
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