;(function() {
  'use strict';

  angular
    .module('app.news')
    .directive('mainArticle', mainArticle);

  mainArticle.$inject = [];

  function mainArticle() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/news/mainArticle.html',
      link: link
    };

    return directive;

    function link(scope, element, attrs) {

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
        content.velocity( { height: '30em' }, options);
        image.velocity(   { height: '10em' }, options);
      }

      function animateClose(e) {
        content.velocity( { height: '10em' }, options);
        image.velocity(   { height: '30em' }, options);
      }

    }
  }

})();
