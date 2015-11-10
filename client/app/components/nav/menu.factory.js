;(function() {
  'use strict';

  angular
    .module('app.nav')
    .factory('Menu', MenuFactory);

  MenuFactory.$inject = [];

  function MenuFactory() {

    var service = {
      activeMenuItem: getActiveMenuItem
    };

    return service;

    ////////////

    function getActiveMenuItem(menuItems, name) {

      var active = {
        id: false,
        subId: false
      };

      if(!name) return active;

      menuItems.forEach(function(item){
        if (item.name === name || item.url === name) {
          active.id = item.id;
        }

        if (item.subMenu) {
          item.subMenu.forEach(function(sub){
            if(sub.name === name || sub.url === name) {
              active.id = item.id;
              active.subId = sub.id;
            }
          });
        }
      });

      return active;

    }

  }

})();
