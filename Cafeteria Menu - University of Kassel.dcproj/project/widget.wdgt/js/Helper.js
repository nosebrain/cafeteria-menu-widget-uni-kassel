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


/** 
 * scrollArea
 */
function replaceScrollAreaContent(id, newContent) {
  var scrollArea = ElementUtils.get(id);
  
  if (scrollArea == null) {
    // no scrollArea => nothing to do
    return;
  }
  
  var content = scrollArea.object.content;
  content.innerHTML = newContent;
  
  refreshScrollArea(id);
}


function refreshScrollArea(id) {
  var scrollArea = ElementUtils.get(id);
  
  if (scrollArea) {
    scrollArea.object.refresh();
  }
}


function getScrollArea(id) {
  var scrollArea = ElementUtils.get(id);
  
  if (!scrollArea) {
    return null;
  }
  
  return scrollArea.object;
}


function resizeScrollArea(id, width, height) {
  var scrollArea = ElementUtils.get(id);
  
  if (scrollArea) {
    scrollArea.style.height = height + "px";
    scrollArea.style.width = width + "px";
    
    refreshScrollArea(id);
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

var ElementUtils = {};

ElementUtils.hide = function(id) {
  var element = ElementUtils.get(id);
  
  if (element) {
    element.style.display = "none";
  }
}


ElementUtils.show = function(id) {
  var element = ElementUtils.get(id);
  
  if (element) {
    element.style.display = "block";
  }
}


ElementUtils.setOpacity = function(id, value) {
  var element = ElementUtils.get(id);
  
  if (element) {
    element.style.opacity = value;
  }
}


ElementUtils.replaceInnerHTML = function(id, newContent) {
  var element = ElementUtils.get(id);
  
  if (element) {
    element.innerHTML = newContent;
  }
}


ElementUtils.resizeTo = function(id, width, height) {
  var element = ElementUtils.get(id);
  
  if (element) {
    element.style.width = width + "px";
    element.style.height = height + "px";
  }
}


ElementUtils.getPopUp = function(id) {
  var element = ElementUtils.get(id);
  
  if (element) {
    return element.object;
  }
  
  return null;
}


ElementUtils.get = function(id) {
  return document.getElementById(id);
}

var WidgetUtils = {};

WidgetUtils.resizeTo = function(w, h) {
  // calcs for scroll area
  var divWidth = w - window.innerWidth;
  var divHeight = h - window.innerHeight;

  var scrollArea = getScrollArea(ELEMENT_ID_MENU_SCROLL_AREA);
  var scrollAreaWidth = scrollArea.viewWidth + divWidth + 18; // 18 = scrollbar width FIXME: how to get the value
  var scrollAreaHeight = scrollArea.viewHeight + divHeight;
  
  resizeScrollArea(ELEMENT_ID_MENU_SCROLL_AREA, scrollAreaWidth, scrollAreaHeight);

  ElementUtils.resizeTo("front", w, h);
	if (window.widget) {
		window.resizeTo(w, h);
	}
}

WidgetUtils.resizeWithAnimationTo = function(w, h, callback) {
	var animator = new AppleAnimator(500, 10);
	
	var smallRect = new AppleRect(0, 0, window.innerWidth, window.innerHeight);
	var largeRect = new AppleRect(0, 0, w, h);

	var animation = new AppleRectAnimation(smallRect, largeRect, resizeAnimationHandler);
		
	animator.addAnimation(animation);
	animator.oncomplete = function(){ if (callback) { callback(); } };
	animator.start();
}


function resizeAnimationHandler(animator, currRect, startRect, finRect) {
	WidgetUtils.resizeTo(currRect.right, currRect.bottom);
}