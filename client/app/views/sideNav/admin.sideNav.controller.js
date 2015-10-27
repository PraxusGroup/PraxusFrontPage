;(function() {
  'use strict';

  angular
    .module('app')
    .controller('AdminNavController', AdminNavController);

  AdminNavController.$inject = ['$rootScope', '$state', 'Menu'];

  function AdminNavController($rootScope, $state, Menu){
    var _this = this;

    this.menu = [
      {
        id: 1,
        name: 'admin',
        text: 'Style Guide'
      },
      {
        id: 3,
        name: false,
        text: 'Elements',
        subMenu: [
          {
            id: 4,
            name: 'admin1',
            text: 'Item 1'
          },
          {
            id: 5,
            name: 'admin2',
            text: 'Item 2'
          }
        ]
      }
    ];

    generateMenu(null, $state.current);

    $rootScope.$on('$stateChangeSuccess', generateMenu);

    function generateMenu(event, toState){
      _this.pageTitle = toState.title;
      _this.navColor = toState.color;
      _this.active = Menu.activeMenuItem(_this.menu, toState.name);
      $rootScope.bodyColor = toState.bodyColor || '#e2e4e5';
    }
  }

})();
