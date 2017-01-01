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
        templateUrl: 'views/home.template.html',
        controller: 'HomePageController',
        controllerAs: 'homepage'
      })
      .state({
        name: 'sign-up',
        url: '/sign-up',
        templateUrl: 'views/sign-up.template.html',
        controller: 'UserStatusController',
        controllerAs: 'status'
      })
      .state({
        name: 'all-posts',
        url: '/all-posts',
        templateUrl: 'views/all-posts.template.html',
        controller: 'PostsController',
        controllerAs: 'posts'
      })
      .state({
        name: 'create-post',
        url: '/create-post',
        templateUrl: 'views/create-post.template.html',
        controller: 'PostsController',
        controllerAs: 'posts'
      });

  }

}());
