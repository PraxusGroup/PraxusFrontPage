;(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('AdminNavController', AdminNavController);

  /* @ngInject */
  function AdminNavController($rootScope, $timeout, $state, Menu){
    var _this = this;

    this.menu = [
      {
        id: 1,
        name: 'portal',
        text: 'Portal'
      },
      {
        id: 2,
        name: false,
        text: 'Articles',
        subMenu: [
          {
            id: 3,
            name: '/admin/articles/list',
            url: '/articles/list',
            text: 'List View'
          },
          {
            id: 4,
            name: '/admin/articles/create',
            url: '/articles/create',
            text: 'Create New'
          }
        ]
      }
    ];

    generateMenu(null, $state.current);

    $rootScope.$on('$stateChangeSuccess', generateMenu);

    function generateMenu(event, toState){
      $rootScope.pageTitle = toState.title;
      _this.navColor = toState.color;
      _this.active = Menu.activeMenuItem(_this.menu, toState.url);
    }
  }

})();
