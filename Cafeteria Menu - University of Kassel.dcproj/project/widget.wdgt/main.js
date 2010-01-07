var UPDATER = new Updater();
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
    replaceScrollAreaContent("information", INFO);
    
    var defPrice = getPref(PREF_PRICE);
    if (defPrice == null) {
      setPref(PREF_PRICE, 0);
    }
    
    changeMensa(defMensa, true);
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
    // check if an update is necessary ...    
    /*if (MENSA.updateNecessary()) {
       MENSA.update(true);
    }
    
    // ... and select the current day
    autosetMenuAreaContent();
    
    UPDATER.checkForUpdate();*/
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
    
    refreshScrollArea("information");

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

function changeMensa(index, autoUpdate) {
  /*if (index < 0 || index > (MENSEN.length -1)) {
    throw "IllegalState ChangeMensa";
  }
  
  
  var factory = new CafeteriaFactory();
  
  var cafeteria = factory.getCafeteriaById(index);
  cafeteria.update(false);
  
  MENSA = MENSEN[index];
  replaceInnerHTML(ELEMENT_ID_MENSA, MENSA.getName());
  MENSA.update(autoUpdate);
  
  setPref(PREF_MENSA, index);*/
}

function manupdate(event) {
  MENSA.update(false);
}

function chooserChangeMensa(event) {
  var mensaIndex = popupGetSelected(ELEMENT_ID_POPUP_MENSACHOOSER);
  
  changeMensa(mensaIndex, false);
}

var toggle = true;

function toggleSize(event) {

  toggle = !toggle;
  
  duration = 500;
  interval = 13;
  handler = function(animation, currentRect, startingRect, finishingRect) {
    // resize window and move image to left/right position
    window.resizeTo(currentRect.right, currentRect.bottom);
    $("img").style.left = currentRect.left + "px";
    
    // 
    setOpacity("title", currentRect.top);
    setOpacity("week", currentRect.top);
    setOpacity(ELEMENT_ID_MENSA, currentRect.top);
    setOpacity("weekdayChooser", currentRect.top - 0.5);
  };
  
  startingRect = { left: 10, top: -1, right: 84, bottom: 83 };	// The starting rectangle
  finishingRect = { left: 187, top: 1.5, right: 262, bottom: 290 };	// The finishing rectangle

  // swap start and finish
  if (!toggle) {
    var save = startingRect;
    startingRect = finishingRect;
    finishingRect = save;
  }
    
  var currentRectAnimation = new AppleRectAnimation(startingRect, finishingRect, handler);
  var currentAnimator = new AppleAnimator(duration, interval);
  currentAnimator.addAnimation(currentRectAnimation); 
 
  currentAnimator.start();
}

function downloadLatestVersion(event) {
  widget.openURL(DOWNLOAD_URL);
}

if (window.widget) {
    widget.onremove = remove;
    widget.onhide = hide;
    widget.onshow = show;
    widget.onsync = sync;
}

function chooserChangePrice(event) {
    var price = popupGetSelected(ELEMENT_ID_POPUP_PRICECHOOSER);
    setPref(PREF_PRICE, price);
}