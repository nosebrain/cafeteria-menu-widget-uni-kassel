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
  x = Math.max(x, WIDGET.getReader().get("Min-Width"));
  y = Math.max(y, WIDGET.getReader().get("Min-Height"));
    
  // resize it
  WIDGET.resize(x, y);
  
  event.stopPropagation();
  event.preventDefault();
}
 
function mouseUp(event) {
  document.removeEventListener("mousemove", mouseMove, true);
  document.removeEventListener("mouseup", mouseUp, true);
  
  // save dimensions it
  PREF.savePref(PREF_WIDTH, window.innerWidth);
  PREF.savePref(PREF_HEIGHT, window.innerHeight);
 
  event.stopPropagation();
  event.preventDefault();
}