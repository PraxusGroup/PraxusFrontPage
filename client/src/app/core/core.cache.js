;(function() {
  'use strict';

  angular
    .module('app.core')
    .run(CoreCache);

  /* @ngInject */
  function CoreCache($rootScope, $interval, $timeout, $q, User, Forum, createChangeStream){

    //Every 10 minuets refresh cache
    $interval(refreshCache, 600000);

    createEventStream('/api/Articles/change-stream?_format=event-stream');

    User.getCurrent()
      .then(function(current){
        $rootScope.currentUser = JSON.parse(angular.toJson(current));
      });

    function createEventStream(url){
      var src     = new EventSource(url);
      var changes = createChangeStream(src);

      changes.on('data', function(msg) {
        $timeout(refreshCache, 250);
      });
    }

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
