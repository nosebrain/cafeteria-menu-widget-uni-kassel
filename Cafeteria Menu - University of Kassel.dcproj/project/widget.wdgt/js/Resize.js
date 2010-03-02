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
  x = Math.max(x, 0); //WIDGET.getReader().get("Width"));
  y = Math.max(y, 0); //WIDGET.getReader().get("Height"));
    
  // resize it
  WIDGET.resize(x, y);
 
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