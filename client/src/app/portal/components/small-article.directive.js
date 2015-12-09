;(function() {
  'use strict';

  angular
    .module('app.portal')
    .directive('smallArticle', smallArticle);

  /* @ngInject */
  function smallArticle($sce, $state, Core) {
    var directive = {
      restrict: 'E',
      transclude: true,
      templateUrl: 'app/portal/components/small-article.html',
      scope: {
        story: '='
      },
      controller: controller
    };

    return directive;

    function controller($scope) {
      $scope.story.content = Core.stripContent($scope.story.content);

      Core.$localForage.getItem($scope.story.id)
        .then(function(data) {

          if (data) {
            $scope.icon = 'check';
            $scope.iconColor = '#7f93bf';
          } else {
            $scope.icon = 'new_releases';
            $scope.iconColor = '#ffc823';
          }

        });
    }

  }

})();
