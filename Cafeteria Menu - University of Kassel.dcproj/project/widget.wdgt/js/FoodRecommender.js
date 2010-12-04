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

function FoodRecommender() {
  this.preprocessors = new Array();
  
  this.preprocessors.push(new SpecialPhraseProcessor()); // removes '(s)' or '(f, sa)'
  this.preprocessors.push(new NormalizerProcessor()); // normalize the words (lower case)
  this.preprocessors.push(new StopWordProcessor()); // removes stop words like "auf", "an"
  this.preprocessors.push(new PorterStemmerProcessor()); // guess ;)
}

FoodRecommender.prototype.recommendFood = function(sfoods) {
  var foods = sfoods;
  var self = this;
  $.ajax({
    url: STOP_WORD_LIST_PATH,
    success: function(data) {
      self.recommendFoodInternal(foods);
    }
  });
}

FoodRecommender.prototype.recommendFoodInternal = function(foods) {
  // clear old recommendations
  for (var i = 0; i < foods.length; i++) {
    foods[i].setRecommended(false);
  }

  // loop through all foods
 
  var angles = new Array();
  for (var i = 0; i < foods.length; i++) {
    var food = $.trim(foods[i].getDescription());
    var terms = this.getTerms(food);
    
    // get angle
    var cos = this.getCosSim(terms, this.getUserLikeDislikes(), this.getTermLength(terms), this.getUserLikeDislikesLength());
    var angle = Math.acos(cos);
    angles.push(angle);
  }
  
  // get the minValue
  var minAngle = Math.PI / 2; // <=> acos(0) 0 <=> no term exists in both docs
  for (var i = 0; i < angles.length; i++) {
    if (angles[i] < minAngle) {
      minAngle = angles[i];
    }
  }
  
  // 2. get all indices with minValue
  var indices = new Array();
  for (var i = 0; i < angles.length; i++) {
    alert(i + ' = ' + getDeg(angles[i]) + '°');
    if (angles[i] == minAngle) {
      indices.push(i);
    }
  }
  
  // only recommend if there are not all foods with the same angle
  if (indices.length / foods.length <= 0.5) {
    for (var i = 0; i < foods.length; i++) {
      foods[i].setRecommended($.inArray(i, indices) >= 0);
    }
  } else {
    alert('nothing to recommend ' + indices.length);
  }
  
  this.controller.recommendedFood(foods);
}

FoodRecommender.prototype.getNormTerms = function(term) {
  for (var j = 0; j < this.preprocessors.length; j++) {
     term = this.preprocessors[j].process(term);
  }
  
  return term;
}

FoodRecommender.prototype.getTerms = function(text) {
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

FoodRecommender.prototype.getUserLikeDislikes = function() {
  if (!this.likeDislike) {
    this.likeDislike = PREF.getDicPref(PREF_LIKE_DISLIKE, true);
  }
  return this.likeDislike;
}

FoodRecommender.prototype.getUserLikeDislikesLength = function() {
  var length = PREF.getPref(PREF_LIKE_DISLIKE_LENGTH, true);
  return !length ? 0 : length;
}

FoodRecommender.prototype.setUserLikeDislikes = function(dict) {
  this.likeDislike = dict;
  PREF.saveDicPref(PREF_LIKE_DISLIKE, dict, true);
}

FoodRecommender.prototype.setUserLikeDislikesLength = function(length) {
  PREF.savePref(PREF_LIKE_DISLIKE_LENGTH, length, true);
}

FoodRecommender.prototype.getTermLength = function(terms) {
  var length = 0;
  
  for (var term in terms) {
    var termCount = terms[term];
    length += termCount * termCount;
  }
  
  return length;
}

FoodRecommender.prototype.getCosSim = function(doc1, doc2, quadLengthDoc1, quadLengthDoc2) {
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

FoodRecommender.prototype.dislikeFood = function(food) {
  if (!food) {
    alert('WARNING: food null');
    return;
  }
  
  this.updateLikeDislike(food, -1);
}

FoodRecommender.prototype.updateLikeDislike = function(food, updateValue) {
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

FoodRecommender.prototype.setViewController = function(controller) {
  this.controller = controller;
}

FoodRecommender.prototype.likeFood = function(food) {
  if (!food) {
    alert('WARNING: food null');
    return;
  }
  
  this.updateLikeDislike(food, 1);
}