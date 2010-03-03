var SEARCH_EXPRESSIONS = {
  table : /<table cellpadding="4" cellspacing="0" width="899">.*<\/table><img/,
  food : /<tr><td class="gelb" cellpadding="0" bgcolor="#fadc00" height="50" valign="middle" width="125px">/, 
  foodSplit : /<td class="weiss" height="50" valign="top" width="150px">/,
  priceFoodSplit : /<\/tr><tr>/,
  priceSplit : /<td class="preis" height="10" valign="top" width="150px">/, 
  price : /[0-9],[0-9]{2}/g,
  week : /Speiseplan vom&nbsp;([0-9]{2}.[0-9]{2}). (.*|-|bis) ([0-9]{2}.[0-9]{2}.[0-9]{4})/,
  info : /<td class="gelbunten" colspan="7" bgcolor="#fadc00" valign="top" width="875px"><font face="Arial" size="1">(.*)<\/font><\/td>/
};


// element ids
var ELEMENT_ID_MENU_SCROLL_AREA = "scrollArea";
var ELEMENT_ID_INFO_SCROLL_AREA = "information";
var ELEMENT_ID_POPUP_WEEKCHOOSER = "weekdayChooser";
var ELEMENT_ID_POPUP_CAFETERIACHOOSER = "cafeteriaChooser";
var ELEMENT_ID_POPUP_PRICECHOOSER = "priceChooser";
var ELEMENT_ID_CAFETERIA = "cafeteria-name";
var ELEMENT_ID_HOLIDAY = "holiday";
var ELEMENT_ID_WEEK = "week";
var ELEMENT_ID_STATUS_LABEL = "state";
var ELEMENT_ID_RESIZE = "resize";
var ELEMENT_ID_INFO = "info";

var UPDATE_DIV_ID = "updateImg"; // TODO: wSparkle

// states
var STATE_LOADING = "Loading data ...";
var STATE_PARSING = "Parsing data ...";
var STATE_OK = "";
var STATE_FAILED = "Error while parsing informations";

// error messages
var ERROR_MESSAGE_404 = "source url has changed!";