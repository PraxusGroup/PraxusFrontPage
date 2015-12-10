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
        url: 'http://praxusgroup.com/index'
      },
      {
        id: 3,
        name: 'about',
        text: 'About Us',
        url: 'http://wiki.praxusgroup.com'
      },
      {
        id: 4,
        name: 'calendar',
        text: 'Calendar',
        url: 'http://praxusgroup.com/calendar/'
      },
      {
        id: 5,
        name: 'awards',
        text: 'Awards',
        url: 'http://praxusgroup.com/jawards/'
      },
      {
        id: 6,
        name: 'join',
        text: 'Join Us',
        url: 'http://praxusgroup.com/index.php/forum/11-recruitment/'
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
