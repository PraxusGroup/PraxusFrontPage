;(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('AdminEditController', AdminEditController);

  /* @ngInject */
  function AdminEditController($scope, $timeout, $q, $state, Articles, Core, Admin, PromiseLogger) {
    var _this = this;

    _this.actionIcon = 'edit';
    _this.toolTip = 'Save Edited Article';

    _this.editArticle     = editArticle;
    _this.restoreArticle  = defaultArticle;
    _this.deleteArticle   = deleteArticle;
    _this.fresh = false;

    if($state.params.aid){
      Core.$localForage.getItem('admin' + $state.params.aid)
        .then(function(data) {
          _this.fresh = true;
          if (data) {
            _this.activeArticle = data;
          } else {
            defaultArticle();
          }

          $scope.$watch('vm.activeArticle', watchCachedArticle, true);
        });
    }

    function watchCachedArticle(data) {
      if (data) {
        data = Core.clone(data);

        data.readingTime = Admin.getReadingTime(data.content);

        if(_this.fresh && data.content.length > 0){
          var tempArticleContent = Core.clone(data.content);

          _this.fresh = false;

          $timeout(function(){
            _this.activeArticle.content = tempArticleContent;
          }, 150);
        }

        Core.$localForage.setItem('admin' + $state.params.aid, data);
      }
    }

    function editArticle(){
      return Admin.verifyArticle(_this.activeArticle, _this.articleImage)
        .catch(function(err){
          return PromiseLogger.promiseError('Unable to verify article', err);
        })
        .then(handleImage)
        .catch(function(err){
          return PromiseLogger.promiseError('Error uploading new image', err);
        })
        .then(saveArticle)
        .then(Admin.handlePublishErrors)
        .then(function(res){
          PromiseLogger.swalSuccess('Saved Article', 'Successfully saved your edits to the article');
        });
    }

    function deleteArticle(){
      swal({
        title: 'Are you sure?',
        text: 'Do you want to delete the article for reals?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ffc823',
        confirmButtonText: 'Delete!',
        closeOnConfirm: true
      }, function(){
        Articles.deleteById({id: $state.params.aid}, function(){
          $state.go('admin.articlesList');
        });
      });
    }

    function saveArticle() {
      var article = _this.activeArticle;

      var deferred = $q.defer();

      Articles.prototype$updateAttributes(
        {id: article.id}, article,
        function(res){
          deferred.resolve(res);
        },
        function(err){
          deferred.resolve({error: err});
        });

      return deferred.promise;
    }

    function handleImage(){
      var deferred = $q.defer();

      if (_this.articleImage) {
        Admin.renameImage(_this.articleImage)
          .then(function(renameResult){
            _this.activeArticle.imageUrl = 'api/Images/articles/download/' + renameResult.name;

            return $q.resolve(renameResult.image);
          })
          .then(Admin.uploadImage)
          .then(deferred.resolve)
          .catch(deferred.reject);

      } else {
        deferred.resolve();
      }

      return deferred.promise;
    }

    function defaultArticle(){
      Articles.findById({id: $state.params.aid}, function(res){
        _this.activeArticle = res;
        _this.articleImage = false;
      });
    }
  }
})();
