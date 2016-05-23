'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('artmanager')
  .controller('DashboardCtrl', function($scope, $location, $state, $window) {

      $scope.$state = $state;

      $scope.user = {
          name: $window.sessionStorage.name
      };

      $scope.logout = function () {

          delete $window.sessionStorage.name;
          delete $window.sessionStorage.token;

          $location.path('/login');

      }

  });
