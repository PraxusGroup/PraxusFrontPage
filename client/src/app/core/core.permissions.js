;(function() {
  'use strict';

  angular
    .module('app.core')
    .run(Permissions);

  /* @ngInject */
  function Permissions($q, $localForage, Permission){
    // Define anonymous role
    Permission
      .defineRole('guest', function () {
        var deferred = $q.defer();

        $localForage.getItem('currentUser')
          .then(function(res){

            if (res) {
              deferred.reject();
            } else {
              deferred.resolve();
            }
          });

        return deferred.promise;
      })
      .defineRole('member', function () {
        var deferred = $q.defer();

        $localForage.getItem('currentUser')
          .then(function(res){

            if (res) {
              deferred.resolve();
            } else {
              deferred.reject();
            }

          });

        return deferred.promise;
      })
      .defineRole('mod', function () {
        var deferred = $q.defer();

        $localForage.getItem('currentUser')
          .then(function(res){

            if (res && res.group.gIsSupmod === 1) {
              deferred.resolve();
            } else {
              deferred.reject();
            }

          });

        return deferred.promise;
      })
      .defineRole('admin', function () {
        var deferred = $q.defer();

        $localForage.getItem('currentUser')
          .then(function(res){

            if (res && res.group.gAccessCp === 1) {
              deferred.resolve();
            } else {
              deferred.reject();
            }

          });

        return deferred.promise;
      });


  }

})();
