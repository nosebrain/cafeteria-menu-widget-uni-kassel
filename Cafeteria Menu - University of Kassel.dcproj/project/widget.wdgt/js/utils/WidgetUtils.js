/**
 * Cafeteria Widget - University of Kassel
 *
 *
 * Copyright 2009 - 2010, Daniel Zoller
 *                        http://nosebrain.de
 *
 * This widget is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This widget is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this widget; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA 
 *
 *
 * @author Daniel Zoller<nosebrain@gmx.net>
 */

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