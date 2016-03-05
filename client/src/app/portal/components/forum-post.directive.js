;(function() {
  'use strict';

  angular
    .module('app.portal')
    .directive('forumPost', forumPost);

  /* @ngInject */
  function forumPost($window, $rootScope, $sce, User, Core, PromiseLogger) {
    var directive = {
      restrict: 'E',
      transclude: true,
      templateUrl: 'app/portal/components/forum-post.html',
      scope: {
        post: '='
      },
      controller: controller
    };

    return directive;

    function controller($scope) {
      $scope.$watch('post', function(post){
        if (post) {
          parsePosts();
        }
      });

      $scope.goToPost = function() {
        $window.location.replace(
          'http://nodebb.praxusgroup.com/topic/' + $scope.post.slug
        );
      };

      function parsePosts() {
        $scope.userImage = 'http://nodebb.praxusgroup.com' + $scope.post.teaser.user.picture;

        if($scope.post.teaser.content){
          var emails = $scope.post.teaser.content.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);

          if(emails) {
            emails.forEach(function(email){
              $scope.post.teaser.content = $scope.post.teaser.content.replace(email, generateRandomKey(email.length));
            });
          }
        }

        $scope.post.teaser.content = Core.stripContent($scope.post.teaser.content);

        if (typeof $scope.post.teaser.timestamp !== 'object') {
          $scope.post.teaser.timestamp = new Date($scope.post.teaser.timestamp);
        }

        function generateRandomKey(number) {
          var key = String();
          var values = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
          for(var i = 0; i < number; i++) {
            key += values.charAt(Math.floor(Math.random() * values.length));
          }
          return key;
        }
      }
    }

  }

})();
