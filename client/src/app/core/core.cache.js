;(function() {
  'use strict';

  angular
    .module('app.core')
    .run(CoreCache);

  CoreCache.$inject = ['$rootScope', 'User'];

  function CoreCache($rootScope, User){
    User.cacheAvatars();
    User.cacheCurrent()
      .then(function(current){
        $rootScope.currentUser = JSON.parse(angular.toJson(current));
      });
  }

})();
