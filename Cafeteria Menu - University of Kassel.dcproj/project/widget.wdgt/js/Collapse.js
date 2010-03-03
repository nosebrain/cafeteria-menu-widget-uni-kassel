function toogle(event) {
  if (ElementUtils.get("front").className == "expanded") {
    WidgetUtils.collapse();
  } else {
    WidgetUtils.expand();
  }
}