;(function() {
  'use strict';

  angular
    .module('app.portal')
    .directive('searchBar', search);

  /* @ngInject */
  function search(User, $localForage, PromiseLogger) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/portal/components/search.html',
      scope: {
        search: '=ngModel',
        user: '='
      },
      require: 'ngModel',
      controller: controller,
      link: link
    };

    return directive;

    function controller($scope) {

      $scope.loginUser = {};

      $scope.logout = function() {
        User.logout();
      };

      $scope.openLoginModal = function() {
        $('#loginModal').openModal();
      };

      $scope.login = function() {
        User.login($scope.loginUser)
          .then(function(res){
            PromiseLogger.success(res);

            $('#loginModal').closeModal();
          })
          .catch(PromiseLogger.promiseError);
      };

      $scope.searchIcon = 'search';
      $scope.searchAnimationOptions = {
        rotation: 'counterclock'
      };
      $scope.defaultAvatar = User.getDefaultPhoto();

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

      var search      = $(element.find('#searchIcon'));
      var topNav      = $(element.find('.top-nav'));
      var loginHide   = $(element.find('#loginHide'));
      var searchBar   = $(element.find('#top-search'));
      var profileArea = $(element.find('.profile-area'));
      var closed    = true;
      var options   = {
        duration: 600,
        easing: [0.620, -0.005, 0.260, 0.995]
      };

      $localForage.getItem('previousLogin')
        .then(function(res){
          if (res) {
            scope.pastLogin = true;
          }
        });

      loginHide.velocity({ width: '0' }, {
        duration: 600,
        delay: 3200,
        easing: [0.620, -0.005, 0.260, 0.995]
      });

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
        searchBar.velocity(  { width: '100%' }, options);
        profileArea.velocity(  { opacity: '0' }, options);
      }

      function animateClose(e) {
        searchBar.velocity(  { width: '0'}, options);

        profileArea.velocity(  { opacity: '1' }, options);

        //Reset search when search is closed
        scope.search = '';
        scope.$apply();
      }

    }
  }

})();
