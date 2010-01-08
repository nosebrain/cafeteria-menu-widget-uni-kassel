function CafeteriaParserListener() {
  
}


CafeteriaParserListener.prototype.startedParsing = function(response) {
  this.setCurrentState(STATE_PARSING);
}


CafeteriaParserListener.prototype.finishedParsing = function(result) {
  // change state
  this.setCurrentState(STATE_OK);
  
  // update week
  replaceInnerHTML(ELEMENT_ID_WEEK, result.getMenu().getWeek());
}


CafeteriaParserListener.prototype.parsingFailed = function(result) {
  // change state
  alert("exception while " + this.currentState + ": " + result);
  this.setCurrentState(STATE_FAILED);
}


CafeteriaParserListener.prototype.setCurrentState = function(state) {
  this.currentState = state;
  
  // display state
  setStatus(state); // TODO
}

CafeteriaParserListener.prototype.startedDownload = function() {
  this.setCurrentState(STATE_LOADING);
}