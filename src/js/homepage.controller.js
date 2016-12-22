(function() {
  'use strict';

  angular.module('good-eats')
    .controller('HomePageController', HomePageController);

  HomePageController.$inject = ['$state'];

  function HomePageController($state){
    this.signUp = function signUp(){
      $state.go('sign-up');
    };

    this.allPosts = function allPosts() {
      $state.go('all-posts');
    };

    $('.login').click(function hideSignUp() {
        $('.sign-up').hide(function showLoginForm(){
          $('.login-form').show();
        });
    });

  }


}());
