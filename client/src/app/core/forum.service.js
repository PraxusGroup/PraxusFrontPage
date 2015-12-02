(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('Forum', Forum);

  /* @ngInject */
  function Forum($q, $localForage, PromiseLogger, User, Posts, Articles) {
    var service = {
      cacheRecentPosts: cacheRecentPosts,
      getRecentPosts:   getRecentPosts,
      cacheArticles:    cacheArticles,
      getArticles:      getArticles,
      getArticle:       getArticle
    };

    return service;

    function getArticle(articleId) {
      var deferred = $q.defer();

      getArticles()
        .then(function(articles){
          var found = false;
          for(var i = 0; i < articles.length; i++){
            if(articles[i].id === articleId) {
              found = articles[i];

              break;
            }
          }

          if (found) {
            deferred.resolve(found);
          } else {
            deferred.reject('Unable to find article');
          }
        })
        .catch(PromiseLogger.promiseError);

      return deferred.promise;
    }

    function getArticles() {
      return $localForage.getItem('articles')
        .then(function(res){
          if (!res){
            return cacheArticles();
          } else {
            return $q.resolve(res);
          }
        });
    }

    function cacheArticles() {
      var promise = Articles.find().$promise;

      promise
        .then(function(res){
          $localForage.setItem('articles', res);

          return $q.resolve(res);
        });

      return promise;
    }

    function getRecentPosts() {
      return $localForage.getItem('recentPosts')
        .then(function(res){
          if (!res){
            return cacheRecentPosts();
          } else {
            return $q.resolve(res);
          }
        });
    }

    function cacheRecentPosts() {
      var deferred = $q.defer();

      User.getCurrent()
        .then(getPosts)
        .then(function(res){
          $localForage.setItem('recentPosts', res.recent);

          return deferred.resolve(res.recent);
        });

      return deferred.promise;

      function getPosts(member){
        return Posts.getRecent({}, {member: member}).$promise;
      }
    }
  }
})();
