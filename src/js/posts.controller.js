(function() {
  'use strict';

    angular.module('good-eats')
      .controller('PostsController', PostsController);

    PostsController.$inject = ['$state', 'PostsService'];

    function PostsController($state, PostsService) {
      var vm = this;
      this.postsDetails = {};
      this.errorMessage = {};

      this.addPost = function addPost() {
        PostsService.createPost(
          this.postDetails.dishName,
          this.postDetails.restaurantName,
          this.postDetails.cuisineType,
          this.postDetails.uploadedPhoto
        )
        .then(function success(data) {
          state.go('all-posts');
        })
        .catch(function error(xhr) {
          console.log(xhr);
          if(xhr.data.error.status > 400 && xhr.data.error.status < 501) {
            vm.errorMessage.statusResponse = 'You must provide a valid restaurant name and dish name.';
          } else {
            vm.errorMessage.statusResponse = 'Our system is down! Please try again';
          }
        });
      };
    }

}());
