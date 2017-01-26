'use strict';

/**
 * @ngdoc This service returns and saves data from User controller data in order to save/retrieve the last "state/data" from the Github All-users data 
 * and displays the current users data as grid that was retrieved from that API.
 *
 * @name gitHubTestApp.data
 * @description
 * # data
 * Service in the gitHubTestApp.
 */
angular.module('gitHubTestApp')
  .service('dataService', function () {
    /**
     * Assign "this" object (service) in a variable.
     * @type {gitHubTestApp.data}
       */
    var me = this;
    /**
     * Set a custom object to save Github data from a controller.
     * @type {{user: Array}}
       */
    me.uiData = {
      user: []
    };
    return {
      getUserData: getUserData,
      setUserData: setUserData
    };
    /**
     * Returns Github User data from a custom object saved inside this service.
     * @returns {Array}
     */
    function getUserData() {
      return me.uiData.user;
    }

    /**
     * Save Github User data value inside a custom object saved inside this service.
     * @param value {Array} - A Github user data list passed from User controller.
     */
    function setUserData(value) {
      me.uiData.user = value
    }

  });
