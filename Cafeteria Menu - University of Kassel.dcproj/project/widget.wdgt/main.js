var WIDGET = new CafeteriaWidget();

//
// Function: load()
// Called by HTML body element's onload event when the widget is ready to start
//
function load() {
    dashcode.setupParts();
    
    WIDGET.init();
    
    // TODO: => init() ?
    replaceScrollAreaContent(ELEMENT_ID_INFO_SCROLL_AREA, INFO);
}

//
// Function: remove()
// Called when the widget has been removed from the Dashboard
//
function remove() {
    // Remove any preferences as needed TODO: => WIDGET.remove();   
    removeAllPrefs();
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
    
    popupSetSelected(ELEMENT_ID_POPUP_PRICECHOOSER, WIDGET.getPref(PREF_PRICE)); // TODO
        
    hideElement("front");
    showElement("back");
    
    refreshScrollArea(ELEMENT_ID_INFO_SCROLL_AREA); // TODO: this is hack to get scroll bars to the scroll area

    if (window.widget) {
        setTimeout('widget.performTransition();', 0);
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
    
    showElement("front");
    hideElement("back");

    if (window.widget) {
        setTimeout('widget.performTransition();', 0);
        
        WIDGET.autoSetMenu();
    }
}

function switchWeekday(event) {
  day = popupGetSelected(ELEMENT_ID_POPUP_WEEKCHOOSER);
  WIDGET.setDay(day);
}


function showMensaInBrowser(event) {
  widget.openURL(WIDGET.getCafeteria().getURL());
}

// TODO => CafeteriaWidget
function setStatus(newState) {
  replaceInnerHTML("state", dashcode.getLocalizedString(newState));
}

// TODO => CafeteriaParserListener
function setWeek(newWeek) {
  replaceInnerHTML("week", newWeek); // TODO
}


function manupdate(event) {
  WIDGET.getCafeteria().update();
}


function chooserChangeMensa(event) { // TODO: function name
  cafId = popupGetSelected(ELEMENT_ID_POPUP_CAFETERIACHOOSER);
  WIDGET.setCafeteriaById(cafId);
}


function chooserChangePrice(event) {
  priceId = popupGetSelected(ELEMENT_ID_POPUP_PRICECHOOSER);
  WIDGET.savePref(PREF_PRICE, priceId); //TODO maybe change it
}


function downloadLatestVersion(event) {
  widget.openURL(DOWNLOAD_URL); // TODO: 
}


if (window.widget) {
    widget.onremove = remove;
    widget.onhide = hide;
    widget.onshow = show;
    widget.onsync = sync;
}