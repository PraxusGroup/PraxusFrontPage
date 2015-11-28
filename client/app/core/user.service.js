;(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('User', UserFactory);

  UserFactory.$inject = ['$rootScope'];

  function UserFactory($rootScope) {

    var service = {
      getCurrent: getCurrent
    };

    return service;

    ////////////

    function getCurrent() {

      return $rootScope.currentUser;

    }

  }

})();
