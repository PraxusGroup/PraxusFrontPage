;(function() {
  'use strict';

  angular
    .module('app')
    .controller('ArticleController', ArticleController);

  ArticleController.$inject = [];

  function ArticleController(){
    this.distortOptions = {
      container: 'self',
      perspectiveMulti: 1,
      mouseMode: 'container',
      effectWeight: 0.8,
      weights: [
        0.0000310,
        0.0006800,
        0.0000164,
        0.0000029,
        0.0023200
      ]
    };
  }

})();
