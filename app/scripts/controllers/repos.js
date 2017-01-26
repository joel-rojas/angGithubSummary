'use strict';

/**
 * @ngdoc function
 * @name gitHubTestApp.controller:ReposCtrl
 * @description
 * # ReposCtrl
 * Controller of the gitHubTestApp
 */
angular.module('gitHubTestApp')
  .controller('ReposCtrl', function ($routeParams) {
    var me = this;
    /**
     * Set username value inside a custom object in order to pass this value to the repo-card-grid directive.
     * @type {{username: (*|string|*|string)}}
       */
    me.ui = {
      username: $routeParams.username
    };
    
  });
