;(function() {
  'use strict';

  angular
    .module('app.core')
    .run(CoreCache);

  CoreCache.$inject = ['User'];

  function CoreCache(User){
    User.cacheAvatars();
  }

})();
