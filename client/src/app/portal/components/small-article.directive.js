;(function() {
  'use strict';

  angular
    .module('app.portal')
    .directive('smallArticle', smallArticle);

  /* @ngInject */
  function smallArticle($sce, $state, $localForage) {
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

      $localForage.getItem($scope.story.id)
        .then(function(data) {

          if (data) {
            $scope.icon = 'check';
            $scope.iconColor = '#7f93bf';
          } else {
            $scope.icon = 'new_releases';
            $scope.iconColor = '#ffc823';
          }

        });

      $scope.goToArticle = function(id) {
        $state.go('article', {id: id});
      };
    }

  }

})();
