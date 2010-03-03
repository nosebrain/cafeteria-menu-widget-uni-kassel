var WidgetUtils = {};

WidgetUtils.resizeTo = function(w, h) {
  ElementUtils.resizeTo("front", w, h);
	if (window.widget) {
		window.resizeTo(w, h);
	}
}

WidgetUtils.resizeWithAnimationTo = function(w, h, callback) {
	var animator = new AppleAnimator(500, 10);
	
	var smallRect = new AppleRect(0, 0, window.innerWidth, window.innerHeight);
	var largeRect = new AppleRect(0, 0, w, h);

	var animation = new AppleRectAnimation(smallRect, largeRect, WidgetUtils.resizeAnimationHandler);
		
	animator.addAnimation(animation);
	animator.oncomplete = function(){ if (callback) { callback(); } };
	animator.start();
}

WidgetUtils.resizeAnimationHandler = function(animator, currRect, startRect, finRect) {
	WIDGET.resize(currRect.right, currRect.bottom);
}


WidgetUtils.collapse = function () {
  WidgetUtils.collapse_resize(80, 80, 1, WidgetUtils.collapse_resizeFinished);
}

WidgetUtils.expand = function () {
  WidgetUtils.collapse_resize(PREF.getPref(PREF_WIDTH), PREF.getPref(PREF_HEIGHT), 0, WidgetUtils.collapse_resizeFinished);
}


WidgetUtils.collapse_resize = function(w, h, collapse ,callback) {
	var animator = new AppleAnimator(500, 10);
	
	var smallRect = new AppleRect(0, collapse + 1, window.innerWidth, window.innerHeight);
	var largeRect = new AppleRect(0, !collapse, w, h);

	var animation = new AppleRectAnimation(smallRect, largeRect, WidgetUtils.collapse_resizeAnimationHandler);
		
	animator.addAnimation(animation);
	animator.oncomplete = function(){ if (callback) { callback(collapse); } };
	animator.start();
}


WidgetUtils.collapse_resizeFinished = function(collapsed) {
  var className = "collapsed";
  if (!collapsed) {
    className = "expanded";
  }
  
  ElementUtils.get("front").className = className;
  
  PREF.savePref(PREF_COLLAPSED, collapsed);
}


WidgetUtils.collapse_resizeAnimationHandler = function(animator, currRect, startRect, finRect) {
  var opacity = currRect.top;
  
  // hide all elements
  ElementUtils.setOpacity(ELEMENT_ID_MENU_SCROLL_AREA, opacity);
  ElementUtils.setOpacity(ELEMENT_ID_POPUP_WEEKCHOOSER, opacity);
  
  ElementUtils.setOpacity(ELEMENT_ID_MENU_SCROLL_AREA, opacity);
  ElementUtils.setOpacity(ELEMENT_ID_POPUP_WEEKCHOOSER, opacity);
  
  ElementUtils.setOpacity(ELEMENT_ID_CAFETERIA, opacity);
  ElementUtils.setOpacity(ELEMENT_ID_WEEK, opacity);
  ElementUtils.setOpacity(ELEMENT_ID_RESIZE, opacity);
  
  ElementUtils.setOpacity(ELEMENT_ID_INFO, opacity);
  ElementUtils.setOpacity(ELEMENT_ID_STATUS_LABEL, opacity);
  
	WidgetUtils.resizeTo(currRect.right, currRect.bottom);
}