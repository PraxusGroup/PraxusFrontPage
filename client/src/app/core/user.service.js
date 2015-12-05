;(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('User', UserFactory);

  /* @ngInject */
  function UserFactory($rootScope, $cookies, $q, $localForage, Members, Groups, ProfilePortal, PromiseLogger) {

    var service = {
      getCurrent:       getCurrent,
      cacheCurrent:     cacheCurrent,
      getAvatar:        getAvatar,
      getDefaultPhoto:  getDefaultPhoto,
      cacheAvatars:     cacheAvatars,
      refreshCache:     refreshCache,
      logout:           logout,
      login:            login
    };

    return service;

    ////////////

    function logout() {

      $cookies.remove('member_id');
      $cookies.remove('pass_hash');

      $localForage.removeItem('currentUser')
        .then(function(){
          $rootScope.currentUser = false;
          $rootScope.$broadcast('request-cache-refreshed');
        });
    }

    function login(credentials) {

      //@HACK: Bypasses the cookie check for non-ipboard domains
      $cookies.put('member_id', 114);
      $cookies.put('pass_hash', '93eb4746333b5f10dc09ec9e4b3bccd3');

      $rootScope.$broadcast('request-cache-refreshed');
    }

    function getCurrent() {
      return $localForage.getItem('currentUser')
        .then(function(res){
          if (!res) {
            return cacheCurrent();
          } else {
            return verifyMember(res);
          }
        })
        .catch(PromiseLogger.promiseError);
    }

    function verifyMember(res) {
      var cookies = $cookies.getAll();

      if (res.memberLoginKey === cookies.pass_hash) {
        return $q.resolve(res);
      }

      $localForage.removeItem('currentUser');

      return $q.resolve(false);
    }

    function cacheCurrent() {
      var deferred = $q.defer();

      var cookies  = $cookies.getAll();

      if (!cookies.member_id) {
        return $q.resolve(false);
      }

      var findFilter = {
        id: cookies.member_id,
        filter: {
          fields: [
            'memberId',
            'memberLoginKey',
            'membersDisplayName',
            'memberGroupId'
          ]
        }
      };

      var memberPromise = Members.findById(findFilter).$promise;

      memberPromise
        .catch(memberErrorResponse)
        .then(verifyMember)
        .catch(PromiseLogger.promiseError)
        .then(getMemberGroup)
        .then(getMemberAvatar)
        .then(function(res){
          return $localForage.setItem('currentUser', res);
        })
        .then(deferred.resolve)
        .catch(deferred.reject);

      return deferred.promise;

      function memberErrorResponse(err) {
        if (err.status === 500) {
          return $localForage.getItem('currentUser');
        }

        return PromiseLogger.promiseError(err);
      }

      function getMemberAvatar(res){
        var deferred = $q.defer();

        if (res.avatar) {
          return $q.resolve(res);
        }

        getAvatar(res.memberId)
          .then(function(avatar){
            res.avatar = avatar;

            deferred.resolve(res);
          });

        return deferred.promise;
      }

      function getMemberGroup(res) {
        var deferred = $q.defer();

        var groupFilter = {
          id: res.memberGroupId,
          filter: {
            fields: [
              'gIsSupmod',
              'gAccessCp'
            ]
          }
        };

        var groupPromise = Groups.findById(groupFilter).$promise;

        groupPromise
          .then(function(group){
            res.group = JSON.parse(angular.toJson(group));

            deferred.resolve(res);
          })
          .catch(function(err){
            if (!res.group) {
              deferred.reject(err);
            } else {
              deferred.resolve(res);
            }
          });

        return deferred.promise;
      }
    }

    function getAvatar(memberId) {
      return $localForage.getItem('avatars')
        .then(function(res){
          if (!res) {
            return refreshCache();
          } else {
            return $q.resolve(res);
          }
        })
        .then(function(res){
          var photo = res[memberId];

          if (!photo || photo < 3) {
            photo = getDefaultPhoto();
          } else {
            photo = 'http://praxusgroup.com/uploads/' + photo;
          }

          return $q.resolve(photo);
        });
    }

    function getDefaultPhoto() {
      return 'http://i2.wp.com/praxusgroup.com/public/style_images/master/profile/default_large.png';
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

          return $q.resolve(photos);
        });
    }
  }

})();
