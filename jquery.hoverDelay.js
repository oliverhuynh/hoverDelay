(function ($) {
$.fn.hoverDelay = function(options) {
	var defaultOptions = {
		delayIn: 300,
		delayOut: 300,
		handlerIn: function(options){},
		handlerOut: function(options){},
		mergeHandlerIn: function(options){
	          options.defaultHandlerIn.apply(this, options);
	          options.handlerIn.apply(this, options);
		},
		mergeHandlerOut: function(options){
		  options.defaultHandlerOut.apply(this, options);
	          options.handlerOut.apply(this, options);
		},
		defaultHandlerIn: function(options){$(this).addClass('hover');},
		defaultHandlerOut: function(options){$(this).removeClass('hover');}
	};
	options = $.extend(defaultOptions, options);
	return this.each(function() {
		var timeoutIn, timeoutOut;
		var $element = $(this);
			$element.hover(
				function() {
			    if (timeoutOut){
		        clearTimeout(timeoutOut);
			    }
			    timeoutIn = setTimeout(function(){options.mergeHandlerIn.apply($element, options);}, options.delayIn);
				},
				function() {
			    if (timeoutIn){
		        clearTimeout(timeoutIn);
			    }
			    timeoutOut = setTimeout(function(){options.mergeHandlerOut.apply($element, options);}, options.delayOut);
				}
			);
    });
};
})(jQuery);
