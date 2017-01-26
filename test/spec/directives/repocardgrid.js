'use strict';

describe('Directive: repoCardGrid', function () {

  // load the directive's module
  beforeEach(module('gitHubTestApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<repo-card-grid></repo-card-grid>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the repoCardGrid directive');
  }));
});
