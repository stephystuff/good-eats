(function() {
  'use strict';

  angular.module('good-eats')
    .factory('PostsService', PostsService);

  PostsService.$inject = ['$http'];

  function PostsService($http) {

    return {
      createPost: createPost,
      getPosts: getPosts
      // getPost: getPost,
      // deletePost: deletePost
    };

    function createPost(dishName, restaurant, cuisineType, photo, comment) {
      return $http({
        url: '/posts',
        data: JSON.stringify({
          dishName: dishName,
          restaurant: restaurant,
          cuisineType: cuisineType,
          photo: photo,
          comment: comment
        }),
        method: 'POST',
        dataType: 'json',
        headers: {
                'Content-Type': 'application/json'
            }
      })
      .then(function returnResponse(response) {
        console.log('in createPost', response);
        return response.data;
      });
    }

    function getPosts(){
      return $http({
        url: '/all-posts',
        method: 'get'
      })
      .then(function returnPosts(response){
        console.log('posts', response);
        return response;
      });
    }
  }

}());
