function StopWordProcessor() {
  // load the stemming list
  this.loadStopWordList();
}

StopWordProcessor.prototype.loadStopWordList = function() {
  var self = this;
  $.ajax({
    url: 'js/recommender/stopwords.txt',
    success: function(data) {
      self.proceedData(data);
    },
    async: false // isStopWord must be called after the content of the file was loaded
  });
}

StopWordProcessor.prototype.isStopWord = function(word) {
  return word == null || word in this.words;
}

StopWordProcessor.prototype.processWord = function(word) {
  if (word == null || this.isStopWord) {
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