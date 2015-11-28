;(function() {
  'use strict';

  angular
    .module('app')
    .controller('ArticleController', ArticleController);

  ArticleController.$inject = ['$sce', '$stateParams', 'Articles', '$localForage'];

  function ArticleController($sce, $stateParams, Articles, $localForage){
    var _this = this;

    this.distortOptions = {
      container: 'self',
      outerBuffer: 1.16,
      mouseMode: 'container',
      effectWeight: 0.9,
      weights: [
        0.0000310,
        0.0006800,
        0.0000164,
        0.0000029,
        0.0018500
      ]
    };

    Articles.findById({id: $stateParams.id}).$promise
      .then(function(res){
        res.content = $sce.trustAsHtml(res.content);
        _this.story = res;
      });

    $localForage.setItem($stateParams.id, true);
  }

})();
