;(function() {
  'use strict';

  angular
    .module('app.forum')
    .config(AppConfig);

  /**
   * Remaps all the old forum urls and links to go to forum.praxusgroup.com
   * instead of redirecting to the portal.
   */

  /* @ngInject */
  function AppConfig($stateProvider) {

    var IPBViews = {
      'main@': {
        template: '<h3 class="center">Redirecting...</h3>',
        controller: IPBController
      },
      'sidebar@': {
        controller: 'MainSidebarController',
        controllerAs: 'vm',
        templateUrl: 'app/layout/main.sidebar.html'
      }
    };

    $stateProvider
      .state({
        name: 'IPBPages',
        url: '/page*path',
        title: 'Praxus Front Page',
        views: IPBViews,
        resolve: {
          loc: function(){return 'page';}
        }
      })
      .state({
        name: 'IPBIndex',
        url: '/index*path',
        views: IPBViews,
        resolve: {
          loc: function(){return 'index';}
        }
      })
      .state({
        name: 'IPBForum',
        url: '/forum*path',
        views: IPBViews,
        resolve: {
          loc: function(){return 'forum';}
        }
      })
      .state({
        name: 'IPBTopic',
        url: '/topic*path',
        views: IPBViews,
        resolve: {
          loc: function(){return 'topic';}
        }
      })
      .state({
        name: 'IPBAwards',
        url: '/jawards*path',
        views: IPBViews,
        resolve: {
          loc: function(){return 'jawards';}
        }
      })
      .state({
        name: 'IPBCalendar',
        url: '/calendar*path',
        views: IPBViews,
        resolve: {
          loc: function(){return 'calendar';}
        }
      });
  }

  /* @ngInject */
  function IPBController($window, $stateParams, loc) {
    var path = 'http://forums.praxusgroup.com/' + loc + $stateParams.path;
    $window.location.replace(path);
  }

})();
