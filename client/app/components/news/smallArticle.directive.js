;(function() {
  'use strict';

  angular
    .module('app.news')
    .directive('smallArticle', smallArticle);

  smallArticle.$inject = ['$sce', '$state', '$localForage'];

  function smallArticle($sce, $state, $localForage) {
    var directive = {
      restrict: 'E',
      transclude: true,
      templateUrl: 'app/components/news/smallArticle.html',
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

      $scope.story.content = $sce.trustAsHtml($scope.story.content);
      $scope.goToArticle = function(id) {
        $state.go('article', {id: id});
      };
    }

  }

})();
