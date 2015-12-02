;(function() {
  'use strict';

  angular
    .module('app.core')
    .run(CoreCache);

  /* @ngInject */
  function CoreCache($rootScope, $interval, User, Forum){

    $interval(refreshCache, 120000);

    User.getCurrent()
      .then(function(current){
        $rootScope.currentUser = JSON.parse(angular.toJson(current));
      });

    //Necessary things that need the current user to resolve before they are gotten;
    function afterResolveUser(current){
      Forum.cacheRecentPosts();
    }

    function refreshCache() {
      User.cacheAvatars();
      Forum.cacheArticles();
    }
  }

})();
