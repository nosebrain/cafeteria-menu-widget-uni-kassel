var growboxInset;
 
function mouseDown(event) {
    // add event listener for move and up
  document.addEventListener("mousemove", mouseMove, true);
  document.addEventListener("mouseup", mouseUp, true);
 
  growboxInset = {x:(window.innerWidth - event.x), y:(window.innerHeight - event.y)};
  oldHeight = window.innerHeight;
 
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
  var scrollArea = getScrollArea(ELEMENT_ID_MENU_SCROLL_AREA); // TODO: scroll area
  var scrollAreaWidth = scrollArea.viewWidth + divWidth;
  var scrollAreaHeight = scrollArea.viewHeight + divHeight;
    
  window.resizeTo(x, y);

  resizeScrollArea(ELEMENT_ID_MENU_SCROLL_AREA, scrollAreaWidth, scrollAreaHeight); // TODO: method resizeScrollArea
 
  event.stopPropagation();
  event.preventDefault();
}
 
function mouseUp(event) {
    document.removeEventListener("mousemove", mouseMove, true);
    document.removeEventListener("mouseup", mouseUp, true);
 
    event.stopPropagation();
    event.preventDefault();
}