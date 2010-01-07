var WIDGET = new CafeteriaWidget();

function getMensaIndex() {
  return getPref(PREF_MENSA);
}

//
// Function: load()
// Called by HTML body element's onload event when the widget is ready to start
//
function load() {
    dashcode.setupParts();
    
    WIDGET.init();
    
    // => init()
    replaceScrollAreaContent(ELEMENT_ID_INFO_SCROLL_AREA, INFO);
}

//
// Function: remove()
// Called when the widget has been removed from the Dashboard
//
function remove() {
    // Remove any preferences as needed    
    removeAllPrefs();
}

//
// Function: hide()
// Called when the widget has been hidden
//
function hide() {
    
}

//
// Function: show()
// Called when the widget has been shown
//
function show() {
    WIDGET.show();
    
    // ... and select the current day
    autosetMenuAreaContent();
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
    
    popupSetSelected(ELEMENT_ID_POPUP_MENSACHOOSER, getMensaIndex());
    popupSetSelected(ELEMENT_ID_POPUP_PRICECHOOSER, getPref(PREF_PRICE));
        
    hideElement("front");
    showElement("back");
    
    refreshScrollArea(ELEMENT_ID_INFO_SCROLL_AREA);

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
        
        autosetMenuAreaContent();
    }
}

function setMenuAreaContent(day) {
  hideElement("holiday");
  // set popup
  popupSetSelected(ELEMENT_ID_POPUP_WEEKCHOOSER, day);
  
  var dayO = MENSA.getDay(day);
  
  if (dayO.isHoliday()) {
    hideElement("scrollArea");
    showElement("holiday");
  } else {
    showElement("scrollArea");
    var newContent = MENSA.getMenusByDay(day);
    replaceScrollAreaContent(ELEMENT_ID_MENU_SCROLL_AREA, newContent);
  }
}


function autosetMenuAreaContent() {
  var now = new Date();
  var day = now.getDay();
  var hour = now.getHours();
  
  if (hour >= 14) {
    day++;
  }
  
  if (day > 5 || day < 0) {
    if(toggle) {
      toggleSize(null);
    }
    
    return;
  }

  day--; // because 0 => Sunday
  
  setMenuAreaContent(day);
}


function switchWeekday(event) {
  var day = popupGetSelected(ELEMENT_ID_POPUP_WEEKCHOOSER);
  setMenuAreaContent(day);
}


function showMensaInBrowser(event) {
  widget.openURL(MENSA.getURL());
}


function setStatus(newState) {
  replaceInnerHTML("state", dashcode.getLocalizedString(newState));
}


function setWeek(newWeek) {
  replaceInnerHTML("week", newWeek);
}


function manupdate(event) {
  WIDGET.getCafeteria().update();
}


function chooserChangeMensa(event) {
  cafId = popupGetSelected(ELEMENT_ID_POPUP_CAFETERIACHOOSER);
  WIDGET.setCafeteriaById(cafId);
}


function chooserChangePrice(event) {
  priceId = popupGetSelected(ELEMENT_ID_POPUP_PRICECHOOSER);
  WIDGET.savePref(PREF_PRICE, priceId);
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