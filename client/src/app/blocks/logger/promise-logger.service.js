;(function() {
  'use strict';

  angular
      .module('blocks.logger')
      .factory('PromiseLogger', PromiseLogger);

  /* @ngInject */
  function PromiseLogger(logger, $q) {
    var service = {
      showToasts: logger.showToasts,

      // List of promise log handers
      promiseError: promiseError,
      swalSuccess:  swalSuccess,
      swalConfirm:  swalConfirm,

      // bypass enhanced promise logger for non promise fallbacks
      error:   logger.error,
      info:    logger.info,
      success: logger.success,
      warning: logger.warning,
      log:     logger.log
    };

    return service;
    /////////////////////

    function promiseError(text, data) {
      logger.error(text, data);

      return $q(function(){return null;});
    }

    function swalSuccess(title, text) {
      return swal(title, text, 'success');
    }

    function swalConfirm(title, text, successFn) {
      swal({
        title: title,
        text: text,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ffc823',
        confirmButtonText: 'Yes!',
        closeOnConfirm: true
      }, successFn);
    }
  }
}());
