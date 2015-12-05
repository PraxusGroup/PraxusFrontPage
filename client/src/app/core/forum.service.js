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

    function getArticle(id) {
      var deferred = $q.defer();

      getArticles()
        .then(function(articles){
          var found = false;
          var i;

          for(i = 0; i < articles.length; i++){
            if(articles[i].slug === id) {
              found = articles[i];

              break;
            }
          }

          if (found) {
            return deferred.resolve(found);
          }

          for(i = 0; i < articles.length; i++){
            if(articles[i].id === id) {
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
          return $localForage.setItem('articles', res);
        });

      return promise;
    }

    function getRecentPosts() {
      var deferred = $q.defer();

      $localForage.getItem('recentPosts')
        .then(function(res){
          if (!res){
            return cacheRecentPosts();
          } else {
            return $q.resolve(res);
          }
        })
        .then(deferred.resolve);

      return deferred.promise;
    }

    function cacheRecentPosts() {
      var deferred = $q.defer();

      User.getCurrent()
        .then(getPosts)
        .then(function(res){
          $localForage.setItem('recentPosts', res.recent)
            .then(function(res){
              deferred.resolve(res.recent);
            });
        });

      return deferred.promise;

      function getPosts(member){
        return Posts.getRecent({}, {member: member}).$promise;
      }
    }
  }
})();
