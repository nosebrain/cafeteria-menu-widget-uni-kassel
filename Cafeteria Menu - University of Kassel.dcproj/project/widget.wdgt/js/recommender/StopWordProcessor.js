/**
 * Cafeteria Widget - University of Kassel
 *
 *
 * Copyright 2009 - 2011, Daniel Zoller
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
 
var STOP_WORD_LIST_PATH = 'js/recommender/stopwords.txt';

function StopWordProcessor() {
  // load the stemming list
  this.loadStopWordList();
}

StopWordProcessor.prototype.loadStopWordList = function() {
  var self = this;
  $.ajax({
    url: STOP_WORD_LIST_PATH,
    success: function(data) {
      self.proceedData(data);
    },
    async: false // isStopWord must be called after the content of the file was loaded
  });
}

StopWordProcessor.prototype.isStopWord = function(word) {
  return word == null || word in this.words;
}

StopWordProcessor.prototype.process = function(word) {
  if (word == null || this.isStopWord(word)) {
    return null;
  }
  
  return word;
}

StopWordProcessor.prototype.proceedData = function(data) {
  var dwords = data.split('\n');
  
  this.words = new Array();
  for (var i = 0; i < dwords.length; i++) {
    this.words[dwords[i]] = true;
  }
  
}