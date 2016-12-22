(function() {
  'use strict';

  angular.module('good-eats')
    .controller('UserStatusController', UserStatusController);

  UserStatusController.$inject = ['$state'];

  function UserStatusController($state) {
    this.allPosts = function allPosts() {
      $state.go('all-posts');
    };
  }
}());
