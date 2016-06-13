'use strict';

angular.module('artmanager')
    .controller('RegisterCtrl', function ($scope, $http, $location, $state, $window,$mdDialog, $mdMedia) {

    $scope.user = {
        user: '',
        name: '',
        password: '',
        confirm: ''
    };
        
    $scope.RegisterUser = function (o, r) {
        try {
            var obj = {
                user: $scope.user
            } 
            if (obj.password == '' || (obj.password != obj.confirm)) {
                  $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Erro')
                        .textContent('Por favor preencha todos os campos.')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('OK')
                );
            }
            $http({
                method: 'POST',
                url: 'http://api.artmanager.com.br/users',
                data: obj,
                headers: { 'x-access-token': $window.sessionStorage.token }
            }).then(function successCallback(response) {
                var data = response.data;
                if (data.success) {
                    $mdDialog.show(
                        $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Sucesso')
                        .textContent(data.success)
                        .ariaLabel('Alert Dialog Demo')
                        .ok('OK')
                    );
                } else {
                    $mdDialog.show(
                        $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Erro')
                        .textContent(data.error)
                        .ariaLabel('Alert Dialog Demo')
                        .ok('OK')
                    );
                }

                $scope.name = '';
                $scope.user = '';
                $scope.password = '';
                $scope.confirm = '';

            }, function errorCallback(response) {
                delete $window.sessionStorage.token;
            });
        } catch (e) {
            console.log(e);
        }
    };
});