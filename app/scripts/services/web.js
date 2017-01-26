'use strict';

/**
 * @ngdoc This service is to consume/use Github web services via http service.
 * It also uses a custom API constant service to retrieve constant Github web-service URL strings and interpolate service
 * to parse controller-passed-data to the API constant URL's and use it in http service.
 * @name gitHubTestApp.web
 * @description
 * # web
 * Service in the gitHubTestApp.
 */
angular.module('gitHubTestApp')
  .service('webService', function ($http, API, $interpolate) {
    /**
     * Set User-Agent header property value to my Github account username in order to consume properly Github web services.
     * @type {{User-Agent: string}}
       */
    $http.defaults.headers.common = {
      'User-Agent': 'joel-rojas'
    };
    /**
     * Returns a singleton-like object which has REST API methods to be used in a controller.
     */
    return {
      getUsers: getUsers,
      getUserRepoList: getUserRepoList
    };
    /**
     * Get users data as httpPromise object from  Github API web service.
     * @param data {Object} - An object passed to the interpolate service in order to retrieve values to be set as params in the URL.
     * @returns {HttpPromise}
     */
    function getUsers(data){
      var url = $interpolate(API.USER.GET_ALL)(data) ;
      return $http.get(url);
    }

    /**
     * Get user's repositories as httpPromise from Github API web service.
     * @param data {Object} - An object passed to the interpolate service in order to retrieve values to be set as params in the URL.
     * @returns {HttpPromise}
     */
    function getUserRepoList(data) {
      var url = $interpolate(API.USER.GET_REPO_ALL)(data);
      return $http.get(url);
    }
  });
