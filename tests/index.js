var assert = chai.assert;

describe('Ajax Tracking', function() {
  const DELTA_THRESHOLD = 20;

  before(function() {
    $.mockjax({
      url: '/rest/api',
      // Simulate a network latency of 150ms
      responseTime: 150,
      responseText: 'test response'
    });
  });

  beforeEach(function() {
    $(window).off('ajaxComplete').off('ajaxSend');
  });

  it('Throws exception when no valid callback is passed', function() {
    assert.throws(function(){$(window).ajaxTracking({})}, 'Ajax tracking requires a valid callback function', 'Callback can not be empty');
    assert.throws(function(){$(window).ajaxTracking({
      callback: 'a string'
    })}, 'Ajax tracking requires a valid callback function', 'Callback should be a function');
  });

  it('Throws exception when filter is not a function', function() {
    assert.throws(function(){$(window).ajaxTracking({
      callback: function(){},
      filter: 'a string'
    })}, 'Filter must be a function', 'Filte4r must be a function');
  });

  it('should track all completed ajax requests when not filter is specified', function(done) {
    $(window).ajaxTracking({
      callback: function(request, options, responseTime) {
        assert.equal(request.status, 200);
        assert.equal(options.url, '/rest/api')
        assert.closeTo(responseTime, 150, DELTA_THRESHOLD);
        done();
      }
    });
    $.ajax('/rest/api');
  });

  it('should track only filtered endpoints', function(done) {
    $(window).ajaxTracking({
      callback: function(request, options, responseTime) {
        assert.equal(request.status, 200);
        assert.equal(options.url, '/rest/api')
        assert.closeTo(responseTime, 150, DELTA_THRESHOLD);
        done();
      },
      filter: function(request, options, responseTime) {
        return options.url.indexOf('/api') > -1;
      }
    });
    $.ajax('/rest/api')
  });

  it('should skip filtered endpoints', function(done) {
    $(window).ajaxTracking({
      callback: function(request, options, responseTime) {
        done(new Error('Should not have callback called'));
      },
      filter: function(request, options, responseTime) {
        return options.url.indexOf('/rest/dont-track') > -1;
      }
    });
    $.ajax('/rest/api').then(function(){done()});
  });
});
