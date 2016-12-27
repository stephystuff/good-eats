(function() {
  'use strict';

  angular.module('good-eats')
    .factory('PostsService', PostsService);

  PostsService.$inject = ['$http'];

  function PostsService($http) {

    return {
      createPost: createPost,
      getPosts: getPosts,
      getPost: getPost,
      deletePost: deletePost
    };

    function createPost(dishName, restaurantName, cuisineType, uploadedPhoto) {
      return $http({
        url: '/posts',
        data: {
          dishName: dishName,
          restaurantName: restaurantName,
          cuisineType: cuisineType,
          uploadedPhoto: uploadedPhoto
        },
        method: 'post',
        headers: {'ContentType': 'applications.json'}
      })
      .then(function returnResponse(response) {
        return response.data;
      });
    }
  }

}());
