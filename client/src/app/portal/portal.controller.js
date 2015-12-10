;(function() {
  'use strict';

  angular
    .module('app.portal')
    .controller('PortalController', PortalController);

  /* @ngInject */
  function PortalController($scope, $http, $state, Core, Forum, ForumPosts, ArticleList) {
    var _this = this;

    _this.stories = ArticleList;
    _this.posts   = ForumPosts;

    _this.goToArticle = function(story) {
      $state.go('portal.article', { id: story.slug || story.id });
    };

    $scope.$on('cache-refreshed', getPortalData);

    function getPortalData() {
      Forum.getArticles()
        .then(function(res) {
          _this.stories = res;
        });

      Forum.getRecentPosts()
        .then(function(res) {
          _this.posts = res;
        });
    }
  }

})();
