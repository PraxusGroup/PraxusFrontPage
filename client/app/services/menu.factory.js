;(function() {
  'use strict';

  angular
    .module('app')
    .factory('Menu', MenuFactory);

  MenuFactory.$inject = [];

  function MenuFactory() {

    var service = {
      menuItems: getMenuItems,
      activeMenuItem: getActiveMenuItem
    };

    return service;

    ////////////

    function getActiveMenuItem(name) {

      var active = {
        id: false,
        subId: false
      };

      if(!name) return active;

      var menuItems = getMenuItems();

      menuItems.forEach(function(item){
        if (item.name === name)
          active.id = item.id;

        if (item.subMenu) {
          item.subMenu.forEach(function(sub){
            if(sub.name === name) {
              active.id = item.id;
              active.subId = sub.id;
            }

          });
        }
      });

      return active;

    }

    function getMenuItems() {
      var menuItems = [];

      menuItems.push({
        id: 1,
        name: 'main',
        text: 'Front Page'
      });

      menuItems.push({
        id: 2,
        name: 'forum',
        text: 'Forum'
      });

      menuItems.push({
        id: 3,
        name: 'about',
        text: 'About Us'
      });

      menuItems.push({
        id: 4,
        name: 'calendar',
        text: 'Calendar'
      });

      menuItems.push({
        id: 5,
        name: 'awards',
        text: 'Awards'
      });

      menuItems.push({
        id: 6,
        name: 'join',
        text: 'Join Us'
      });

      return menuItems;

    }

  }

})();
