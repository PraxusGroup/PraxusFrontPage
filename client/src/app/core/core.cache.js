;(function() {
  'use strict';

  angular
    .module('app.core')
    .run(AppCaching);

  /* @ngInject */
  function AppCaching($rootScope, $interval, $timeout, User, Cache, createChangeStream){

    var eventStream;

    User.getCurrent()
      .then(function(current) {
        $rootScope.currentUser = JSON.parse(angular.toJson(current));
      });

    //Every 10 minuets refresh cache due to non-LB mysql changes via ipboards
    $interval(Cache.refreshCache, 600000);
    $timeout(Cache.refreshCache, 5000);
    $rootScope.$on('request-cache-refreshed', Cache.refreshCache);

    checkOnlineEvents();

    function checkOnlineEvents() {
      if ($rootScope.online && !eventStream) {
        eventStream = createEventStream('/api/Articles/change-stream?_format=event-stream');
      } else if (!$rootScope.online && eventStream) {
        eventStream.close();
        eventStream = false;
        $timeout(checkOnlineEvents, 120000);
      } else {
        $timeout(checkOnlineEvents, 120000);
      }
    }

    function createEventStream(url) {
      var src     = new EventSource(url);
      var changes = createChangeStream(src);

      changes.on('data', function(msg) {
        $timeout(Cache.refreshCache, 250);
      });

      return src;
    }
  }
})();
