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
        console.log("In add post");
        PostsService.createPost(
          this.postDetails.dishName,
          this.postDetails.restaurant,
          this.postDetails.cuisineType,
          this.postDetails.photo,
          this.postDetails.comment
        )
        .then(function success(data) {
          $state.go('post-created');
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

      vm.getAllPosts = function getAllPosts(){
        console.log('in getAllPosts');
        PostsService.getPosts
          .then(function success(posts){
            console.log(posts);
            return posts;
          })
          .catch(function error(xhr){
            console.log(xhr);
          });


      };
    }

}());
