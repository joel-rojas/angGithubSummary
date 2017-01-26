'use strict';

describe('Service: APP', function () {

  // load the service's module
  beforeEach(module('gitHubTestApp'));

  // instantiate service
  var APP;
  beforeEach(inject(function (_APP_) {
    APP = _APP_;
  }));

  it('should do something', function () {
    expect(!!APP).toBe(true);
  });

});
