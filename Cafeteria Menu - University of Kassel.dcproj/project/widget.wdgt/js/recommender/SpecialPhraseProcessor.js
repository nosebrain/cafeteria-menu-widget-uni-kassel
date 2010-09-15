function SpecialPhraseProcessor() {
  
}

SpecialPhraseProcessor.prototype.preprocess = function(word) {
  if (word == null || (word.indexOf("(") > 0)) {
    return null;
  }
  return word;
}