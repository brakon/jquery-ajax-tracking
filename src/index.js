//UMD pattern from: https://github.com/umdjs/umd/blob/master/templates/jqueryPlugin.js
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
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
}));
