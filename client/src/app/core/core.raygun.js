;(function() {
  'use strict';

  angular
    .module('app.core')
    .run(Raygun);

  /* @ngInject */
  function Raygun(rg4js){

    rg4js('apiKey', 'B38hKNps0tlNz0MKlJtROQ==');
    rg4js('attach', true);
    rg4js('enableCrashReporting', true);
    rg4js('enablePulse', true);

  }

})();
