var growboxInset;
 
function mouseDown(event) {
    // add event listener for move and up
  document.addEventListener("mousemove", mouseMove, true);
  document.addEventListener("mouseup", mouseUp, true);
 
  growboxInset = {x:(window.innerWidth - event.x), y:(window.innerHeight - event.y)};
 
  event.stopPropagation();
  event.preventDefault();
}
 
function mouseMove(event) {
  var x = event.x + growboxInset.x;
  var y = event.y + growboxInset.y;

  // min width and height
  x = Math.max(x, WIDGET.getReader().get("Width"));
  y = Math.max(y, WIDGET.getReader().get("Height"));
    
  // calcs for scroll area
  var divWidth = x - window.innerWidth;
  var divHeight = y - window.innerHeight;
  
  var scrollArea = getScrollArea(ELEMENT_ID_MENU_SCROLL_AREA);
  var scrollAreaWidth = scrollArea.viewWidth + divWidth + 18; // 18 = scrollbar width FIXME: how to get the value
  var scrollAreaHeight = scrollArea.viewHeight + divHeight;
  
  resizeScrollArea(ELEMENT_ID_MENU_SCROLL_AREA, scrollAreaWidth, scrollAreaHeight);
  
  window.resizeBy(divWidth, divHeight);
 
  event.stopPropagation();
  event.preventDefault();
}
 
function mouseUp(event) {
  document.removeEventListener("mousemove", mouseMove, true);
  document.removeEventListener("mouseup", mouseUp, true);
  
  PREF.savePref(PREF_WIDTH, window.innerWidth);
  PREF.savePref(PREF_HEIGHT, window.innerHeight);
 
  event.stopPropagation();
  event.preventDefault();
}