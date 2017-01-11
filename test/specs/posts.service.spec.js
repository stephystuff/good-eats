(function() {
  'use strict';

  var expect = chai.expect;


  describe('the post service', function () {
    var $httpBackend;
    var PostsService;
    var $rootScope;

    beforeEach(module('good-eats'));

    beforeEach(inject(function(_$httpBackend_, _PostsService_, _$rootScope_) {

      $httpBackend = _$httpBackend_;
      PostsService = _PostsService_;
      $rootScope = _$rootScope_;

      $httpBackend.whenGET('/posts')
      .respond([{
        id:'12345',
        dishName: 'Red Curry Soup',
        restaurant: 'DC Noodles',
        cusineType: 'Thai',
        photo: 'http://therealfoodrds.com/wp-content/uploads/2016/01/Coconut-Red-Curry-Soup-2-2-1.jpg',
        comment: 'Absolutely Delicious'
      },
      {
        id: 54321,
        dishName: 'Spaghetti',
        restaurant: 'Ruby Tuesday',
        cusineType: 'Italian',
        photo: 'http://cdn.smosh.com/sites/default/files/ftpuploads/bloguploads/0913/harry-potter-memes-potter-lookin-fine.jpg',
        comment: 'So Yummy'
      }]);

      $httpBackend.whenPOST('/posts')
        .respond({
          id: '31426l',
        dishName: 'Strawberry Banana Smoothie',
        restaurant: 'McDonald\'s',
        cuisineType: 'American',
        photo: 'photo',
        comment: 'Fruity'
      });

      $httpBackend.whenGET('/posts/kgfghjkjhg')
      .respond({
        id: '12345',
        dishName: 'Red Curry Soup',
        restaurant: 'DC Noodles',
        cusineType: 'Thai',
        photo: 'http://therealfoodrds.com/wp-content/uploads/2016/01/Coconut-Red-Curry-Soup-2-2-1.jpg',
        comment: 'Absolutely Delicious'
      });

      $httpBackend.whenGET('views/home.template.html')
      .respond('hey');
    }));

    it('should get all posts from the server', function(doneCallback) {
      var result = PostsService.getPosts();
      expect(result).to.be.an('object');
      expect(result.then).to.be.a('function');

      result.then(function(data) {
          expect(data).to.be.an('array');
          expect(data.length).to.equal(2);
          console.log(data[0].restaurant);
          expect(data[0].restaurant).to.equal('DC Noodles');
          doneCallback();
        })
        .catch(function(xhr){
          console.log('in catch', xhr.message);
          doneCallback('something bad happened', xhr);
        });
      $httpBackend.flush();
    });

    it('should create a new post and send to the server', function(doneCallback) {
      var result = PostsService.createPost();
      expect(result).to.be.an('object');
      expect(result.then).to.be.a('function');

      result.then(function(data) {
        expect(data).to.be.an('object');
        expect(data).to.include.keys('id', 'dishName', 'restaurant', 'cuisineType', 'photo', 'comment');
        expect(data.dishName).to.equal('Strawberry Banana Smoothie');
        expect(data.restaurant).to.equal('McDonald\'s');
        expect(data.id).to.be.a('string');
        doneCallback();
      })
      .catch(function(xhr){
        console.log('in post catch', xhr.message);
        doneCallback('2nd bad thing', xhr);
      });
      $httpBackend.flush();
    });

    it('should get a single post from the server', function(doneCallback) {
      var result = PostsService.getPost('kgfghjkjhg');
      expect(result).to.be.an('object');
      expect(result.then).to.be.a('function');

      result.then(function(data) {
        expect(data).to.be.an('object');
        
        doneCallback();
      })
      .catch(function(xhr) {
        console.log('in getPost catch', xhr.message);
        doneCallback('another bad thing', xhr);
      });
      $httpBackend.flush();
    });
  });

}());
