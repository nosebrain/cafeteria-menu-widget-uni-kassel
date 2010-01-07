// TODO: remove it
var DOWNLOAD_URL = "http://area51.nosebrain.de/mensa-widget/latest.zip";
  
// TODO: remove it
var INFO = "(1) mit Farbstoff<br>(2) mit Konservierungsstoff<br>(3) mit Antioxidationsmittel<br>(4) mit Geschmacksverstärker<br>(5) geschwefelt<br>(6) geschwärzt<br>(7) gewachst<br>(8) mit Phosphat<br>(9) mit Süßungsmitteln<br>(9a) mit einer Zuckerart und Süßungsmitteln<br>(10) mit einer Phenylalaninquelle<br>(f) fleischlos<br>(ö) ökologisch,DE-034-Öko-Kontrollstelle<br>(s) Schweinefleisch bzw. Schweinefl.Anteile<br>(r) Rindfleisch bzw. Rindfl.Anteile<br>(a) mit Alkohol<p>Ausschl. jodiertes Speisesalz wird verwendet.</p>";

var SEARCH_EXPRESSIONS = {
  table : /<table cellpadding="4" cellspacing="0" width="899">.*<\/table><img/,
  food : /<tr><td class="gelb" cellpadding="0" bgcolor="#fadc00" height="50" valign="middle" width="125px">/, 
  foodSplit : /<td class="weiss" height="50" valign="top" width="150px">/,
  priceMenuSplit : /<\/tr><tr>/,
  priceSplit : /<td class="preis" height="10" valign="top" width="150px">/, 
  price : /[0-9],[0-9]{2}/g,
  week : /Speiseplan vom&nbsp;([0-9]{2}.[0-9]{2}). (.*|-|bis) ([0-9]{2}.[0-9]{2}.[0-9]{4})/
};

// pref keys
var PREF_CAFETERIA = "mensa";
var PREF_MENSA = "mensa";
var PREF_UPDATE = "lastUpdated";
var PREF_PRICE = "priceType";

// all pref keys
var PREFS = new Array(PREF_CAFETERIA, PREF_UPDATE, PREF_PRICE);

// element ids
var ELEMENT_ID_MENU_SCROLL_AREA = "scrollArea";
var ELEMENT_ID_INFO_SCROLL_AREA = "information";
var ELEMENT_ID_POPUP_WEEKCHOOSER = "weekdayChooser";
var ELEMENT_ID_POPUP_CAFETERIACHOOSER = "mensaChooser"; // TODO: change id
var ELEMENT_ID_POPUP_PRICECHOOSER = "priceChooser";
var ELEMENT_ID_MENSA = "mensa";

// state messages
var STATUS_MESSAGE_LOADING = "Loading data ...";
var STATUS_MESSAGE_PARSING = "Parsing data ...";
var STATUS_MESSAGE_MENU_PARSING = "Parsing menus ...";
var STATUS_MESSAGE_PARSING_WEEK = "Parsing week ...";
var STATUS_MESSAGE_READY = "Ready!";

// error messages
var ERROR_MESSAGE_PARSING = "Error while parsing informations";
var ERROR_MESSAGE_404 = "source url has changed!";