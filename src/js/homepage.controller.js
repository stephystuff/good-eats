(function() {
  'use strict';

  angular.module('good-eats')
    .controller('HomePageController', HomePageController);

  HomePageController.$inject = ['$state'];

  function HomePageController($state){
    this.signUp = function signUp(){
      $state.go('sign-up');
    };

  }

}());
