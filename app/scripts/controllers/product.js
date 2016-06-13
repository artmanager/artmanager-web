'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('artmanager')
  .controller('ProductCtrl', function ($scope, $location, $state, $window) {

      $scope.$state = $state;

      $scope.product = {
          id_product_category: null,
          id_supplier: null,
          name: null,
          size: null,
          weight: null,
          describe: null,
          cost: null,
          sale_cost: null,
          quantity: null
      };



  });
