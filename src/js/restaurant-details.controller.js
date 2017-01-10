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
