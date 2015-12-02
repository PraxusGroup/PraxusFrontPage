;(function() {
  'use strict';

  angular
    .module('app.article')
    .controller('ArticleController', ArticleController);

  /* @ngInject */
  function ArticleController($sce, $stateParams, $localForage, Forum){
    var _this = this;

    _this.distortOptions = {
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

    Forum.getArticle($stateParams.id)
      .then(function(res){
        res.content = $sce.trustAsHtml(res.content);
        _this.story = res;
        _this.story.imageUrl = _this.story.imageUrl;
      });

    $localForage.setItem($stateParams.id, true);
  }

})();
