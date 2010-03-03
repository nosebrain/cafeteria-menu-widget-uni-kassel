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


ElementUtils.getObject = function(id) {
  var element = ElementUtils.get(id);
  
  if (element) {
    return element.object;
  }
  
  return null;
}


ElementUtils.getPopUp = function(id) {
  return ElementUtils.getObject(id);
}


ElementUtils.getScrollArea = function(id) {
  return ElementUtils.getObject(id);
}


ElementUtils.get = function(id) {
  return document.getElementById(id);
}