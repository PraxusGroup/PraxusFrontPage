(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('Core', CoreService);

  /* @ngInject */
  function CoreService() {
    var service = {
      syncSet: syncSet
    };

    return service;

    function syncSet(scope, selector, comparison) {

      if(angular.isArray(scope[selector])) {
        comparison.forEach(function(compare){
          var dupe = false;

          if (scope[selector].length > 0){
            scope[selector].forEach(function(original){
              if (compare.id === original.id) {
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
              if (compare.id === original.id) {
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
