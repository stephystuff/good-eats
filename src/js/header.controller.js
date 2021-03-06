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
