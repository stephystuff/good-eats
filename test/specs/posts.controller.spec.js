(function() {
  'use strict';

  var expect = window.chai.expect;

  describe('posts controller', function() {
    var $rootScope;
    var mockPostsService = {};
    var PostsController;
    var mockState = {};

    beforeEach(module('good-eats'));

    beforeEach(module(function($provide) {
      $provide.value('PostsService', mockPostsService);
      $provide.value('$state', mockState);
    }));

    beforeEach(inject(function($controller, $q) {
      mockPostsService.getPosts = function() {
        return $q.resolve([{
            id: '1234',
            dishName: 'Veggie Pizza',
            restaurant: 'Cozi',
            cuisineType: 'Italian',
            photo: 'photo',
            comment: 'Yum'
        }]);
      };

      mockPostsService.createPost = function createPost(argOne) {
        mockPostsService.createPost.numTimesCalled++;
        mockPostsService.createPost.lastArgument = argOne;
        return $q.resolve({});
      };
      mockPostsService.createPost.numTimesCalled = 0;

      mockState.go = function go(myArg) {
        mockState.go.numTimesCalled++;
        mockState.go.lastArgument = myArg;
      };
      mockState.go.numTimesCalled = 0;

      PostsController = $controller('PostsController');
    }));

    it('should contain scope variables', function() {
      expect(PostsController.posts).to.be.an('array');
      expect(PostsController.posts.length).to.equal(0);
      expect(PostsController.postsDetails).to.be.an('object');
    });

    it('should use the service to create a new post', function() {
      PostsController.postDetails = {
        id: '1234',
        dishName: 'Veggie Pizza',
        restaurant: 'Cozi',
        cuisineType: 'Italian',
        photo: 'photo',
        comment: 'Yum'
      };
      PostsController.addPost();
      expect(mockPostsService.createPost.numTimesCalled).to.equal(1);
      // TODO: fix this test, and also test that we called $state.go() with the correct argument
      // expect(mockState.go.numTimesCalled).to.equal(1);

    });
  });

}());
