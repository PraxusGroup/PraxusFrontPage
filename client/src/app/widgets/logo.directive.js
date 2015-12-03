;(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('praxusLogo', praxusLogo);

  /* @ngInject */
  function praxusLogo($timeout, $state) {
    var directive = {
      replace: true,
      restrict: 'E',
      templateUrl: 'app/widgets/logo.html',
      controller: controller,
      link: link
    };

    return directive;

    function controller($scope) {

      $scope.goState = function() {
        if(!$state.is('portal')) {
          $state.go('portal');
        }
      };

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
    }

    function link(scope, element) {
      element[0].id = Math.random()*10000 + Math.random()*10000;

      scope.svgLogo = new Vivus(element[0], {
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
