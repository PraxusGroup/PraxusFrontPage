;(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('AdminCreateController', AdminCreateController);

  /* @ngInject */
  function AdminCreateController($rootScope, $scope, $timeout, $q,
    $localForage, Articles, Upload, readingTime, Core, PromiseLogger){

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
      if (_this.newArticle) {
        var rt = readingTime.get(newValue, {
          wordsPerMinute: 160,
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
      return verifyArticle()
        .then(function(err){
          if (err) {
            return PromiseLogger.promiseError('Unable to publish article', err);
          }

          return $q.resolve();
        })
        .then(renameImage)
        .then(uploadImage)
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

    function createArticle() {
      console.log(_this.newArticle);

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

    function uploadImage() {
      var deferred = $q.defer();

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

      return deferred.promise;
    }

    function verifyArticle() {
      var deferred = $q.defer();

      var article = _this.newArticle;

      if (article.title.length < 5) {
        deferred.resolve('The title is too short');
      }

      if (article.title.content < 144) {
        deferred.resolve('Not enough content');
      }

      if (article.title.category < 3) {
        deferred.resolve('Category too short');
      }

      if (!_this.articleImage) {
        deferred.resolve('Articles require an image');
      }

      deferred.resolve(null);

      return deferred.promise;
    }

    function renameImage() {
      var deferred = $q.defer();

      var articleName = Core.guid() + '.' + _this.articleImage.name.split('.').pop();

      _this.articleImage = Upload.rename(_this.articleImage, articleName);
      _this.newArticle.imageUrl = 'api/Images/articles/download/'+articleName;

      deferred.resolve();

      return deferred.promise;
    }

    function defaultArticle(){
      return {
        content: '',
        readingTime: 0,
        title: '',
        category: '',
        author: sanitizeAuthor($rootScope.currentUser),
        imageUrl: ''
      };
    }

    function sanitizeAuthor(author) {
      return {
        memberGroupId: author.memberGroupId,
        memberId: author.memberId,
        membersDisplayName: author.membersDisplayName,
      };
    }

  }

})();
