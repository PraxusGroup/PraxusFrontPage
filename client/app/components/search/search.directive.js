;(function() {
  'use strict';

  angular
    .module('app')
    .directive('searchBar', search);

  search.$inject = [];

  function search() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/search/search.html',
      scope: {
        search: '=ngModel'
      },
      require: 'ngModel',
      controller: controller,
      link: link
    };

    return directive;

    function controller($scope) {
      $scope.searchIcon = 'search';
      $scope.searchAnimationOptions = {
        rotation: 'counterclock'
      };

      $scope.toggleIcons = function() {
        if ($scope.searchIcon === 'search') {
          $scope.searchIcon = 'arrow_back';
          $scope.searchAnimationOptions.rotation = 'clock';
        } else {
          $scope.searchIcon = 'search';
          $scope.searchAnimationOptions.rotation = 'counterclock';
        }
      };
    }

    function link(scope, element, attrs) {

      var search    = $(element.find('#searchIcon'));
      var topNav    = $(element.find('.top-nav'));
      var searchBar = $(element.find('#top-search'));
      var closed    = true;
      var options   = {
        duration: 600,
        easing: [0.620, -0.005, 0.260, 0.995]
      };

      search.on('click', animate);

      function animate(e) {
        if (closed) {
          animateOpen(e);
          closed = false;
        } else {
          animateClose(e);
          closed = true;
        }
      }

      function animateOpen(e) {
        searchBar.velocity( { width: '100%' }, options);
        topNav.velocity(    { width: '0'}, options);
      }

      function animateClose(e) {
        topNav.velocity(    { width: '100%'}, options);
        searchBar.velocity( { width: '0'}, options);
      }

    }
  }

})();
