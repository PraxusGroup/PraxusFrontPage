(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('Core', CoreService);

  /* @ngInject */
  function CoreService($localForage) {
    var service = {
      getGuid: getGuid,
      clone:   clone,
      $localForage: $localForage,
      authKey: '880ea6a14ea49e853634fbdc5015a024'
    };

    return service;

    function clone(obj) {
      return JSON.parse(angular.toJson(obj));
    }

    function getGuid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }

      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }
  }
})();
