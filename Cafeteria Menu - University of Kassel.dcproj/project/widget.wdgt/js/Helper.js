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

// FIXME a better implementation of HTMLCode replacment
function HTMLCodeReplacer(htmlCode, replace) {
  this.htmlCode = htmlCode;
  this.replace = replace;
}

var HTMLCodes = new Array(
  new HTMLCodeReplacer(/<font face="Arial" size="1">/g, ""),
  new HTMLCodeReplacer(/<\/font>/g, ""),
  new HTMLCodeReplacer(/<\/td>/g, ""),
  new HTMLCodeReplacer(/&nbsp;/g, " "),
  new HTMLCodeReplacer(/<br \/>/g, " "),
  new HTMLCodeReplacer(/<\/span>/g, " "),
  new HTMLCodeReplacer(/<span class="detail">/g, ""),
  new HTMLCodeReplacer(/  /, " ")
);

function removeHTMLCode(source) {
  for (i = 0; i < HTMLCodes.length; i++) {
    var htmlCodeReplacer = HTMLCodes[i];
    source = source.replace(htmlCodeReplacer.htmlCode, htmlCodeReplacer.replace);
  }
  
  return source;
}

function myParseInt(string) {
  // remove leading 0's
  var count = 0;
  while(string.substr(count,1) == "0") {
    count++;
  }
  
  string = string.substring(count, string.length);
  
  // than call parse int
  return parseInt(string);
}