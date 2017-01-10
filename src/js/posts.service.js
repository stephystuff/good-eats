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

    /**
     * http request that creates a new post for dish item
     * @param  {string} dishName    Name of dish item user wants to post
     * @param  {string} restaurant  Name of restaurant user went to
     * @param  {string} cuisineType The type of cuisine of dish item
     * @param  {string} photo       Url image address of dish item
     * @param  {string} comment     A message about the dish item
     * @return {promise}
     */
    function createPost(_id, dishName, restaurant, cuisineType, photo, comment) {
      return $http({
        url: '/posts',
        data: angular.toJson({
          id: _id,
          dishName: dishName,
          restaurant: restaurant,
          cuisineType: cuisineType,
          photo: photo,
          comment: comment
        }),
        method: 'POST',
        headers: {
                'Content-Type': 'application/json'
            }
      })
      .then(function returnResponse(response) {
        console.log('in createPost', response);
        return response.data;
      });
    }

    /**
     * http request that retrieves all posts
     * @return {Promise}
     */
    function getPosts(){
      return $http({
        url: '/posts',
        method: 'get'
      })
      .then(function returnPosts(response){
        console.log('posts', response);
        return response.data;
      });
    }

    /**
     * Sends an http requst to retrieve a single post by id
     * @param  {string} id The id of an individual post to retrieve
     * @return {promise}
     */
    function getPost(id) {
      return $http({
        url: '/posts' + '/' + id,
        method: 'get',
      })
      .then(function successHandler(response) {
        console.log(response);
        return response.data;
      });
    }

    /**
     * Sends an http request to delete a post by id
     * @param  {string} id The id of the post to be deleted
     * @return {promise}
     */
    function deletePost(id){
      return $http({
        url: '/posts' + '/' + id,
        method: 'delete'
      })
      .then(function success(response){
        console.log(response);
        return response.data;
      });
    }
  }

}());
