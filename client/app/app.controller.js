;(function() {
  'use strict';

  angular
    .module('app')
    .controller('AppController', AppController);

  AppController.$inject = ['$rootScope', '$q', '$state', '$timeout', '$cookies', 'Members', 'Groups'];

  function AppController($rootScope, $q, $state, $timeout, $cookies, Members, Groups){
    $rootScope.$state = $state;
    $rootScope.$on('$stateChangeSuccess', generateMenu);
    var person = $cookies.getAll();

    /* TODO: Remove Bypass Cookies */
    if (!person.member_id) {
      person.member_id = 114;
    }

    person.member_id = parseInt(person.member_id);

    findPerson(person)
      .then(function(member){
        $rootScope.currentUser = JSON.parse(angular.toJson(member));

        return findGroup(member);
      })
      .then(function(group){
        $rootScope.enableAdmin = parseInt(group.gAccessCp) === 1;
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
