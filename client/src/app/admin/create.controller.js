;(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('AdminCreateController', AdminCreateController);

  /* @ngInject */
  function AdminCreateController($rootScope, $scope, $timeout, $q,
    $localForage, Articles, Upload, Core, PromiseLogger, Admin){

    var _this = this;

    this.actionIcon = 'publish';
    this.toolTip = 'Publish Article';

    this.publishArticle = publishArticle;
    this.defaultArticle = defaultArticle;
    this.clearArticle   = clearArticle;

    $localForage.getItem('newArticle')
      .then(function(data) {
        if (data)
          _this.newArticle = data;
        else
          _this.newArticle = _this.defaultArticle();
      });

    $scope.$watch('vm.newArticle.content', function(newValue){
      if(_this.newArticle){
        _this.newArticle.readingTime = Admin.getReadingTime(newValue);
      }
    });

    $scope.$watch('vm.newArticle', function(){
      $localForage.setItem('newArticle', _this.newArticle);
    }, true);

    function publishArticle() {
      return Admin.verifyArticle(_this.newArticle, _this.articleImage)
        .catch(PromiseLogger.promiseError)
        .then(function(){
          return $q.resolve(_this.articleImage);
        })
        .then(Admin.renameImage)
        .then(handleImage)
        .then(Admin.uploadImage)
        .then(createArticle, function(err){
          PromiseLogger.promiseError('Error uploading image', err);
        })
        .then(function(res){
          if (res.error) {
            return PromiseLogger.promiseError('Error publishing article', res.error);
          }

          return $q.resolve(res);
        })
        .then(function(res){
          _this.newArticle = defaultArticle();
          _this.articleImage = false;
          PromiseLogger.swalSuccess('Published Article', 'Successfully published new article');
        });
    }

    function clearArticle() {
      swal({
        title: 'Are you sure?',
        text: 'Do you want to clear all article fields?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ffc823',
        confirmButtonText: 'Yes, clear all!',
        closeOnConfirm: true
      }, function(){
        _this.newArticle = defaultArticle();
        _this.articleImage = false;
        $scope.$apply();
      });
    }

    function handleImage(renameResult){
      _this.newArticle.imageUrl = 'api/Images/articles/download/' + renameResult.name;

      return $q.resolve(renameResult.image);
    }

    function createArticle() {
      var deferred = $q.defer();

      Articles.create(_this.newArticle,
        function(res){
          deferred.resolve(res);
        },
        function(err){
          deferred.resolve({error: err});
        });

      return deferred.promise;
    }

    function defaultArticle(){
      return {
        content: '',
        readingTime: 0,
        title: '',
        category: '',
        author: Admin.sanitizeAuthor($rootScope.currentUser),
        imageUrl: ''
      };
    }

  }

})();
