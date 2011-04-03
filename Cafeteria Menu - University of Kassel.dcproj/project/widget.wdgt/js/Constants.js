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

var SEARCH_EXPRESSIONS = {
  table : /<table cellpadding="4" cellspacing="0" width="899">.*<\/html>/,
  food : /<td class="gelb" cellpadding="0" valign="middle" width="125px" bgcolor="#fadc00">/, 
  foodSplit : /<td class="weiss" valign="top" width="150px" height="[0-9]*">/,
  priceFoodSplit : /<\/tr><tr>/,
  priceSplit : /<td class="preis" valign="top" width="150px" height="10">/, 
  price : /[0-9],[0-9]{2}/g,
  week : /Speiseplan vom&nbsp;([0-9]{2}.[0-9]{2}). (.*|-|bis) ([0-9]{2}.[0-9]{2}.[0-9]{4})/,
  info : /<td class="gelbunten" colspan="7" valign="top" width="875px" bgcolor="#fadc00">(.*)<\/td>/,
  holiday : /<span class="important">/
};


// element ids
var ELEMENT_ID_MENU_SCROLL_AREA = "scrollArea";
var ELEMENT_ID_INFO_SCROLL_AREA = "information";
var ELEMENT_ID_POPUP_WEEKCHOOSER = "weekdayChooser";
var ELEMENT_ID_POPUP_CAFETERIACHOOSER = "cafeteriaChooser";
var ELEMENT_ID_POPUP_PRICECHOOSER = "priceChooser";
var ELEMENT_ID_CAFETERIA = "cafeteria-name";
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