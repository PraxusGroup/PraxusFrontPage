;(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('AdminEditController', AdminEditController);

  /* @ngInject */
  function AdminEditController($rootScope, $scope, $timeout, $q, $state, $stateParams,
    $localForage, Articles, Upload, readingTime) {

    var _this = this;

    _this.actionIcon = 'edit';
    _this.toolTip = 'Save Edited Article';

    _this.editArticle     = editArticle;
    _this.restoreArticle  = defaultArticle;
    _this.deleteArticle   = deleteArticle;
    _this.fresh = false;

    if($stateParams.aid){
      $localForage.getItem('admin' + $stateParams.aid)
        .then(function(data) {
          _this.fresh = true;
          if (data) {
            _this.activeArticle = data;
          } else {
            defaultArticle();
          }

          $scope.$watch('vm.activeArticle', function(data, old){
            if (data) {
              data = JSON.parse(angular.toJson(data));
              var rt = readingTime.get(data.content, {
                wordsPerMinute: 160,
                format: 'value_only'
              });

              rt = (rt.minutes * 60) + rt.seconds;

              data.readingTime = Math.ceil(rt/60);

              if(_this.fresh && data.content.length > 0){
                var tempArticleContent = JSON.parse(angular.toJson(data.content));
                _this.fresh = false;
                $timeout(function(){
                  _this.activeArticle.content = tempArticleContent;
                }, 150);
              }

              $localForage.setItem('admin' + $stateParams.aid, data);
            }
          }, true);
        });
    }

    function editArticle(){
      return verifyArticle(_this.activeArticle)
        .then(function(err){
          if (err) {
            return errorMessage('Unable to verify article', err);
          }

          return $q.resolve();
        })
        .then(handleImage)
        .then(saveArticle, function(err){
          errorMessage('Error uploading new image', err);
        })
        .then(function(res){
          if (res.error) {
            return errorMessage('Error publishing article', res.error);
          }

          return $q.resolve(res);
        })
        .then(function(res){
          successMessage('Saved Article', 'Successfully saved your edits to the article');
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
        Articles.deleteById({id: $stateParams.aid}, function(){
          $state.go('admin.articlesList');
        });
      });
    }

    function successMessage(title, text) {
      return swal(title, text, 'success');
    }

    function errorMessage(title, text) {
      swal(title, text, 'error');

      return $q(function(){return null;});
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

    function verifyArticle(article) {
      var deferred = $q.defer();

      if (article.title.length < 5) {
        deferred.resolve('The title is too short');
      }

      if (article.title.content < 144) {
        deferred.resolve('Not enough content');
      }

      if (article.title.category < 3) {
        deferred.resolve('Category too short');
      }

      deferred.resolve(null);

      return deferred.promise;
    }

    function handleImage(){
      var deferred = $q.defer();

      if (_this.articleImage) {
        var articleName = guid() + '.' + _this.articleImage.name.split('.').pop();

        _this.articleImage = Upload.rename(_this.articleImage, articleName);
        _this.activeArticle.imageUrl = 'api/Images/articles/download/' + articleName;

        var uploadData = {
          url: 'api/Images/articles/upload',
          data: {
            file: _this.articleImage
          }
        };

        Upload.upload(uploadData)
          .then(function (res) {
            deferred.resolve(res);
          }, function (res) {
            deferred.reject(res);
          }, function (evt) {
            deferred.notify(evt);
          });

      } else {
        deferred.resolve();
      }

      return deferred.promise;
    }

    function defaultArticle(){
      Articles.findById({id: $stateParams.aid}, function(res){
        _this.activeArticle = res;
        _this.articleImage = false;
      });
    }

    function sanitizeAuthor(author) {
      return {
        memberGroupId: author.memberGroupId,
        memberId: author.memberId,
        membersDisplayName: author.membersDisplayName,
      };
    }

    function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }

      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
      }
    }


})();
