;(function() {
  'use strict';

  angular
    .module('app')
    .controller('AppController', AppController);

  AppController.$inject = [
    '$rootScope', '$q', '$state', '$timeout', '$cookies',
    'Permission',
    'Members', 'Groups'];

  function AppController($rootScope, $q, $state, $timeout, $cookies, Permission, Members, Groups){
    $rootScope.$state = $state;
    $rootScope.$on('$stateChangeSuccess', generateMenu);
    var person = $cookies.getAll();

    /* TODO: Remove Bypass Cookies */
    if (!person.member_id) {
      person.member_id = 114;
    }

    person.member_id = parseInt(person.member_id);

    var user = findPerson(person);
    var userDefered = $q.defer();
    var userPromise = userDefered.promise;

    user
      .then(function(member){
        $rootScope.currentUser = JSON.parse(angular.toJson(member));

        return findGroup(member);
      })
      .catch(function(err){
        $rootScope.currentUser = false;
        //return $q(function(){return null;});
      })
      .then(function(group){
        $rootScope.group = group;
        $rootScope.enableAdmin = group && parseInt(group.gAccessCp) === 1;
        userDefered.resolve();
      });

    Permission.defineRole('guest', function () {
      var deferred = $q.defer();

      user
        .then(function(){
          if(!$rootScope.currentUser) {
            deferred.resolve();
          } else {
            deferred.reject();
          }
        });

      return deferred.promise;
    });

    Permission.defineRole('user', function () {
      var deferred = $q.defer();

      userPromise
        .then(function(){
          if($rootScope.currentUser) {
            deferred.resolve();
          } else {
            deferred.reject();
          }
        });

      return deferred.promise;
    });

    Permission.defineRole('mod', function () {
      var deferred = $q.defer();

      userPromise
        .then(function(){
          if($rootScope.group && parseInt($rootScope.group.gIsSupmod === 1)) {
            deferred.resolve();
          } else {
            deferred.reject();
          }
        });

      return deferred.promise;
    });

    Permission.defineRole('admin', function () {
      var deferred = $q.defer();

      userPromise
        .then(function(){
          if($rootScope.group && parseInt($rootScope.group.gAccessCp) === 1) {
            deferred.resolve();
          } else {
            deferred.reject();
          }
        });

      return deferred.promise;
    });

    function findGroup(member){
      return Groups.findById(
        {
          id: member.memberGroupId,
          filter: {
            fields:
              [
                'gIsSupmod',
                'gAccessCp'
              ]
          }
        }

      ).$promise;
    }

    function findPerson(member) {

      return Members.findById(
        {
          id: member.member_id,
          filter: {
            fields:
              [
                'memberId',
                'memberLoginKey',
                'membersDisplayName',
                'memberGroupId'
              ]
          }
        }

      ).$promise;

    }

    function generateMenu(event, toState){
      $rootScope.bodyColor = toState.bodyColor || '#e2e4e5';
    }
  }

})();
