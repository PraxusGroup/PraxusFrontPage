;(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('User', UserFactory);

  UserFactory.$inject = [
    '$cookies', '$q', 'PromiseLogger', '$localForage',
    'Members', 'Groups', 'ProfilePortal'
  ];

  function UserFactory($cookies, $q, PromiseLogger, $localForage, Members, Groups, ProfilePortal) {

    var service = {
      getCurrent:       getCurrent,
      cacheCurrent:     cacheCurrent,
      getAvatar:        getAvatar,
      getDefaultPhoto:  getDefaultPhoto,
      cacheAvatars:     cacheAvatars,
      refreshCache:     refreshCache
    };

    return service;

    ////////////

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

      //@HACK: Bypasses the cookie check for non-ipboard domains
      if (!cookies.member_id) {
        cookies.member_id = 114;
        cookies.pass_hash = '93eb4746333b5f10dc09ec9e4b3bccd3';

        //$localForage.removeItem('currentUser');
        //return $q.resolve(false);
      }

      if (res.memberLoginKey === cookies.pass_hash) {
        return $q.resolve(res);
      } else {
        $localForage.removeItem('currentUser');

        return $q.resolve(false);
      }
    }

    function cacheCurrent() {
      var deferred = $q.defer();

      var cookies  = $cookies.getAll();

      //@HACK: Bypasses the cookie check for non-ipboard domains
      if (!cookies.member_id) {
        cookies.member_id = 114;
        cookies.pass_hash = '93eb4746333b5f10dc09ec9e4b3bccd3';
        //return $q.resolve(false);
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
        .then(verifyMember)
        .catch(PromiseLogger.promiseError)
        .then(getMemberGroup)
        .then(getMemberAvatar)
        .then(function(res){
          return $localForage.setItem('currentUser', res);
        })
        .then(function(res){
          deferred.resolve(res);
        })
        .catch(function(err){
          deferred.reject(err);
        });

      return deferred.promise;

      function getMemberAvatar(res){
        var deferred = $q.defer();

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
