'use strict';

/**
 * @ngdoc This directive or component is used to represent Github repositories-by-username data as HTML cards. It shows basic repo data and a repo link
 * which redirects to Github user's selected-repository. The cards are shown as a "grid" of 1 row per 4 columns and this grid gets updated when
 * user clicks on whichever pagination component.
 * @name gitHubTestApp.directive:repoCardGrid
 * @description
 * # repoCardGrid
 */
angular.module('gitHubTestApp')
  .directive('repoCardGrid', function (webService) {
    return {
      replace: true,
      scope: {
        username: '='
      },
      controllerAs: 'repoCardCtrl',
      templateUrl: 'views/directives/repo-card-grid.html',
      restrict: 'E',
      controller: function ($scope) {
        var me = this;
        /**
         * Set initial configuration values inside an object by then set/retrieve these values in the view and controller of this directive.
         * page = This value determines the active page in the pagination component, it works as ng-model for the mentioned component in order to track which page is currently active.
         * totalData = This value is retrieved from API call which determines how many repositories has a Gihub user in his/her account.
         * data = This value is populated from totalData array but with some conditions, it displays only 4 repositories as cards as the user-card-grid directive does but this time using the pagination component.
         * maxItems = This value represents the maximum items (cards) to be displayed in this component.
         * username = This value is retrieved from routeParams service, this value is previously set when the user clicks on repos route defined in the user-card-grid component view.
         * pagination = This is an object which contains all pagination init config values.
         * pagination.maxSize = This value represents the maximum size of page items the pagination component will have.
         * @type {{page: number, totalData: Array, data: Array, maxItems: number, username: (string|*), pagination: {maxSize: number}}}
           */
        me.ui = {
          page: 1,
          totalData: [],
          data: [],
          maxItems: 4,
          username: $scope.username,
          pagination: {
            maxSize: 5
          }
        };
        /**
         * Function that calls webService getUserRepoList method and retrieves Github repositories-by-username data from Github API. 
         */
        me.getRepoList = function () {
          webService.getUserRepoList(me.ui).then(function (response) {
            var data = response.data;
            me.ui.totalData = data;

            for (var i = 0; i < me.ui.maxItems; i++) {
              me.ui.data.push(me.ui.totalData[i]);
            }

          }).catch(function (err) {
            console.log(err);
          });
        };
        me.getRepoList();
      },
      link: function postLink(scope, element, attrs, ctrl) {
        /**
         * @event setPage
         * This function gets called whenever a page item is clicked on the pagination component.
         * It updates the range of items to be displayed as cards in this component.
         */
        ctrl.setPage = function () {
          var ITEMSDISPLAYED = ctrl.ui.maxItems * ctrl.ui.page;
          ctrl.ui.data = [];
          for (var j = ITEMSDISPLAYED - ctrl.ui.maxItems; j < ITEMSDISPLAYED; j++) {
            if (ctrl.ui.totalData[j]) {
              ctrl.ui.data.push(ctrl.ui.totalData[j]);
            } else {
              break;
            }
          }
        };
      }
    };
  });
