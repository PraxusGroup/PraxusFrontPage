;(function() {
  'use strict';

  angular
    .module('app.news')
    .directive('forumPost', forumPost);

  forumPost.$inject = [];

  function forumPost() {
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

    }

  }

})();
