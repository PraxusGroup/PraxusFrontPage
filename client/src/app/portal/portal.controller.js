;(function() {
  'use strict';

  angular
    .module('app.portal')
    .controller('PortalController', PortalController);

  PortalController.$inject = ['$state', 'User', 'Articles', 'Posts'];

  function PortalController($state, User, Articles, Posts){

    var _this = this;

    Articles.find().$promise
      .then(function(res){
        _this.stories = res;
      });

    User.getCurrent()
      .then(function(current){
        return Posts.getRecent({}, {member: current}).$promise
          .then(function(res){
            _this.posts = res.recent;
          });
      });

    this.goToArticle = function(id) {
      $state.go('portal.article', {id: id});
    };

  }

})();
