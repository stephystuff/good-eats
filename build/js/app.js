(function() {
  'use strict';

  angular.module('good-eats', ['ui.router'])
    .config(viewConfig);

    viewConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function viewConfig($stateProvider, $urlRouterProvider){
    $urlRouterProvider.when('', '/');

    $stateProvider
      .state({
        name: 'home',
        url: '/',
        templateUrl: 'views/home.template.html',
      })
      .state({
        name: 'about-us',
        url: '/about-us',
        templateUrl: 'views/about-us.template.html'
      })
      .state({
        name: 'posts',
        url: '/posts',
        templateUrl: 'views/posts.template.html',
        controller: 'PostsController',
        controllerAs: 'posts'
      })
      .state({
        name: 'post',
        url: '/posts/:id',
        templateUrl: 'views/post.template.html',
        controller: 'PostsController',
        controllerAs: 'posts'
      })
      .state({
        name: 'create-post',
        url: '/create-post',
        templateUrl: 'views/create-post.template.html',
        controller: 'PostsController',
        controllerAs: 'posts'
        })
      .state({
        name: 'post-created',
        url: '/post-created',
        templateUrl: 'views/post-created.template.html',
        controller: 'PostsController',
        controllerAs: 'posts'
      })
      .state({
        name: 'post-deleted',
        url: '/post-deleted',
        templateUrl: 'views/post-deleted.template.html',
        controller: 'PostsController',
        controllerAs: 'posts'
      })
      .state({
        name: 'restaurant-details',
        url: 'restaurant-details',
        templateUrl: 'views/restaurant-details.tmeplate.html',
        controller: 'RestaurantDetailsController',
        controllerAs: 'restaurants'
      });
  }

}());

(function() {
  'use strict';

  angular.module('good-eats')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$http', 'RestaurantDetailsService'];

  function HeaderController($http, RestaurantDetailsService) {
    var vm = this;
    this.searchBar = '';
    this.restaurantDetails = [];

    this.getRestaurantData = function getRestaurantData() {
      RestaurantDetailsService.getRestaurantDetails(this.searchBar)
        .then(function successHandler(data) {
          console.log('restaurant details retrieved, data');
          vm.restaurantDetails = data;
        })
        .catch(function errorHandler(xhr) {
          console.log('couldn\t get resturant data', xhr);
        });
    };
  }
}());

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

      vm.removePost = function removePost(id){
        console.log('in delete');
        PostsService.deletePost(id)
          .then(function successHandler(data){
            console.log("deleted post!", data);
          })
          .catch(function errorHandler(xhr){
            console.log("nope, still here", xhr);
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



      // function showMoreDetails(){
      //   console.log('clicking button');
      //   $(".btn-primary").click(function() {
      //       $(".alert").show();
      //   });
      // }
    }



}());

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
        // console.log('posts', response);
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
        url: '/posts/' + id,
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
        url: '/posts/' + id,
        method: 'DELETE',
      })
      .then(function success(response){
        console.log(response);
        return response.data;
      });
    }
  }

}());

(function() {
  'use strict';

  angular.module('good-eats')
    .controller('RestaurantDetailsController', RestaurantDetailsController);

  RestaurantDetailsController.$inject = ['$state', 'RestaurantDetailsService'];

  function RestaurantDetailsController(state, RestaurantDetailsService) {
    var vm = this;

    this.restaurantDetails = 
      RestaurantDetailsService.getRestaurantDetails()
        .then(function successHandler(data) {
          console.log('restaurant details retrieved, data');
          vm.restaurantDetails = data;
        })
        .catch(function errorHandler(xhr) {
          console.log('couldn\t get resturant data', xhr);
        });
  }


}());

(function() {
  'use strict';

  angular.module('good-eats')
    .factory('RestaurantDetailsService', RestaurantDetailsService);

  RestaurantDetailsService.$inject = ['$http'];

  function RestaurantDetailsService($http){
    return {
      getRestaurantDetails: getRestaurantDetails
    };

    /**
     * [getRestaurantDetails description]
     * @param  {[type]} searchTerm [description]
     * @return {[type]}            [description]
     */
    function getRestaurantDetails() {
      return $http({
        url: '/posts/search',
        method: 'get'
      })
      .then(function successHandler(response) {
        return response.data;
      });
    }

  }

}());

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
