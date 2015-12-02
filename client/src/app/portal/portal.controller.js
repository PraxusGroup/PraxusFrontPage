;(function() {
  'use strict';

  angular
    .module('app.portal')
    .controller('PortalController', PortalController);

  /* @ngInject */
  function PortalController($state, Forum, User){

    var _this = this;

    Forum.getArticles()
      .then(function(res){
        _this.stories = res;
      });

    Forum.getRecentPosts()
      .then(function(res){
        _this.posts = res;
      });

    this.goToArticle = function(id) {
      $state.go('portal.article', {id: id});
    };

  }

})();
