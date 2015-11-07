;(function() {
  'use strict';

  angular
    .module('app.news')
    .directive('mainArticle', mainArticle);

  mainArticle.$inject = ['$sce', '$state'];

  function mainArticle($sce, $state) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/news/mainArticle.html',
      link: link,
      scope: {
        story: '='
      },
      controller: controller
    };

    return directive;

    function controller($scope){
      $scope.story.content = $sce.trustAsHtml($scope.story.content);
      $scope.goToArticle = function(id) {
        $state.go('article', {id: id});
      };
    }

    function link(scope, element) {

      var content = $(element.find('.card-content'));
      var image   = $(element.find('.card-image'));
      var card    = $(element.find('.card'));
      var options = {
        duration: 600,
        queue: false,
        easing: [0.620, -0.005, 0.260, 0.995]
      };

      content.on('mouseenter', animateOpen);
      card.on('mouseleave', animateClose);

      function animateOpen(e) {
        content.velocity( { height: '13em' }, options);
        image.velocity(   { height: '27em' }, options);
      }

      function animateClose(e) {
        content.velocity( { height: '6em' }, options);
        image.velocity(   { height: '34em' }, options);
      }

    }
  }

})();
