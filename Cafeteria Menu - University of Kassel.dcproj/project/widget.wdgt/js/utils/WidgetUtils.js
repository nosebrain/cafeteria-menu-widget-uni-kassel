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

	var animation = new AppleRectAnimation(smallRect, largeRect, resizeAnimationHandler);
		
	animator.addAnimation(animation);
	animator.oncomplete = function(){ if (callback) { callback(); } };
	animator.start();
}


function resizeAnimationHandler(animator, currRect, startRect, finRect) {
	WIDGET.resize(currRect.right, currRect.bottom);
}