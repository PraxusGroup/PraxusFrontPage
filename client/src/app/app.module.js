;(function() {
  'use strict';

  angular
    .module('app', [
      /* Shared Modules */
      'app.core',
      'app.widgets',
      /* Feature Areas */
      'app.layout',
      'app.portal',
      'app.article',
      'app.admin',
      'app.forum'
    ]);

})();
