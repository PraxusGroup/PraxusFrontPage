;(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('User', UserFactory);

  /* @ngInject */
  function UserFactory($rootScope, $q, $localForage, Members, Groups, ProfilePortal) {

    var service = {
      getCurrent:       getCurrent,
      cacheCurrent:     cacheCurrent,
      getAvatar:        getAvatar,
      getDefaultPhoto:  getDefaultPhoto,
      cacheAvatars:     cacheAvatars,
      refreshCache:     refreshCache,
      logout:           logout,
      login:            login,
      _mountMember:     _mountMember
    };

    return service;

    ////////////

    function logout() {
      var deferred = $q.defer();

      _removeMemberData()
        .then(function(){
          $rootScope.$broadcast('request-cache-refreshed');

          deferred.resolve(false);
        })
        .catch(deferred.reject);

      return deferred.promise;
    }

    function _removeMemberData() {
      var deferred = $q.defer();

      Members
        .logout()
        .$promise
        .then(function(){
          return $localForage.removeItem('currentUser');
        })
        .then(function(){
          return $localForage.removeItem('memberId');
        })
        .then(function(){
          return $localForage.removeItem('passHash');
        })
        .then(function(){
          $rootScope.currentUser = false;

          deferred.resolve(false);
        });

      return deferred.promise;
    }

    function login(username, password) {
      var deferred = $q.defer();

      if(typeof username === 'object') {
        if (username.username && username.password) {
          password = username.password;
          username = username.username;
        } else {
          deferred.reject('Invalid Login Details');
        }
      } else if (!username || !password) {
        deferred.reject('Invalid Login Details');
      }

      var loginCredentials = {
        credentials: {
          username: username,
          password: password
        }
      };

      Members
        .login(loginCredentials)
        .$promise
        .then(function(res){
          $localForage.setItem('previousLogin', true);

          if (res.member) {
            return _mountMember(res.member);
          } else {
            throw 'Invalid Login Details';
          }

        })
        .then(function(member){
          $rootScope.$broadcast('request-cache-refreshed');
        })
        .then(deferred.resolve)
        .catch(deferred.reject);

      return deferred.promise;
    }

    function getCurrent() {
      var deferred = $q.defer();

      $localForage
        .getItem('currentUser')
        .then(function(member) {
          if (member) {
            return $q.resolve(member);
          } else {
            return cacheCurrent();
          }
        })
        .then(deferred.resolve)
        .catch(deferred.reject);

      return deferred.promise;
    }

    function cacheCurrent() {
      var deferred = $q.defer();

      Members
        .current()
        .$promise
        .then(function(res){
          if (!res.member) {
            return $q.resolve(false);
          } else {
            return _mountMember(res.member);
          }
        })
        .then(deferred.resolve)
        .catch(deferred.reject);

      return deferred.promise;
    }

    function _mountMember(member) {
      var deferred = $q.defer();

      $localForage
        .setItem('memberId', member.memberId)
        .then(function(res){
          return $localForage.setItem('passHash', member.passHash || member.memberLoginKey);
        })
        .then(function(res){
          return _loadMember(member.memberId);
        })
        .then(function(member){
          $rootScope.currentUser = member;

          return $localForage.setItem('currentUser', member);
        })
        .then(deferred.resolve)
        .catch(deferred.reject);

      return deferred.promise;
    }

    function _loadMember(memberId) {
      var deferred = $q.defer();

      var findFilter = {
        id: memberId,
        filter: {
          fields: [
            'memberId',
            'memberLoginKey',
            'membersDisplayName',
            'memberGroupId',
            'email'
          ]
        }
      };

      Members
        .findById(findFilter)
        .$promise
        .then(_getMemberGroup)
        .then(_getMemberAvatar)
        .then(deferred.resolve)
        .catch(deferred.reject);

      return deferred.promise;
    }

    function _getMemberAvatar(member){
      var deferred = $q.defer();

      if (member.avatar) {
        return $q.resolve(member);
      }

      getAvatar(member.memberId)
        .then(function(avatar){
          member.avatar = avatar;

          deferred.resolve(member);
        });

      return deferred.promise;
    }

    function _getMemberGroup(member) {
      var deferred = $q.defer();

      var groupFilter = {
        id: member.memberGroupId,
        filter: {
          fields: [
            'gIsSupmod',
            'gAccessCp'
          ]
        }
      };

      Groups
        .findById(groupFilter)
        .$promise
        .then(function(group){
          member.group = JSON.parse(angular.toJson(group));

          deferred.resolve(member);
        })
        .catch(function(err){
          if (!member.group) {
            deferred.reject(err);
          } else {
            deferred.resolve(member);
          }
        });

      return deferred.promise;
    }

    function getAvatar(memberId) {
      var deferred = $q.defer();

      $localForage.getItem('avatars')
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
            photo = 'http://nodebb.praxusgroup.com/uploads/' + photo;
          }

          deferred.resolve(photo);
        });

      return deferred.promise;
    }

    function getDefaultPhoto() {
      return 'http://i2.wp.com/praxusgroup.com/public/style_images/master/profile/default_large.png';
    }

    function cacheAvatars() {
      var deferred = $q.defer();

      $localForage.getItem('avatars')
        .then(function(res){
          return refreshCache();
        })
        .then(deferred.resolve);

      return deferred.promise;
    }

    function refreshCache() {
      var deferred = $q.defer();

      ProfilePortal
        .find({
          fields:['ppMemberId', 'ppMainPhoto']
        })
        .$promise
        .then(function(res){
          var photos = {};

          res.forEach(function(photo){
            photos[photo.ppMemberId] = photo.ppMainPhoto;
          });

          $localForage
            .setItem('avatars', photos)
            .then(deferred.resolve);

        });

      return deferred.promise;
    }
  }

})();
