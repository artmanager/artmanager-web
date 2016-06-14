'use strict';

angular.module('artmanager')
    .controller('RegisterCtrl', function ($scope, $http, $location, $state, $window,$mdDialog, $mdMedia, $timeout, $q, $log) {

    $scope.user = {
        user: '',
        name: '',
        password: '',
        confirm: ''
    };

    $scope.client = {
        name: '',
        email: '',
        cpf_cnpf: '',
        // address: [{
        //     street: '',
        //     number: 0,
        //     neighborhood: '',
        //     zip_code: '',
        //     city: '',
        //     state: '',
        //     country: 'Brasil'
        // }],
        phone: [{
            ddd: null,
            number: null,
            type: 1
        }]
    }

    $scope.product = {
        id_product_category: 0,
        id_supplier : 0,
        name : null,
        size : null,
        weight : null,
        describe : "",
        cost : 0,
        sale_cost: 0,
        quantity: 0
    }

    $scope.teste = { text: ""}

    $scope.closeDialog = function() {
        $mdDialog.hide();
    };

    $scope.event = null;

    $scope.supplier = [];
    $scope.productCategory = [];
    //Variaveis para autocomplete
    
    $scope.simulateQuery = false;
    $scope.isDisabled    = false;
    // $scope.newState = newState;
  
    $scope.querySearch = function (query) {
      var results = query ? $scope.loadAll().filter( $scope.createFilterFor(query) ) : self.states,
          deferred;
      if ($scope.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    };

     $scope.querySearchSup = function (query) {
      var results = query ? $scope.loadAllSup().filter( $scope.createFilterFor(query) ) : self.states,
          deferred;
      if ($scope.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    };
    
    $scope.searchTextChange = function(text) {
        $scope.querySearch(text);
    };
    $scope.searchTextChangeSup = function(text) {
        $scope.querySearchSup(text);
    };

    $scope.selectedItemChange = function (item) {
        $scope.product.id_product_category = item.id;
    };

    $scope.selectedItemChangeSup = function (item) {
        $scope.product.id_supplier = item.id;
    };

    $scope.createFilterFor = function (query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };
    };

    $scope.loadAll = function () {
      var allStates = $scope.productCategory;
      return allStates.map( function (state) {
        return {
          value: state.describe.toLowerCase(),
          display: state.describe
        };
      });
    };

    $scope.loadAllSup = function () {
        var allStates = $scope.supplier;
        return allStates.map( function (state) {
            return {
            value: state.describe.toLowerCase(),
            display: state.describe
            };
        });
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

                $scope.user.name = '';
                $scope.user.user = '';
                $scope.user.password = '';
                $scope.user.confirm = '';

            }, function errorCallback(response) {
                delete $window.sessionStorage.token;
            });
        } catch (e) {
            console.log(e);
        }
    };

    $scope.newCategory = function (obj) {
        console.log(obj);
    };

    $scope.consultCategory = function (obj) {
        $http({
            method: 'GET',
            url: 'http://api.artmanager.com.br/productCategory',
            headers: { 'x-access-token': $window.sessionStorage.token }
        }).then(function successCallback(response) {
            var obj = response.data;
            if (obj.productCategory != null) {
                $scope.productCategory = obj.productCategory;
                $scope.loadAll();
            } else {
                console.log(response.error);
            }
        }, function errorCallback(response) {
            console.log(response);
        });
    }

    $scope.consultSupplier = function () {
        $http({
            method: 'GET',
            url: 'http://api.artmanager.com.br/supplier',
            headers : { 'x-access-token': $window.sessionStorage.token }
        }).then(function successCallback(response) {
            var obj = response.data;
            if (obj.supplier != null) {
                obj.supplier.forEach(function (o) {
                    $scope.supplier.push({ id: o.id, describe: o.name });
                });

                $scope.loadAllSup();
            } else  {
                console.log(obj.error);
            }
        }, function errorCallback(response) {
            console.log(response);
        });
    };

    $scope.RegisterProduct = function () {
        try {
            var obj = $scope.product;
            if ( obj.id_product_category == 0 || obj.id_product_category == null) {
                alert = $mdDialog.alert({
                    title: 'Erro',
                    textContent: 'Por favor selecione uma categoria!',
                    ok: 'Close'
                });
                $mdDialog
                    .show( alert )
                    .finally(function() {
                    alert = undefined;
                });
                return;
            };
            
            $http({
                method: 'POST',
                url: 'http://api.artmanager.com.br/product',
                data: obj,
                headers: { 'x-access-token': $window.sessionStorage.token }
            }).then(function successCallback(response) {
                var obj = response.data;
                if (obj.success != null) {
                    alert = $mdDialog.alert({
                        title: 'Sucesso',
                        textContent: obj.success,
                        ok: 'Close'
                    });
                    $mdDialog
                        .show( alert )
                        .finally(function() {
                        alert = undefined;
                    });
                } else {
                    alert = $mdDialog.alert({
                        title: 'Error',
                        textContent: obj.error,
                        ok: 'Close'
                    });
                    $mdDialog
                        .show( alert )
                        .finally(function() {
                        alert = undefined;
                    });
                    console.log(response.error);
                }

                $scope.product.id_product_category = 0;
                $scope.product.id_supplier = 0;
                $scope.product.size = '';
                $scope.product.weight = '';
                $scope.product.name = '';
                $scope.product.describe = '';
            }, function errorCallback(response) {
                console.log(response);
            });

        } catch (e) {
            console.log(e);
        }
    };

    $scope.RegisterClient = function () {
        try {
            var obj = {
                client: $scope.client
            };

            if (obj.name == '' || obj.email == '' || obj.cpf_cnpf == '') {
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Erro')
                        .textContent('Por favor preencha todos os campos.')
                        .ariaLabel('Dialog')
                        .ok('OK')
                );
                return;
            }

            $http({
                method: 'POST',
                url: 'http://api.artmanager.com.br/client',
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
                        .ariaLabel('Dialog')
                        .ok('OK')
                    );
                } else {
                    $mdDialog.show(
                        $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Erro')
                        .textContent(data.error)
                        .ariaLabel('Dialog')
                        .ok('OK')
                    );
                }

                $scope.client.name = '';
                $scope.client.email = '';
                $scope.client.cpf_cnpf = '';
                $scope.client.phone[0].ddd = null;
                $scope.client.phone[0].number = null;

            }, function errorCallback(response) {
                delete $window.sessionStorage.token;
            });
        } catch (e) {
            console.log(e);
        }
    }

    $scope.consultSupplier();
    $scope.consultCategory();
});