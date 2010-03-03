AppleScrollArea.prototype.setContent = function(newContent) {
  this.content.innerHTML = newContent;
  
  this.refresh();
}
  
AppleScrollArea.prototype.resize = function(width, height) {
  var parent = this.content.parentNode;

  parent.style.height = parseInt(height) + "px";;
  parent.style.width = parseInt(width) + "px";;
  
  this.refresh();
}