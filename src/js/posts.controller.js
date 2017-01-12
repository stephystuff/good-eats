(function() {
  'use strict';

    angular.module('good-eats')
      .controller('PostsController', PostsController);

    PostsController.$inject = ['$stateParams', '$state', 'PostsService'];

    function PostsController($stateParams, $state, PostsService) {
      console.log('in post controller');
      var vm = this;
      this.posts = [];
      this.postsDetails = {};
      this.singlePost = {};
      this.errorMessage = {};

      this.getAllPosts = function getAllPosts() {
        PostsService.getPosts()
          .then(function successHandler(data){
            // console.log('post data retrieved in ctrl', data);
            vm.posts = data;
            // return data;
          })
          .catch(function errorHandler(xhr){
            console.log(xhr);
          });
      };
      this.getAllPosts();

      vm.getSinglePost = function getSinglePost(id) {
        console.log("starting one post");
        PostsService.getPost(id)
          .then(function successHandler(data) {
            vm.singlePost = data;
            console.log("got one post", vm.singlePost);
          })
          .catch(function errorHandler(xhr) {
            console.log(xhr);
          });
      };


      this.addPost = function addPost() {
        console.log("In add post", this.postDetails);
        PostsService.createPost(
          this.postDetails._id,
          this.postDetails.dishName,
          this.postDetails.restaurant,
          this.postDetails.cuisineType,
          this.postDetails.photo,
          this.postDetails.comment
        )
        .then(function successHandler(data) {
          console.log(data);
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
        console.log('in delete');
        PostsService.deletePost(id)
          .then(function successHandler(data){
            console.log(data);
          })
          .catch(function errorHandler(xhr){
            console.log(xhr);
          });
      };

      // function showMoreDetails(){
      //   console.log('clicking button');
      //   $(".btn-primary").click(function() {
      //       $(".alert").show();
      //   });
      // }
    }



}());
