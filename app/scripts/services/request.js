'use strict';

angular.module('artmanager')
  .controller('RequestService', function ($scope, $http, $window) {

      $scope.send = function (method, route, data) {
          var url = ulr + route; 
          $http({
              method: method,
              url: url,
              data: data
            })
            .success(function (success) {
                return success.data;
            })
            .error(function (error) {
                return error.data;
            })
      };
  });