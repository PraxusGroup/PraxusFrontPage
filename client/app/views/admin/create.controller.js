;(function() {
  'use strict';

  angular
    .module('app')
    .controller('AdminCreateController', AdminCreateController);

  AdminCreateController.$inject = ['$scope', '$localForage', 'readingTime'];

  function AdminCreateController($scope, $localForage, readingTime){
    var _this = this;

    this.actionIcon = 'publish';
    this.toolTip = 'Publish Article';

    this.newArticle = {
      content: '',
      readingTime: '',
      title: '',
      category: '',
      author: ''
    };

    $localForage.getItem('newArticle').then(function(data) {
      if (data) {
        _this.newArticle = data;
      }
    });

    this.newArticle.readingTime = readingTime.get(this.newArticle.content, {
      wordsPerMinute: 210,
      format: 'value_only'
    });

    $scope.$watch('vm.newArticle.content', function(){
      var rt = readingTime.get(_this.newArticle.content, {
        wordsPerMinute: 180,
        format: 'value_only'
      });

      rt = (rt.minutes * 60) + rt.seconds;

      _this.newArticle.readingTime = Math.ceil(rt/60);
    });

    $scope.$watch('vm.newArticle', function(){
      $localForage.setItem('newArticle', _this.newArticle);
    }, true);

  }

})();
