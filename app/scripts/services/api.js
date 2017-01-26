'use strict';

/**
 * @ngdoc This constant service returns Github constant URLs and it is used specifically in the web service of the app. 
 * @name gitHubTestApp.APP
 * @description
 * # APP
 * Constant in the gitHubTestApp.
 */
angular.module('gitHubTestApp')
  .constant('API', (function(){
    var BASE_URL = 'https://api.github.com';
    return {
      BASE_URL: BASE_URL,
      USER: (function(){
        return {
          GET_ALL: BASE_URL + '/users?since={{sinceId}}&per_page=4',
          GET_REPO_ALL: BASE_URL + '/users/{{username}}/repos'
        }
      })()

    };
  })());
