//External Lib Constants

/* global rg4js:false, md5:false, Materialize:false, swal:false */
;(function() {

  'use strict';

  angular
    .module('app.core')
    .constant('rg4js', rg4js)
    .constant('md5', md5)
    .constant('Materialize', Materialize)
    .constant('swal', swal);

})();
