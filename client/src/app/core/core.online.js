;(function() {
  'use strict';

  angular
    .module('app.core')
    .run(CoreOnline);

  /* @ngInject */
  function CoreOnline($window, $rootScope){

    $rootScope.online = $window.navigator.onLine;

    $window.addEventListener('offline', function () {
      $rootScope.$apply(function() {
        $rootScope.online = false;
      });
    }, false);

    $window.addEventListener('online', function () {
      $rootScope.$apply(function() {
        $rootScope.online = true;
      });
    }, false);

  }

})();
