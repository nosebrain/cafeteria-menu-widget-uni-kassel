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