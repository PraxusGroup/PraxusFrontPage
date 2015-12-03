(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('Core', CoreService);

  /* @ngInject */
  function CoreService() {
    var service = {
      syncSet: syncSet,
      getGuid: getGuid
    };

    return service;

    function getGuid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }

      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }

    function syncSet(scope, selector, comparison, attribute) {

      if(!attribute) {
        attribute = 'id';
      }

      if(!angular.isArray(comparison)) return;

      if(angular.isArray(scope[selector])) {
        comparison.forEach(function(compare){
          var dupe = false;

          if (scope[selector].length > 0){
            scope[selector].forEach(function(original){
              if (compare[attribute] === original[attribute]) {
                dupe = true;
              }
            });
          }

          if (!dupe) {
            scope[selector].push(compare);
          }
        });

        var dead = [];

        scope[selector].forEach(function(original, index){
          var dupe = false;

          if (comparison.length > 0){
            comparison.forEach(function(compare){
              if (compare[attribute] === original[attribute]) {
                dupe = true;
              }
            });

            if (!dupe) {
              dead.push(index);
            }
          }
        });

        dead.forEach(function(index){
          scope[selector].splice(index, 1);
        });

      } else {
        scope[selector] = comparison;
      }
    }
  }
})();
