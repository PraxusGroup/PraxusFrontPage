//External Lib Constants

/* global md5:false, Materialize:false, swal:false */
;(function() {

  'use strict';

  angular
    .module('app.core')
    .constant('Materialize', Materialize)
    .constant('swal', swal);

})();
