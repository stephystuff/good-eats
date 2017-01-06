(function() {
  'use strict';

  angular.module('good-eats')
    .factory('RestaurantDetailsService', RestaurantDetailsService);

  RestaurantDetailsService.$inject = ['$http'];

  function RestaurantDetailsService($http){
    return {
      getRestaurantDetails: getRestaurantDetails
    };

    function getRestaurantDetails() {
      return $http({
        url: '/search',
        method: 'get'
      })
      .then(function successHandler(response) {
        return response.data;
      });
    }

  }

}());
