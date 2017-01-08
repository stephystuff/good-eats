(function() {
  'use strict';

    angular.module('good-eats')
      .controller('PostsController', PostsController);

    PostsController.$inject = ['$state', 'PostsService'];

    function PostsController($state, PostsService) {
      var vm = this;
      this.posts = [];
      this.postsDetails = {};
      this.errorMessage = {};

      PostsService.getPosts()
        .then(function successHandler(data){
          console.log('post data retrieved in ctrl', data);
          vm.posts = data;
          // return data;
        })
        .catch(function errorHandler(xhr){
          console.log(xhr);
        });

      this.getSinglePost = function getSinglePost(id) {
        console.log("starting one post");
        PostsService.getPost(id)
          .then(function successHandler(data) {
            console.log("got one post", data);
          })
          .catch(function errorHandler(xhr) {
            console.log(xhur);
          });
      };


      this.addPost = function addPost() {
        console.log("In add post");
        PostsService.createPost(
          this.postDetails.dishName,
          this.postDetails.restaurant,
          this.postDetails.cuisineType,
          this.postDetails.photo,
          this.postDetails.comment
        )
        .then(function successHandler(data) {
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

      vm.removePost = function removePost(id){
        PostsService.deletePost(id)
          .then(function successHandler(data){
            console.log(data);
          })
          .catch(function errorHandler(xhr){
            console.log(xhr);
          });
      };

      function showMoreDetails(){
        console.log('clicking button');
        $(".btn-primary").click(function() {
            $(".alert").show();
        });
      }
    }



}());
