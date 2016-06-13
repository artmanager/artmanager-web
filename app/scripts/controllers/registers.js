angular.module('artmanager')
  .controller('DashboardCtrl', function ($scope, $http, $location, $state, $window) {

        if ($window.sessionStorage.token == null || $window.sessionStorage.token == undefined) {
            $location.path('/login');
        }
        
        $scope.user = {
            login: '',
            password: '',
            confirm: ''
        }

        $scope.registerUser = function () {

        if ($scope.user.password != $scope.confirm) {
            alert('Senhas invalidas');
            return false;
        }

        var obj = {
            user: $scope.user,
            password: $scope.password
        };

        $http({
            method: 'POST',
            url: 'http://api.artmanager.com.br/users',
            data: obj
        })
        .success(function (success) {

        })
        .error(function () {
        });
      }
  })