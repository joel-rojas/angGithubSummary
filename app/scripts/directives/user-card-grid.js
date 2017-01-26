'use strict';

/**
 * @ngdoc This directive or component is used to represent the Github users data as HTML cards. It shows basic profile data and a link
 * which redirects to the "repos" route of the app and displays user's repositories as cards also. The cards are shown as a "grid" of 1 row per 4 columns initially
 * and this grid gets updated (adds a new row of new four cards) when user clicks on the add-user icon located on the bottom-right of the screen.
 * @name gitHubTestApp.directive:cardGrid
 * @description
 * # cardGrid
 */
angular.module('gitHubTestApp')
  .directive('userCardGrid', function (webService, dataService) {
    return {
      bindToController: true,
      replace: true,
      controllerAs: 'cardCtrl',
      templateUrl: 'views/directives/user-card-grid.html',
      restrict: 'E',
      controller: function () {
        var me = this;
        /**
         * Function which calls webService method to get Github users from Github API web service.
         */
        me.getGithubUsers = function() {
          webService.getUsers(me.ui).then(function (response) {
            me.ui.data.push(response.data);
            dataService.setUserData(me.ui.data);
          }).catch(function(err) {
            console.log(err);
          });
        };
        /**
         * Retrieve user data from memory.
         * @type {Array}
         */
        var userDataInMemory = dataService.getUserData();
        /**
         * Check if github users is saved in dataService and if it is then it retrieves the last id from the last github user displayed on the app
         * in order to make the next API call (when user clicks on the add-user icon) with this id.
         */
        if (userDataInMemory.length) {
          var rowLastIndex = userDataInMemory.length - 1;
          var columnLastIndex = userDataInMemory[rowLastIndex].length - 1
        }
        /**
         * Set sinceId value as number, initially 0 and then from memoryData in order to set this value as URL param for Github user API service.
         * Set data value as array, initially empty and then from memoryData in order to display Github users data as cards.
         * @type {{sinceId: number, data: Array}}
           */
        me.ui = {
          sinceId: userDataInMemory.length > 0 ? userDataInMemory[rowLastIndex][columnLastIndex].id : 0,
          data: userDataInMemory || []
        };
        /**
         * This conditional is to check initially if user data is empty and if it is then it calls to getGihubUsers function to retrieve Github users data from its API.
         */
        if (!userDataInMemory.length) {
          me.getGithubUsers();
        }

      },
      link: function postLink(scope, element, attrs, ctrl) {
        /**
         * @event getMoreUsers
         * This function gets called when user clicks on add-user icon displayed on the bottom-right of the screen.
         * It updates the sinceId value with the Github user last-id by then calls directive controller's getGithubUsers function to retrieve new Github user from its webService.
         */
        ctrl.getMoreUsers = function () {
          var rowLastIndex = ctrl.ui.data.length - 1;
          var columnLastIndex = ctrl.ui.data[rowLastIndex].length - 1;
          ctrl.ui.sinceId = ctrl.ui.data[rowLastIndex][columnLastIndex].id;
          ctrl.getGithubUsers();
        };
      }
    };
  });
