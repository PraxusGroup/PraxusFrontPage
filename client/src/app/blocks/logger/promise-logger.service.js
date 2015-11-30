;(function() {
  'use strict';

  angular
      .module('blocks.logger')
      .factory('PromiseLogger', PromiseLogger);

  PromiseLogger.$inject = ['logger', '$q'];

  function PromiseLogger(logger, $q) {
    var service = {
      showToasts: logger.showToasts,

      // List of promise log handers
      promiseError: promiseError,

      // bypass enhanced promise logger for non promise fallbacks
      error:   logger.error,
      info:    logger.info,
      success: logger.success,
      warning: logger.warning,
      log:     logger.log
    };

    return service;
    /////////////////////

    function promiseError(err) {
      logger.error(err);

      return $q(function(){return null;});
    }
  }
}());
