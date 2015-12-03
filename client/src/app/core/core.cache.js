;(function() {
  'use strict';

  angular
    .module('app.core')
    .run(CoreCache);

  /* @ngInject */
  function CoreCache($rootScope, $interval, $q, User, Forum){

    //Every 2 minuets refresh cache
    $interval(refreshCache, 120000);

    User.getCurrent()
      .then(function(current){
        $rootScope.currentUser = JSON.parse(angular.toJson(current));
      });

    //Necessary things that need the current user to resolve before they are gotten;
    function afterResolveUser(){
      return $q.all([
        Forum.cacheRecentPosts()
      ]);
    }

    function refreshCache() {

      //Check to see if we are online with the root variable
      if($rootScope.online){
        var promise = $q.all([
          User.cacheAvatars(),
          Forum.cacheArticles(),
        ]);

        promise
          .then(afterResolveUser)
          .then(broadcastRefresh);

        return promise;
      }
    }

    function broadcastRefresh(){
      $rootScope.$broadcast('cache-refreshed');
    }
  }

})();
