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
