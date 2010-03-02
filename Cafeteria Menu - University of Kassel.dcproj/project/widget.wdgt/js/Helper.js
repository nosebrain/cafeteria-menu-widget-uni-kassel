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
    var htmlCodeReplacer = HTMLCodes[i];
    source = source.replace(htmlCodeReplacer.htmlCode, htmlCodeReplacer.replace);
  }
  
  return source;
}


function showElement(id) {
  var element = $(id);
  
  if (element) {
    element.style.display = "block";
  }
}

function hideElement(id) {
  var element = $(id);
  
  if (element) {
    element.style.display = "none";
  }
}

function setOpacity(id, value) {
  var element = $(id);
  
  if (element) {
    element.style.opacity = value;
  }
}

function $(id) {
  return document.getElementById(id);
}


function replaceInnerHTML(id, newContent) {
  var element = $(id);
  
  if (element) {
    element.innerHTML = newContent;
  }
}


/** 
 * scrollArea
 */
function replaceScrollAreaContent(id, newContent) {
  var scrollArea = $(id);
  
  if (scrollArea == null) {
    // no scrollArea => nothing to do
    return;
  }
  
  var content = scrollArea.object.content;
  content.innerHTML = newContent;
  
  refreshScrollArea(id);
}


function refreshScrollArea(id) {
  var scrollArea = $(id);
  
  if (scrollArea) {
    scrollArea.object.refresh();
  }
}


function getScrollArea(id) {
  var scrollArea = $(id);
  
  if (!scrollArea) {
    return null;
  }
  
  return scrollArea.object;
}


function resizeScrollArea(id, width, height) {
  var scrollArea = $(id);
  
  if (scrollArea) {
    scrollArea.style.height = height + "px";
    scrollArea.style.width = width + "px";
    
    refreshScrollArea(id);
  }
}

/**
 * popups
 */
function popupGetSelected(id) {
  var popup = $(id);
  
  if (popup) {
    return popup.object.getSelectedIndex();
  }
  return null;
}


function getPopup(id) {
  var popup = $(id);
  
  if (popup) {
    return popup.object;
  }
}


function popupSetSelected(id, index) {
  var popup = $(id);
  
  if (popup) {
    popup.object.setSelectedIndex(index);
  }
}


function myParseInt(string) {
  // remove leading 0's
  var count = 0;
  while(string.substr(count,1) == "0") {
    count++;
  }
  
  string = string.substring(count, string.length);
  
  // than call parse int
  return parseInt(string);
}