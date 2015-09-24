;(function() {
  'use strict';

  angular
    .module('app')
    .controller('AppController', AppController);

  AppController.$inject = ['$rootScope', '$state', '$timeout', 'Menu'];

  function AppController($rootScope, $state, $timeout, Menu){
    var _this = this;
    this.resetSVG = function(){};

    var resetFunction = function(){
      _this.svgLogo
        .stop();

      _this.resetSVG = function(){};

      _this.svgLogo
        .el.classList.remove('finished');

      $timeout(function(){
        _this.svgLogo
          .el.classList.remove('remove-animation');

        _this.svgLogo
          .reset();
        _this.svgLogo
          .play(1);

        $timeout(function(){
          _this.svgLogo
            .el.classList.add('finished');

          $timeout(function(){
            _this.svgLogo
              .el.classList.add('remove-animation');

            _this.resetSVG = resetFunction;
          }, 8000);
        }, 500);
      }, 1000);
    };

    this.svgLogo = new Vivus('svg-logo', {
      type: 'scenario',
      duration: 1000,
      pathTimingFunction: Vivus.EASE,
			animTimingFunction: Vivus.EASE_OUT,
      onReady:function (obj) {
        obj.el.classList.add('finished');

        $timeout(function(){
          obj.el.classList.add('remove-animation');

          _this.resetSVG = resetFunction;
        }, 8000);
      }
    });

    this.menu = Menu.menuItems();

    $rootScope.$on('$stateChangeSuccess', generateMenu);

    function generateMenu(event, toState, toParams, fromState, fromParams){
      _this.pageTitle = toState.title;
      _this.navColor = toState.color;
      _this.active = Menu.activeMenuItem(toState.name);
    }

  }

})();
