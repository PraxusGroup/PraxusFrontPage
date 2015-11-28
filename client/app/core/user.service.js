;(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('User', UserFactory);

  UserFactory.$inject = [];

  function UserFactory() {

    var service = {
      getCurrentUser: getCurrentUser
    };

    return service;

    ////////////

    function getCurrentUser() {

      return true;

    }

  }

})();
