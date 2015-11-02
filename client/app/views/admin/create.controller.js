;(function() {
  'use strict';

  angular
    .module('app')
    .controller('AdminCreateController', AdminCreateController);

  AdminCreateController.$inject = ['$scope', '$timeout', '$localForage', 'readingTime'];

  function AdminCreateController($scope, $timeout, $localForage, readingTime){
    var _this = this;

    this.actionIcon = 'publish';
    this.toolTip = 'Publish Article';

    this.publishArticle = publishArticle;
    this.defaultArticle = defaultArticle;

    $localForage.getItem('newArticle')
      .then(function(data) {
        if (data)
          _this.newArticle = data;
        else
          _this.newArticle = _this.defaultArticle();
      });

    $scope.$watch('vm.newArticle.content', function(newValue){
      if (_this.newArticle) {
        var rt = readingTime.get(newValue, {
          wordsPerMinute: 180,
          format: 'value_only'
        });

        rt = (rt.minutes * 60) + rt.seconds;

        _this.newArticle.readingTime = Math.ceil(rt/60);
      }
    });

    $scope.$watch('vm.newArticle', function(){
      $localForage.setItem('newArticle', _this.newArticle);
    }, true);

    function publishArticle() {
      _this.newArticle = defaultArticle();
      _this.articleImage = false;
    }

    function defaultArticle(){
      return {
        content: '',
        readingTime: 0,
        title: '',
        category: '',
        author: '',
        imageUrl: ''
      };
    }

  }

})();
