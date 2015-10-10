;(function() {
  'use strict';

  angular
    .module('app.nav')
    .directive('sideNav', sideNav);

  sideNav.$inject = ['$rootScope', '$timeout', 'Menu'];

  function sideNav($rootScope, $timeout, Menu) {
    var directive = {
      replace: true,
      restrict: 'E',
      templateUrl: 'app/components/nav/nav.html',
      controller: controller,
      link: link
    };

    return directive;

    function controller($scope) {
      $scope.menu = Menu.menuItems();

      $scope.resetSVG = function(){};

      $scope.resetFunction = function(){
        $scope.svgLogo
          .stop();

        $scope.resetSVG = function(){};

        $scope.svgLogo
          .el.classList.remove('finished');

        $timeout(function(){
          $scope.svgLogo
            .el.classList.remove('remove-animation');

          $scope.svgLogo
            .reset();
          $scope.svgLogo
            .play(1);

          $timeout(function(){
            $scope.svgLogo
              .el.classList.add('finished');

            $timeout(function(){
              $scope.svgLogo
                .el.classList.add('remove-animation');

              $scope.resetSVG = $scope.resetFunction;
            }, 7000);
          }, 500);
        }, 1000);
      };

      $rootScope.$on('$stateChangeSuccess', generateMenu);

      function generateMenu(event, toState, toParams, fromState, fromParams){
        $scope.pageTitle = toState.title;
        $scope.navColor = toState.color;
        $scope.active = Menu.activeMenuItem(toState.name);
        $rootScope.bodyColor = toState.bodyColor || '#e2e4e5';
      }
    }

    function link(scope, element, attrs) {
      scope.svgLogo = new Vivus('svg-logo', {
        type: 'scenario',
        duration: 1000,
        pathTimingFunction: Vivus.EASE,
        animTimingFunction: Vivus.EASE_OUT,
        onReady:function (obj) {
          obj.el.classList.add('finished');

          $timeout(function(){
            obj.el.classList.add('remove-animation');

            scope.resetSVG = scope.resetFunction;
          }, 8000);
        }
      });
    }
  }

})();
