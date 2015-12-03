;(function() {
  'use strict';

  angular
    .module('app.portal')
    .controller('PortalController', PortalController);

  /* @ngInject */
  function PortalController($scope, $state, Forum, User){

    var _this = this;

    _this.goToArticle = function(id) {
      $state.go('portal.article', {id: id});
    };

    $scope.$on('cache-refreshed', getPortalData);

    getPortalData();

    function getPortalData() {
      Forum.getArticles()
        .then(function(res){
          _this.stories = addToSet(_this.stories, res);
        });

      Forum.getRecentPosts()
        .then(function(res){
          _this.posts = addToSet(_this.posts, res);
        });
    }

    function addToSet(originals, comparison) {
      if(angular.isArray(originals)) {
        comparison.forEach(function(compare){
          var dupe = false;

          if (originals.length > 0){
            originals.forEach(function(original, index){
              if (compare.id === original.id) {
                dupe = true;
              }
            });
          }

          if (!dupe) {
            originals.push(compare);
          }
        });
      } else {
        originals = comparison;
      }

      return originals;
    }

  }

})();
