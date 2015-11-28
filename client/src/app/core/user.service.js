;(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('User', UserFactory);

  UserFactory.$inject = ['$rootScope', '$localForage', 'ProfilePortal'];

  function UserFactory($rootScope, $localForage, ProfilePortal) {

    var service = {
      getCurrent:   getCurrent,
      getAvatar:    getAvatar,
      cacheAvatars: cacheAvatars,
      refreshCache: refreshCache
    };

    return service;

    ////////////

    function getCurrent() {

      return $rootScope.currentUser;

    }

    function getAvatar(memberId) {
      return $localForage.getItem('avatars')
        .then(function(res){
          return res[memberId];
        });
    }

    function cacheAvatars() {
      return $localForage.getItem('avatars')
        .then(function(res){
          return refreshCache();
        });
    }

    function refreshCache() {
      return ProfilePortal.find({fields:['ppMemberId', 'ppMainPhoto']}).$promise
        .then(function(res){
          var photos = {};
          res.forEach(function(photo){
            photos[photo.ppMemberId] = photo.ppMainPhoto;
          });

          $localForage.setItem('avatars', photos);
        });
    }
  }

})();
