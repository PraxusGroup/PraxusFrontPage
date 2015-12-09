;(function() {
  'use strict';

  angular
    .module('app.portal')
    .controller('PortalController', PortalController);

  /* @ngInject */
  function PortalController($scope, $http, $state, Core, Forum, User) {

    var _this = this;

    _this.goToArticle = function(story) {
      $state.go('portal.article', { id: story.slug || story.id });
    };

    var data = {
      auth_key: '880ea6a14ea49e853634fbdc5015a024',
      ips_username: 'hellsan631',
      ips_password: 'hellan631'
    };

    var url = 'http://praxusgroup.com/index.php?app=core&module=global&section=login&do=process';

    $http.post(url, data)
      .then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(response);

      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.

        console.log(response);
      });

    $scope.$on('cache-refreshed', getPortalData);

    getPortalData();

    function getPortalData() {
      Forum.getArticles()
        .then(function(res) {
          _this.stories = res;
        });

      Forum.getRecentPosts()
        .then(function(res) {
          _this.posts = res;
        });
    }
  }

})();
