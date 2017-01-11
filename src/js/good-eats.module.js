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
      })
      .state({
        name: 'about-us',
        url: '/about-us',
        templateUrl: 'views/about-us.template.html'
      })
      .state({
        name: 'posts',
        url: '/posts',
        templateUrl: 'views/posts.template.html',
        controller: 'PostsController',
        controllerAs: 'posts'
      })
      .state({
        name: 'post',
        url: '/posts/:id',
        templateUrl: 'views/post.template.html',
        controller: 'PostsController',
        controllerAs: 'posts'
      })
      .state({
        name: 'create-post',
        url: '/create-post',
        templateUrl: 'views/create-post.template.html',
        controller: 'PostsController',
        controllerAs: 'posts'
        })
      .state({
        name: 'post-created',
        url: '/post-created',
        templateUrl: 'views/post-created.template.html',
        controller: 'PostsController',
        controllerAs: 'posts'
      })
      .state({
        name: 'post-deleted',
        url: '/post-deleted',
        templateUrl: 'views/post-deleted.template.html',
        controller: 'PostsController',
        controllerAs: 'posts'
      })
      .state({
        name: 'restaurant-details',
        url: 'restaurant-details',
        templateUrl: 'views/restaurant-details.tmeplate.html',
        controller: 'RestaurantDetailsController',
        controllerAs: 'restaurants'
      });
  }

}());
