;(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('distort', distort);

  /* @ngInject */
  function distort() {
    var directive = {
      restrict: 'A',
      scope: {
        options: '='
      },
      link: link
    };

    return directive;

    function link(scope, element) {

      scope.distort = new logosDistort(element, scope.options);

      element.on('$destroy', function() {
        scope.distort.destroy();
      });
    }

  }

})();
