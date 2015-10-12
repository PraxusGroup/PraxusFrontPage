;(function() {
  'use strict';

  angular
    .module('app')
    .directive('search', search);

  search.$inject = [];

  function search() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/search/search.html',
      link: link
    };

    return directive;

    function link(scope, element, attrs) {

      

    }
  }

})();
