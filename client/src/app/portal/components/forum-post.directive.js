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
      $scope.$watch('post', function(posts){
        if (posts && posts.post) {
          parsePosts();
        }
      });

      $scope.goToPost = function(topicId, postId) {
        $window.location.href = 'http://praxusgroup.com/index.php?showtopic=' +
          topicId + '#entry' + postId;
      };

      function parsePosts() {
        User.getAvatar($scope.post.authorId)
          .then(function(res){
            $scope.post.authorPhoto = res;
          });

        if($scope.post.post.match){
          var emails = $scope.post.post.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);

          if(emails) {
            emails.forEach(function(email){
              $scope.post.post = $scope.post.post.replace(email, generateRandomKey(email.length));
            });
          }
        }

        $scope.post.post = Core.stripContent($scope.post.post);
        $scope.post.postDate = new Date($scope.post.postDate * 1000);

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
