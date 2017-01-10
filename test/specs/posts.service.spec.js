(function() {
  'use strict';

  var expect = chai.expect;

  describe('posts service', function () {
    var $httpBackend;
    var PostsService;

    beforeEach(module('good-eats'));

    beforeEach(inject(function(_$httpBackend_, _PostsService_) {

      $httpBackend = _$httpBackend_;
      PostsService = _PostsService_;

      $httpBackend.whenPOST('/posts')
        .respond({id: '_id',
        dishName: 'dishName',
        restaurant: 'restaurant',
        cuisineType: 'cusineType',
        photo: 'photo',
        comment: 'comment'
      });

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
  });

}());
