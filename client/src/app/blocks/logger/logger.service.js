;(function() {
  'use strict';

  angular
      .module('blocks.logger')
      .factory('logger', logger);

  logger.$inject = ['$log'];

  function logger($log) {
    var service = {
      showToasts: true,

      error   : error,
      info    : info,
      success : success,
      warning : warning,

      // straight to console; bypass toast
      log     : $log.log
    };

    return service;
    /////////////////////

    function error(message, data) {
      Materialize.toast(message, 3000, 'toast-error');
      $log.error('Error: ' + message, data);
    }

    function info(message, data) {
      Materialize.toast(message, 3000, 'toast-info');
      $log.info('Info: ' + message, data);
    }

    function success(message, data) {
      Materialize.toast(message, 3000, 'toast-success');
      $log.info('Success: ' + message, data);
    }

    function warning(message, data) {
      Materialize.toast(message, 3000, 'toast-warning');
      $log.warn('Warning: ' + message, data);
    }
  }
}());