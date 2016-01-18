;(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('MainSidebarController', MainSidebarController);

  /* @ngInject */
  function MainSidebarController($rootScope, $timeout, $state, Menu){
    var _this = this;

    _this.menu = [
      {
        id: 1,
        name: 'portal',
        text: 'Front Page'
      },
      {
        id: 2,
        name: 'forum',
        text: 'Forum',
        url: 'http://nodebb.praxusgroup.com'
      },
      {
        id: 3,
        name: 'about',
        text: 'About Us',
        url: 'http://wiki.praxusgroup.com'
      },
      {
        id: 4,
        name: 'awards',
        text: 'Awards',
        url: 'http://nodebb.praxusgroup.com/awards'
      },
      {
        id: 5,
        name: 'join',
        text: 'Join Us',
        url: 'http://nodebb.praxusgroup.com/category/5/membership-join-us-here'
      }
    ];

    generateMenu(null, $state.current);

    $rootScope.$on('$stateChangeSuccess', generateMenu);

    function generateMenu(event, toState){
      $rootScope.pageTitle = toState.title;
      _this.navColor = toState.color;
      _this.active = Menu.activeMenuItem(_this.menu, toState.name);
      $rootScope.bodyColor = toState.bodyColor || '#e2e4e5';
    }
  }

})();
