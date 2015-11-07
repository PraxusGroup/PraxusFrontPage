;(function() {
  'use strict';

  angular
    .module('app')
    .controller('ArticleController', ArticleController);

  ArticleController.$inject = ['$sce', '$stateParams', 'Articles'];

  function ArticleController($sce, $stateParams, Articles){
    var _this = this;

    this.distortOptions = {
      container: 'self',
      perspectiveMulti: 1,
      outerBuffer: 1.3,
      mouseMode: 'container',
      effectWeight: 0.8,
      weights: [
        0.0000310,
        0.0006800,
        0.0000164,
        0.0000029,
        0.0016200
      ]
    };

    Articles.findById({id: $stateParams.id}).$promise
      .then(function(res){
        res.content = $sce.trustAsHtml(res.content);
        _this.story = res;
      });
  }

})();
