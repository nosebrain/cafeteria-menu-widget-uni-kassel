function SpecialPhraseProcessor() {
  
}

SpecialPhraseProcessor.prototype.process = function(word) {
  word = word.replace(/"/g, '');
  
  if (word == null || (word.indexOf("(") >= 0)) {
    return null;
  }
  return word;
}