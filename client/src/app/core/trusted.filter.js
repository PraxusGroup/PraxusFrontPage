
;(function() {
  'use strict';

  angular
    .module('app.core')
    .filter('trustAsHtml', TrustHtml);

  /* @ngInject */
  function TrustHtml($sce) {
    return function(text) {
      if (!text.$$unwrapTrustedValue) {
        return $sce.trustAsHtml(text);
      } else {
        return text;
      }
    };
  }

})();
