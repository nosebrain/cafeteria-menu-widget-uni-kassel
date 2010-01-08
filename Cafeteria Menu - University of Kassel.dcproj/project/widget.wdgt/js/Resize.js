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
    var x = window.innerWidth; // allow only height
    var y = event.y + growboxInset.y;
    
    // FIXME: how to implement a min value of height
    if (y < 285) {
      y = 285;
    }
    
    window.resizeTo(x, y);
    
    var newHeight = 154 + (y - 285);
    
    $(ELEMENT_ID_MENU_SCROLL_AREA).style.height = newHeight + "px";
    refreshScrollArea(ELEMENT_ID_MENU_SCROLL_AREA);
 
    event.stopPropagation();
    event.preventDefault();
}
 
 
function mouseUp(event) {
    document.removeEventListener("mousemove", mouseMove, true);
    document.removeEventListener("mouseup", mouseUp, true);
 
    event.stopPropagation();
    event.preventDefault();
}