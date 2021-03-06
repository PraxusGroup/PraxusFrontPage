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
      stripContent: stripContent,
      replaceAll: replaceAll
    };

    return service;

    function stripContent(content) {
      var temp = content;

      temp = replaceAll(temp, /<iframe[^>]*>/g, '');
      temp = replaceAll(temp, /<img[^>]*>/g, '');

      return temp;
    }

    function replaceAll(str, find, replace) {
      return str.replace(find, replace);
    }

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
