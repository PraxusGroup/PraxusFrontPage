;(function() {
  'use strict';

  angular
    .module('app.portal')
    .controller('PortalController', PortalController);

  /* @ngInject */
  function PortalController($scope, $state, Core, Forum, User){

    var _this = this;

    _this.goToArticle = function(id) {
      $state.go('portal.article', {id: id});
    };

    $scope.$on('cache-refreshed', getPortalData);

    getPortalData();

    function getPortalData() {
      Forum.getArticles()
        .then(function(res){
          Core.syncSet(_this, 'stories', res);
        });

      Forum.getRecentPosts()
        .then(function(res){
          Core.syncSet(_this, 'posts', res);
        });
    }
  }

})();
