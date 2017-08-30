(function ($) {
  $.fn.ajaxTracking = function(opts) {
    if (!opts.callback || typeof opts.callback !== 'function') {
      throw Error('Ajax tracking requires a valid callback function');
    }
    if (opts.filter && typeof opts.filter !== 'function') {
      throw Error('Filter must be a function');
    }
    var $window = $(window);
    $window.on('ajaxSend', function(event, request, settings) {settings.startTime = event.timeStamp;})
    $window.on('ajaxComplete', function(event, request, settings) {
      var responseTimeMillis = (event.timeStamp - settings.startTime);
      if (!opts.filter || opts.filter(request, settings, responseTimeMillis)) {
        opts.callback(request, settings, responseTimeMillis);
      };
    });
  }
}(jQuery));
