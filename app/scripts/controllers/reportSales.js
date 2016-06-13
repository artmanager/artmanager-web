'use strict';

angular.module('artmanager')
    .controller('ReportSalesCtrl', function ($scope, $location, $state, $window, $http, $mdDialog, $mdMedia) {
    
    $scope.labels = ['Total', 'Total Comissão', 'Total Liquido', 'Produtos', 'Pendentes', 'Entregues'];
    $scope.series = ['Series A', 'Series B'];

    $scope.data = [
        [65.6, 59, 80, 81, 56, 55]
    ];
});