function CafeteriaParserListener(parser) {
  this.parser = parser;
}

CafeteriaParserListener.prototype.startedDownload = function() {
  this.setCurrentState(STATE_LOADING);
}


CafeteriaParserListener.prototype.startedParsing = function(response) {
  this.setCurrentState(STATE_PARSING);
}


CafeteriaParserListener.prototype.gotInformation = function(result) {
  PREF.savePref(PREF_INFO, result, true);
  replaceScrollAreaContent(ELEMENT_ID_INFO_SCROLL_AREA, result);
}


CafeteriaParserListener.prototype.gotWeek = function(start, end) {
  var dateStr = end.split(/\./); 
  var dateStart = start.split(/\./); // TODO: first day of the week
  
  var year = dateStr[2];
  var month = dateStr[1] - 1;
  var day = myParseInt(dateStr[0]) + 2;  // 2 <=> friday => sunday
  
  var date = new Date(year, month, day, 14, 0, 0);
  
  var now = new Date();
  
  if (now >= date) {
    date.setHours(now.getHours());
  }
  
  var nextUpdate = this.parser.getCafeteria().getNextUpdate();	
  
  if (nextUpdate) {
    // TODO: add 60 minutes
  }
  
  // save it
  this.parser.getCafeteria().setNextUpdate(date);
  
  // update week
  replaceInnerHTML(ELEMENT_ID_WEEK, start + "-" + end);
}


CafeteriaParserListener.prototype.finishedParsing = function(result) {
  // change state
  this.setCurrentState(STATE_OK);
}


CafeteriaParserListener.prototype.parsingFailed = function(error) {
  // change state
  alert("exception while " + this.currentState + ": " + error);
  this.setCurrentState(STATE_FAILED);
}


CafeteriaParserListener.prototype.setCurrentState = function(state) {
  this.currentState = state;
  
  // display state
  replaceInnerHTML(ELEMENT_ID_STATUS_LABEL, dashcode.getLocalizedString(state));
}