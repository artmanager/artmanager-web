'use strict';

angular.module('artmanager')
    .controller('ReportSupplierCtrl', function ($scope, $location, $state, $window, $http, $mdDialog, $mdMedia) {
        
        if ($window.sessionStorage.token == null || $window.sessionStorage.token == undefined) {
            $location.path('/login');
        }
        
        $scope.reportSupplier = {
            dt_from: null,
            dt_to: null,
            supplier: null
        };

        $scope.closeDialog = function() {
            $mdDialog.hide();
        };

        $scope.event = null;

        $scope.SupplierModel = {
            total: 20,    
            supplier: 'Gustavo',
            products: [{
                name: 'Bolsa',
                height: '10 cm',
                weight: '20 cm',
                quantity: 0
            }]
        }

	    $scope.labels = [];
        $scope.data = [];
        $scope.type = 'PolarArea';

        $scope.toggle = function () {
        $scope.type = $scope.type === 'PolarArea' ?
            'Pie' : 'PolarArea';
        };

         $scope.onClick = function (obj, evt) {
            console.log(obj[0].label);
            $scope.reportSupplier.supplier = obj[0].label;
            $scope.event = evt;
            $scope.ReportOneSuppliers();  
        };
     
        $scope.ReportSuppliers = function () {
            try {

                var obj = $scope.reportSupplier;
                if (obj.dt_from == null) {
                    obj.dt_from = new Date().getDate() + "-" + (new Date().getMonth()) + "-" + new Date().getFullYear() +" 00:00";
                    obj.dt_to = new Date().getDate() + "-" +  (new Date().getMonth() +1 ) + "-" + new Date().getFullYear() +" 23:59";
                }

                $http({
                    method: 'POST',
                    url: 'http://api.artmanager.com.br/reportSupplier',
                    data: obj,
                    headers: { 'x-access-token': $window.sessionStorage.token }
                }).then(function successCallback(response) {
                    var data = response.data;
                    if (data.success) {
                        $scope.labels = [];
                        $scope.data = [];
                        
                        data.success.forEach(function (o) {
                            $scope.labels.push(o.supplier);
                            var qtd = 0;

                            o.products.forEach(function (p) {
                                qtd = qtd + p.quantity;
                            });
                            
                            $scope.data.push(qtd);
                            console.log(o);
                        });
                    } else {
                        console.log(data.error);
                    }
                }, function errorCallback(response) {
                   delete $window.sessionStorege.token;
                });
            } catch (error) {
                console.log('Não foi possível consultar o relatorio. ' + error);
            }
        };

        $scope.ReportOneSuppliers = function () {
            try {
                var obj = $scope.reportSupplier;
                if (obj.dt_from == null) {
                    obj.dt_from = new Date().getDate() + "-" + (new Date().getMonth()) + "-" + new Date().getFullYear() +" 00:00";
                    obj.dt_to = new Date().getDate() + "-" +  (new Date().getMonth() +1 ) + "-" + new Date().getFullYear() +" 23:59";
                }

                $http({
                    method: 'POST',
                    url: 'http://api.artmanager.com.br/reportOneSupplier',
                    data: obj,
                    headers: { 'x-access-token': $window.sessionStorage.token }
                }).then(function successCallback(response) {
                    var data = response.data;
                    if (data.success) {
                        $scope.SupplierModel.supplier = data.success[0].supplier;
                        console.log('TESTE');
                        console.log($scope.SupplierModel);
                        var parentEl = angular.element(document.body);

                        $mdDialog.show({
                            parent: parentEl,
                            targetEvent: $scope.event,
                            templateUrl: 'views/templates/reportSupplier.html',
                            locals: {
                                Supplier: $scope.SupplierModel,
                            },
                            controller: DialogCtrl,
                        });
                    } else {
                        console.log(data.error);
                    }
                }, function errorCallback(response) {
                delete $window.sessionStorege.token;
                });
            } catch (error) {
                console.log('Não foi possível consultar o relatorio. ' + error);
            }
        };
                
        $scope.ReportSuppliers();

    });

    function DialogCtrl($scope, $mdDialog, Supplier) {
        $scope.closeDialog = function() {
            $mdDialog.hide();
        };
        $scope.Supplier = Supplier;
    }
