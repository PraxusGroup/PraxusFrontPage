;(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainController', MainController);

  MainController.$inject = ['Articles'];

  function MainController(Articles){

    var _this = this;

    Articles.find({limit: 6}).$promise
      .then(function(res){
        _this.stories = res;
      });

    this.post = {
      title: 'Request for Pics/screenshots',
      category: 'General Discussion',
      author: 'Whiplash',
      createdOn: new Date(),
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec orci vehicula, efficitur dui in, viverra ante. Cras id tincidunt metus. Praesent quis tincidunt arcu. Nulla sed risus a tellus fermentum molestie sit amet sit amet elit. Donec molestie interdum consectetur. Mauris iaculis tortor sed feugiat commodo. Ut pretium ante vitae nisi consectetur, sed sagittis nisl malesuada. In non fringilla neque. Nunc vel lectus ut ipsum viverra eleifend.'
    };

    this.posts = [
      this.post,
      this.post,
      this.post
    ];

  }

})();
