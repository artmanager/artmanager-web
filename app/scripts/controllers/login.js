'use strict';

/**
 * @ngdoc function
 * @name artmanager.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of artmanager
 */
angular.module('artmanager')
  .controller('LoginCtrl', function ($scope, $location, $http, $window) {

      $scope.login = {
          user: '',
          password: ''
      };

      if ($window.sessionStorage.token != null) {
          $location.path("/dashboard");
      }

      $scope.submit = function () {
          //$location.path('/dashboard');
          var user = btoa($scope.login.user + '-' + $scope.login.password);
          var obj = { data: user };
          $http({
              method: 'POST',
              url: 'http://api.artmanager.com.br/authentication',
              data: obj
          }).then(function successCallback(response) {
              var data = response.data
              if (data.token != undefined) {
                  $window.sessionStorage.token = data.token;
                  $window.sessionStorage.name = data.name;
                  $location.path('/dashboard');
              } else {
                  alert(data.error);
                  delete $window.sessionStorage.token;
                  delete $window.sessionStorage.name;
              }
              
          }, function errorCallback(response) {
              alert('Erro');
              delete $window.sessionStorage.token;
          });

          return false;
      }

  });
