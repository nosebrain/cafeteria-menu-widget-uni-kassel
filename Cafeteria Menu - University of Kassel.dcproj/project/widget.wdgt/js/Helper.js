// FIXME a better implementation of HTMLCode replacment
function HTMLCodeReplacer(htmlCode, replace) {
  this.htmlCode = htmlCode;
  this.replace = replace;
}

var HTMLCodes = new Array(
  new HTMLCodeReplacer(/<font face="Arial" size="1">/g, ""),
  new HTMLCodeReplacer(/<\/font>/g, ""),
  new HTMLCodeReplacer(/<\/td>/g, ""),
  new HTMLCodeReplacer(/&nbsp;/g, " "),
  new HTMLCodeReplacer(/<br \/>/g, " "),
  new HTMLCodeReplacer(/<\/span>/g, " "),
  new HTMLCodeReplacer(/<span class="detail">/g, ""),
  new HTMLCodeReplacer(/  /, " ")
);

function removeHTMLCode(source) {
  for (i = 0; i < HTMLCodes.length; i++) {
    htmlCodeReplacer = HTMLCodes[i];
    source = source.replace(htmlCodeReplacer.htmlCode, htmlCodeReplacer.replace);
  }
  
  return source;
}


function showElement(id) {
  element = $(id);
  
  if (element) {
    element.style.display = "block";
  }
}

function hideElement(id) {
  element = $(id);
  
  if (element) {
    element.style.display = "none";
  }
}

function setOpacity(id, value) {
  element = $(id);
  
  if (element) {
    element.style.opacity = value;
  }
}

function $(id) {
  return document.getElementById(id);
}


function replaceInnerHTML(id, newContent) {
  element = $(id);
  
  if (element) {
    element.innerHTML = newContent;
  }
}


/** 
 * scrollArea
 */
function replaceScrollAreaContent(id, newContent) {
  scrollArea = $(id);
  
  if (scrollArea == null) {
    // no scrollArea => nothing to do
    return;
  }
  
  content = scrollArea.object.content;
  content.innerHTML = newContent;
  
  refreshScrollArea(id);
}


function refreshScrollArea(id) {
  scrollArea = $(id);
  
  if (scrollArea) {
    scrollArea.object.refresh();
  }
}

/**
 * popups
 */
function popupGetSelected(id) {
  popup = $(id);
  if (popup) {
    return popup.object.getSelectedIndex();
  }
  return null;
}


function popupSetSelected(id, index) {
  popup = $(id);
  if (popup) {
    popup.object.setSelectedIndex(index);
  }
}

// TODO
function removeAllPrefs() {
  for (i = 0; i < PREFS.length; i++) {
    WIDGET.savePref(PREFS[i] , null);
  } 
}


function myParseInt(string) {
  // remove leading 0's
  count = 0;
  while(string.substr(count,1) == "0") {
    count++;
  }
  
  string = string.substring(count, string.length);
  
  // than call parse int
  return parseInt(string);
}