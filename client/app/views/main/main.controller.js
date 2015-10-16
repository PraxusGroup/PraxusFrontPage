;(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainController', MainController);

  MainController.$inject = [];

  function MainController(){

    var d = new Date();
    d.setDate(d.getDate()-5);

    this.story = {
      title: 'News Topic Title',
      category: 'Star Citizen',
      author: 'Whiplash',
      createdOn: d,
      image: 'images/news.sample.jpg',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec orci vehicula, efficitur dui in, viverra ante. Cras id tincidunt metus. Praesent quis tincidunt arcu. Nulla sed risus a tellus fermentum molestie sit amet sit amet elit. Donec molestie interdum consectetur. Mauris iaculis tortor sed feugiat commodo. Ut pretium ante vitae nisi consectetur, sed sagittis nisl malesuada. In non fringilla neque. Nunc vel lectus ut ipsum viverra eleifend.'
    };

    this.stories = [
      {
        title: 'News Topic Title',
        category: 'Star Citizen',
        author: 'Whiplash',
        createdOn: d,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec orci vehicula, efficitur dui in, viverra ante. Cras id tincidunt metus. Praesent quis tincidunt arcu. Nulla sed risus a tellus fermentum molestie sit amet sit amet elit. Donec molestie interdum consectetur. Mauris iaculis tortor sed feugiat commodo. Ut pretium ante vitae nisi consectetur, sed sagittis nisl malesuada. In non fringilla neque. Nunc vel lectus ut ipsum viverra eleifend.'
      },
      this.story,
      this.story
    ];

    this.search = 'Hello World';

  }

})();
