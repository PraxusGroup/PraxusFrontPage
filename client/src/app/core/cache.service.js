(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('Cache', Cache);

  /* @ngInject */
  function Cache($rootScope, $q, User, Forum) {
    var service = {
      refreshCache: refreshCache
    };

    return service;

    function refreshCache() {

      //Check to see if we are online with the root variable
      if($rootScope.online){
        var currentPromise = User.getCurrent();

        currentPromise
          .then(function(current){
            $rootScope.currentUser = JSON.parse(angular.toJson(current));
          });

        var promise = $q.all([
          currentPromise,
          User.cacheAvatars(),
          Forum.cacheArticles()
        ]);

        promise
          .then(afterResolveUser)
          .then(broadcastRefresh);

        return promise;
      }

      //Necessary things that need the current user to resolve before they are gotten;
      function afterResolveUser(){
        return $q.all([
          Forum.cacheRecentPosts()
        ]);
      }

      function broadcastRefresh(){
        $rootScope.$broadcast('cache-refreshed');
      }
    }
  }
})();
