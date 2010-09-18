function NormalizerProcessor() {

}

NormalizerProcessor.prototype.process = function(word) {
  return word == null ? null : word.toLowerCase();
}