;(function() {
  'use strict';

  angular
    .module('app.news')
    .directive('forumPost', forumPost);

  forumPost.$inject = ['$rootScope', '$sce'];

  function forumPost($rootScope, $sce) {
    var directive = {
      restrict: 'E',
      transclude: true,
      templateUrl: 'app/components/forum/forumPost.html',
      scope: {
        post: '='
      },
      controller: controller
    };

    return directive;

    function controller($scope) {
      $scope.post.authorPhoto = $rootScope.memberPhotos[$scope.post.authorId];

      var emails = $scope.post.post.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);

      if(emails) {
        emails.forEach(function(email){
          $scope.post.post = $scope.post.post.replace(email, generateRandomKey(email.length));
        });
      }

      $scope.post.post = $sce.trustAsHtml($scope.post.post);
      $scope.post.topicTitle = $sce.trustAsHtml($scope.post.topicTitle);
      $scope.post.authorName = $sce.trustAsHtml($scope.post.authorName);
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

})();
