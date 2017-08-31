# JQuery Ajax Tracking

JQuery Ajax Tracking is a JQuery extension that allows to track all Ajax request on a page

## Usage

To run, you need to include the script and run:

```js
$(window).ajaxTracking({callback: function(){}, filter: function(){}});
```

This library implements [UMD](https://github.com/umdjs/umd) and hence supports both AMD and CommonJS

To include you can reference the index.js directly or use:

```sh
npm install jquery-ajax-tracking
```

## Configuration

The ajaxTracking method receipts an object with two methods:
* **callback (required)**
  * Function to be executed when an ajax request is completed
  * Parameters
    * **request**: JQuery jqXHR wrapper as described in: http://api.jquery.com/jQuery.ajax/#jqXHR. Includes data like: status, responseText
    * **settings**: JQuery Ajax setting as described in: http://api.jquery.com/jQuery.ajax/#jQuery-ajax-settings. Includes data like: url, method
    * **duration**: Time in milliseconds the request took to complete

* **filter (optional)**
  * Function that returns a boolean indicating if a specific request should trigger the callback or not
  * If not included all requests will be tracked
    * Parameters: Same as callback (request, settings, duration)

## Example Usage

Log ajax requests that call a specific url and take over X seconds
```js
$(window).ajaxTracking({
    callback: function(request, options, responseTime){
      // Log or send to an external source
      console.log('Slow request detected for endpoint: ' + options.url);
    },
    filter: function(request, options, responseTime) {
      // Track requests that are slower than 2 seconds
      return responseTime > 2000;
    }
})
```

Log ajax requests that return a 500 error.
```js
$(window).ajaxTracking({
    callback: function(request, options, responseTime){
      // Log or send to an external source
      console.log('Request failed for endpoint: ' + options.url);
    },
    filter: function(request, options, responseTime) {
      return request.status === 500;
    }
})
```
