(function() {
  'use strict';

  angular.module('good-eats', ['ui.router'])
    .config(viewConfig);

    viewConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function viewConfig($stateProvider, $urlRouterProvider){
    $urlRouterProvider.when('', '/');

    $stateProvider
      .state({
        name: 'home',
        url: '/',
        templateUrl: 'views/home.template.html'
      });
      // .state({
      //   name: 'sign-up',
      //   url: 'sign-up',
      //   templateUrl: 'views/sign-up.template.html'
      // });

  }

}());
