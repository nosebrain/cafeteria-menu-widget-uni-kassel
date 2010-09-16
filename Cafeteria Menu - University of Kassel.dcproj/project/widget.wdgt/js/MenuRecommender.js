
// TODO: rename to FoodRecommender
function MenuRecommender() {
  this.preprocessors = new Array();
  
  this.preprocessors.push(new SpecialPhraseProcessor());
  this.preprocessors.push(new StopWordProcessor()); // removes stop words like "auf", "an"
}

MenuRecommender.prototype.recommendFood = function(foods) {
  // loop through all menus
  var minAngle = 100;
  var angles = new Array();
  for (var i = 0; i < foods.length; i++) {
    var food = $.trim(foods[i].getDescription());
    
    var terms = this.getTerms(food);
    
    // get angle
    var angle = Math.acos(this.getCosSimCalcLength(terms, this.getUserLikeDislikes()));
    angles.push(angle);
  }
  
  var minValue = 100;
  for (var i = 0; i < angles.length; i++) {
    if (angles[i] < minValue) {
      minValue = angles[i];
    }
  }
  
  var indeces = new Array();
  for (var i = 0; i < angles.length; i++) {
    if (angles[i] == minValue) {
      indeces.push(i);
    }
  }
  
  // only recommend if there are not all foods recommended
  if (indeces.length < (foods.length - 1)) {
    for (var i = 0; i < foods.length; i++) {
      foods[i].setRecommended($.inArray(i, indeces) >= 0);
    }
  }
}

MenuRecommender.prototype.getTerms = function(text) {
  var allTerms = text.split(" ");
  var terms = {};
  
  for (var i = 0; i < allTerms.length; i++) {
    var currentTerm = allTerms[i];
    
    for (var j = 0; j < this.preprocessors.length; j++) {
      currentTerm = this.preprocessors[j].process(currentTerm);
    }
    
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
  // TODO: 
  var dummy = {};
  
  dummy['Reispfanne'] = 4;
  dummy['Bauernfrühstück'] = 2;
  dummy['Spinat'] = -5;
  dummy['Steak'] = 5;
  dummy['Sahne'] = 2;
  dummy['Fischfilet'] = 4;
  dummy['Bratwurst'] = 90;
  
  return dummy;
}

MenuRecommender.prototype.getCosSimCalcLength = function(doc1, doc2) {
	var lengthDoc1 = 0;
	for (var word in doc1) {
		var wordCount = doc1[word];
		lengthDoc1 += wordCount * wordCount;
	}
	
	var lengthDoc2 = 0;
	for (var word in doc2) {
		var wordCount = doc2[word];
		lengthDoc2 += wordCount * wordCount;
	}
	// alert(lengthDoc1 + " " + lengthDoc2);
	return this.getCosSim(doc1, doc2, lengthDoc1, lengthDoc2);
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
  // TODO
}

MenuRecommender.prototype.likeFood = function(food) {
  // TODO
}