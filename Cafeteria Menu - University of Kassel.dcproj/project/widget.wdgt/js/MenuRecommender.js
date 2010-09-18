
// TODO: rename to FoodRecommender
function MenuRecommender() {
  this.preprocessors = new Array();
  
  this.preprocessors.push(new SpecialPhraseProcessor()); // removes '(s)' or '(f, sa)'
  this.preprocessors.push(new StopWordProcessor()); // removes stop words like "auf", "an"
  this.preprocessors.push(new NormalizerProcessor()); // 
}

MenuRecommender.prototype.recommendFood = function(foods) {
  // loop through all foods
  var minAngle = 100;
  var angles = new Array();
  for (var i = 0; i < foods.length; i++) {
    var food = $.trim(foods[i].getDescription());
    
    var terms = this.getTerms(food);
    
    // get angle
    var angle = Math.acos(this.getCosSim(terms, this.getUserLikeDislikes(), this.getTermLength(terms), this.getUserLikeDislikesLength()));
    angles.push(angle);
  }
  
  // get the minValue
  var minValue = 100;
  for (var i = 0; i < angles.length; i++) {
    if (angles[i] < minValue) {
      minValue = angles[i];
    }
  }
  
  // 2. get all indices with minValue
  var indices = new Array();
  for (var i = 0; i < angles.length; i++) {
    alert(i + ' = ' + angles[i]);
    if (angles[i] == minValue) {
      indices.push(i);
    }
  }
  
  // only recommend if there are not all foods with the same angle
  if (indices.length < (foods.length - 1)) {
    for (var i = 0; i < foods.length; i++) {
      foods[i].setRecommended($.inArray(i, indices) >= 0);
    }
  } else {
    alert('nothing to recommend ' + indices.length);
  }
}

MenuRecommender.prototype.getNormTerms = function(term) {
  for (var j = 0; j < this.preprocessors.length; j++) {
     term = this.preprocessors[j].process(term);
  }
  
  return term;
}

MenuRecommender.prototype.getTerms = function(text) {
  var allTerms = text.split(' ');
  var terms = {};
  
  for (var i = 0; i < allTerms.length; i++) {
    var currentTerm = this.getNormTerms(allTerms[i]);
    
    if (currentTerm) {
      if (currentTerm in terms) {
        terms[currentTerm] = terms[currentTerm] + 1;
      } else {
        terms[currentTerm] = 1;
      }
    }
  }
  
  return terms;
}

MenuRecommender.prototype.getUserLikeDislikes = function() {
  return PREF.getDicPref('likeDislike', true);
}

MenuRecommender.prototype.getUserLikeDislikesLength = function() {
  return PREF.getPref('likeDislikeLength', true);
}

MenuRecommender.prototype.setUserLikeDislikes = function(dict) {
  PREF.saveDicPref('likeDislike', dict, true);
}

MenuRecommender.prototype.setUserLikeDislikesLength = function(length) {
  PREF.savePref('likeDislikeLength', true);
}

MenuRecommender.prototype.getTermLength = function(terms) {
  var length = 0;
  
  for (var term in terms) {
    var termCount = terms[term];
    length += termCount * termCount;
  }
  
  return length;
}

MenuRecommender.prototype.getCosSim = function(doc1, doc2, quadLengthDoc1, quadLengthDoc2) {
	if (doc1 == null || doc2 == null) {
		return 1; 
	}
	
	var itDoc = doc1;
	var otherDoc = doc2;
	
	if (itDoc.length > doc2.length) {
		itDoc = doc2;
		otherDoc = doc1;
	}
	
	var scalarproduct = 0;
	
	for (var word in itDoc) {
    var wordCountInItDoc = itDoc[word];
		var wordCountInOtherDoc = otherDoc[word];
		if (wordCountInOtherDoc) {
			scalarproduct += wordCountInItDoc *  wordCountInOtherDoc;
		}
	}
	
	return scalarproduct / Math.sqrt(quadLengthDoc1 * quadLengthDoc2);
}

MenuRecommender.prototype.dislikeFood = function(food) {
  if (!food) {
    alert('WARNING: food null');
    return;
  }
  
  this.updateLikeDislike(food, -1);
}

MenuRecommender.prototype.updateLikeDislike = function(food, updateValue) {
  var string = $.trim(food.getDescription());
  var newTerms = this.getTerms(string);
  
  var currentTerms = this.getUserLikeDislikes();
  var currentTermsLength = this.getUserLikeDislikesLength();
  
  for (var newTerm in newTerms) {
    var oldValue = 0;
    if (newTerm in currentTerms) {
      oldValue = parseInt(currentTerms[newTerm]);
    }
    
    var newValue = oldValue + updateValue;
    currentTerms[newTerm] = newValue;
    
    currentTermsLength = currentTermsLength + 2 * updateValue * oldValue + updateValue * updateValue;
  }
  
  // save values
  this.setUserLikeDislikes(currentTerms);
  this.setUserLikeDislikesLength(currentTermsLength);
}

MenuRecommender.prototype.likeFood = function(food) {
  if (!food) {
    alert('WARNING: food null');
    return;
  }
  
  this.updateLikeDislike(food, 1);
}