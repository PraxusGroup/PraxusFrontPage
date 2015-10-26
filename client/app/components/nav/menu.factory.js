;(function() {
  'use strict';

  angular
    .module('app.nav')
    .factory('Menu', MenuFactory);

  MenuFactory.$inject = [];

  function MenuFactory() {

    var service = {
      activateMenuItem: getActiveMenuItem
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
        if (item.name === name) {
          active.id = item.id;
        }

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

  }

})();
