'use strict';

angular.module('artmanager')
    .controller('ReportSalesCtrl', function ($scope, $location, $state, $window, $http, $mdDialog, $mdMedia) {
    
    $scope.reportDate = {
        dt_from : null,
        dt_to : null
    };

    $scope.labels = ['Total', 'Total Desconto', 'Total Liquido'];
    $scope.series = ['Series A', 'Series B'];

    $scope.data = [
        [65.6, 59, 80]
    ];


    $scope.ReportSales= function () {
        try {
            var obj = $scope.reportDate;
            if (obj.dt_from == null) {
                obj.dt_from = new Date().getFullYear()  + "-" +  ("0" + (new Date().getMonth() + 1)).slice(-2) + "-" + new Date().getDate() +" 00:00";
                obj.dt_to = new Date().getFullYear()  + "-" +  ("0" + (new Date().getMonth() + 1)).slice(-2) + "-" + new Date().getDate() +" 23:59";
            }

            $http({
                method: 'POST',
                url: 'http://api.artmanager.com.br/reportSales',
                data: obj,
                headers: { 'x-access-token': $window.sessionStorage.token }
            }).then(function successCallback(response) {
                var data = response.data;
                if (data.success) {

                }
            }, function errorCallback(response) {
                delete $window.sessionStorage.token;
            });

        } catch (e) {
            console.log(e);
        }
    }
});