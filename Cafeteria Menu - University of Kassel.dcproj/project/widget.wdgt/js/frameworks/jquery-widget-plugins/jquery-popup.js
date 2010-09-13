/* 
 * 
 * 
 */
(function($){
  $.fn.popup = function() {
    var test = $(this).get(0);
    if (test) {
      return test.object;
    }
    
    return this;
  };
  
  $.fn.scrollArea = function() {
    var test = $(this).get(0);
    if (test) {
      return test.object;
    }
    
    return this;
  }

})(jQuery);