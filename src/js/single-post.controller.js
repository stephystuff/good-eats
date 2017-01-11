(function() {
  'use strict';

    angular.module('good-eats')
      .controller('SinglePostController', SinglePostController);

    SinglePostController.$inject = ['$stateParams', '$state', 'PostsService' ];

    function SinglePostController($stateParams, $state, PostsService) {

      this.retrievePost = function retrievePost(id) {
        console.log("starting one post");
        PostsService.getPost(id)
          .then(function successHandler(data) {
            console.log("got one post", data);
          })
          .catch(function errorHandler(xhr) {
            console.log(xhr);
          });
      };


  }

}());
