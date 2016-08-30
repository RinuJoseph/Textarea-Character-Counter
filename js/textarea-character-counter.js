(function($){
	jQuery.fn.extend({
		counter: function(options) {
			var elem = $(this);
	        var plugin = this;
			var regex = /\s+/gi;
	        var defaults = {
               min   : 5,
               max   : 20,
			   setmaxLimit:true,
			   countSpace:false,
			   badgeClass:"errorClass",
			   showText:true,
            }
	        var options = $.extend(defaults, options);
			
			plugin.init = function() {
              if(options.showText){
				  elem.after("<div class='counter-text'>"+options.max+" Characters Remaining</div>")
			  }
            }
            plugin.init();
	        elem.keyup(function(e) {
				var _elemVal;
				if(!options.countSpace) {
                 var _temp =  elem.val();				 
				 _elemVal  = _temp.replace(regex, '');
				}
				else {
				   _elemVal = elem.val();
				}
		        if ( _elemVal.length > options.max && options.setmaxLimit == true) {
					if(!options.countSpace) {
						var _spaceCount = parseInt(elem.val().length - _elemVal.length);
						this.value = this.value.substring(0, options.max+_spaceCount)
					}
					else {
						this.value = this.value.substring(0, options.max);
					}
                }
				else if ( _elemVal.length > options.max && options.setmaxLimit == false) {
                   elem.addClass(options.badgeClass)
				   if(options.showText) {
				      $(".counter-text").addClass("error")
				      $(".counter-text").html("Maximum Limit Exceeded")
			       } 
                }
				else {
				   elem.removeClass(options.badgeClass);
				   var _remainingChars = parseInt(options.max - _elemVal.length);
				   if(options.showText) {
				      $(".counter-text").removeClass("error")
				      $(".counter-text").html(_remainingChars+" Characters Remaining")
			       } 
				}
	        });
			elem.blur(function(e){
				var _exceedFlag  = false;
				if(options.countSpace) {
					if(elem.val().length < options.min) {
					  elem.addClass(options.badgeClass);
					  _exceedFlag = true
					}
				}
				else {
					if(elem.val().replace(regex, '').length < options.min) {
					   elem.addClass(options.badgeClass);
					   _exceedFlag = true
					}
				}
				if(options.showText &&  _exceedFlag){
					$(".counter-text").addClass("error")
				    $(".counter-text").html("Minimum "+options.min+" Characters Required")
			    }
			})
		}

	});
})(jQuery); 

