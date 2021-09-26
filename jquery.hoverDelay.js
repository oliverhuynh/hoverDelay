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
      const out = function () {
        $(this).removeClass('hovering');
        timeoutOut = setTimeout(function () {
          // Now verify the event after it's really out
          if (!$(this).hasClass('hovering')) {
            options.mergeHandlerOut.call($element, options);
          }
        }.bind(this), options.delayOut);
      };
      $element.hover(
        function () {
          $(this).addClass('hovering');
          timeoutIn = setTimeout(function () {
            // Now verify the event after it's really in
            if ($(this).hasClass('hovering')) {
              out.bind($element.siblings())();
              options.mergeHandlerIn.call($element, options);
            }
          }.bind(this), options.delayIn);
        },
        out
      );
    });
  };
})(jQuery);
