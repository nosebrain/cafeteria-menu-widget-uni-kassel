function SpecialPhraseProcessor() {
  
}

SpecialPhraseProcessor.prototype.process = function(word) {
  if (word == null || (word.indexOf("(") >= 0)) {
    return null;
  }
  return word;
}