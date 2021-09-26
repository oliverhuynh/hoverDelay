(function ($) {
  $.fn.hoverDelay = function (options) {
    var defaultOptions = {
      delayIn: 300,
      delayOut: 300,
      handlerIn: function (options) {},
      handlerOut: function (options) {},
      mergeHandlerIn: function (options) {
        options.defaultHandlerIn.call(this, options);
        options.handlerIn.call(this, options);
      },
      mergeHandlerOut: function (options) {
        options.defaultHandlerOut.call(this, options);
        options.handlerOut.call(this, options);
      },
      defaultHandlerIn: function (options) {
        $(this).addClass("hover");
      },
      defaultHandlerOut: function (options) {
        $(this).removeClass("hover");
      },
    };
    options = $.extend(defaultOptions, options);
    return this.each(function () {
      var timeoutIn, timeoutOut;
      var $element = $(this);
      $element.hover(
        function () {
          if (timeoutOut) {
            clearTimeout(timeoutOut);
          }
          timeoutIn = setTimeout(function () {
            options.mergeHandlerIn.call($element, options);
          }, options.delayIn);
        },
        function () {
          if (timeoutIn) {
            clearTimeout(timeoutIn);
          }
          timeoutOut = setTimeout(function () {
            options.mergeHandlerOut.call($element, options);
          }, options.delayOut);
        }
      );
    });
  };
})(jQuery);
