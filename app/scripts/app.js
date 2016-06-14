'use strict';

/**
 * @ngdoc overview
 * @name artmanager
 * @description
 * # artmanager
 *
 * Main module of the application.
 */
angular
  .module('artmanager', [
    'ui.router',
    'ngAnimate',
    'chart.js',
    'ngMaterial',
    'ngCpfCnpj'
  ])
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/dashboard', '/dashboard/overview');
    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('base', {
            abstract: true,
            url: '',
            templateUrl: 'views/base.html'
        })
        .state('login', {
            url: '/login',
            parent: 'base',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .state('dashboard', {
            url: '/dashboard',
            parent: 'base',
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardCtrl'
        })
        .state('overview', {
            url: '/overview',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/registers.html'
        })
        .state('reports', {
            url: '/reports',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/reports.html',
            controller: 'ReportCtrl'
        })
        .state('reportSupplier', {
            url: '/reportSupplier',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/reportSupplier.html',
            controller: 'ReportSupplierCtrl'
        })
        .state('reportSales', {
            url: '/reportSales',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/reportSales.html',
            controller: 'ReportSalesCtrl'
        });
         
  });
