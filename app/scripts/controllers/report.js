'use strict';

angular.module('artmanager')
      .controller('ReportCtrl', function ($scope, $location, $state, $window, $http) {

    if ($window.sessionStorage.token == null || $window.sessionStorage.token == undefined) {
        $location.path('/login');
    }
        
    $scope.$state = $state;
    $scope.chart = null;
    $scope.dtNow = {"dt_from": new Date().getFullYear()  + "-" +  ("0" + (new Date().getMonth() + 1)).slice(-2) + "-" + new Date().getDate() +" 00:00",
             "dt_to": new Date().getFullYear()  + "-" +  ("0" + (new Date().getMonth() + 1)).slice(-2) + "-" + new Date().getDate() +" 23:59"}; 
     
    $scope.reportDate = {
        "dt_from": "",
        "dt_to": ""
    };
    //Variaveis do grafico de vendas de hoje
    $scope.labels = [];
    $scope.data = [];
    $scope.series = ['Hoje'];
    
    //Variaveis para grafico dinamico
    $scope.labelsAll = [];
    $scope.dataAll = [];
    $scope.seriesAll = ['Produtos'];
    
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };
    
   
    $scope.reportProductsToday = function () {
        $http({
            method: 'POST',
            url: 'http://api.artmanager.com.br/RerportTimeProductsToDay',
            data: $scope.dtNow,
            headers: { 'x-access-token': $window.sessionStorage.token }
        }).then(function successCallback(response) {
            var data = response.data
            if (data.success) {
                var listData = [];
                var listLabes = [];
                if (data.success.length == 0) {
                    
                    $scope.data.push(listData);
                    $scope.labels.push('0h');
                } else {                    
                    data.success.forEach(function (o) {
                        console.log(o);
                        listData.push(o.quantity);
                        $scope.labels.push((o.creationdate + 'H').toString());
                    });
                    
                    $scope.data.push(listData);
                    console.log($scope.labels);
                    console.log($scope.data);
                }
            } else {
                alert('Não foi possível consultar os produtos vendidos. ' + data.error);
            }
        }, function errorCallback(response) {
            delete $window.sessionStorage.token;
        });
    };
    
    $scope.reportProductsAll = function () {
        var obj = $scope.reportDate;
         $http({
            method: 'POST',
            url: 'http://api.artmanager.com.br/reportDateQuantityProducts',
            data: obj,
            headers: { 'x-access-token': $window.sessionStorage.token }
        }).then(function successCallback(response) {
            var data = response.data
            if (data.success) {
                var listData = [];
                var listLabes = [];
                if (data.success.length == 0) {
                    
                    $scope.dataAll.push(listData);
                    $scope.labelsAll.push('0h');
                } else {    
                    
                    $scope.labelsAll = [];
                    $scope.dataAll = [];                
                    data.success.forEach(function (o) {
                        console.log(o);
                        listData.push(o.quantity);
                        $scope.labelsAll.push((o.creationdate).toString());
                    });
                    
                    $scope.dataAll.push(listData);
                    console.log($scope.labels);
                    console.log($scope.data);
                }
            }
        }, function errorCallback(response) {
            delete $window.sessionStorage.token;
        });
    };
    
    $scope.reportProductsAll();
    $scope.reportProductsToday();
});
