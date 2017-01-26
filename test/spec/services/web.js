'use strict';

describe('Service: web', function () {

  // load the service's module
  beforeEach(module('gitHubTestApp'));

  // instantiate service
  var web;
  beforeEach(inject(function (_web_) {
    web = _web_;
  }));

  it('should do something', function () {
    expect(!!web).toBe(true);
  });

});
