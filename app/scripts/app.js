'use strict';

/**
 * @ngdoc overview
 * @name gitHubTestApp
 * @description
 * # gitHubTestApp
 *
 * Main module of the application.
 */
angular
  .module('gitHubTestApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl',
        controllerAs: 'user'
      })
      .when('/repos/:username', {
        templateUrl: 'views/repos.html',
        controller: 'ReposCtrl',
        controllerAs: 'repos'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
