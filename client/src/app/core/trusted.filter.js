
;(function() {
  'use strict';

  angular
    .module('app.core')
    .filter('trustAsHtml', TrustHtml);

  /* @ngInject */
  function TrustHtml($sce) {
    return function(text) {
      if (!text.$$unwrapTrustedValue && typeof text === 'string') {
        try {
          text = $sce.trustAsHtml(text);

          return text;
        } catch(e) {
          return text;
        }
      } else {
        return text;
      }
    };
  }

})();
