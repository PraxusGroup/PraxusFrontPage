;(function() {
  'use strict';

  angular
    .module('app.core')
    .run(AppCaching);

  /* @ngInject */
  function AppCaching($rootScope, $interval, $timeout, User, Cache, createChangeStream){

    User.getCurrent()
      .then(function(current) {
        $rootScope.currentUser = JSON.parse(angular.toJson(current));
      });

    //Every 10 minuets refresh cache due to non-LB mysql changes via ipboards
    $interval(Cache.refreshCache, 600000);
    $timeout(Cache.refreshCache, 5000);
    $rootScope.$on('request-cache-refreshed', Cache.refreshCache);

    createEventStream('/api/Articles/change-stream?_format=event-stream');

    function createEventStream(url) {
      var src     = new EventSource(url);
      var changes = createChangeStream(src);

      changes.on('data', function(msg) {
        $timeout(Cache.refreshCache, 250);
      });
    }
  }
})();
