;(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainController', MainController);

  MainController.$inject = ['$rootScope', '$state', 'Articles', 'Posts'];

  function MainController($rootScope, $state, Articles, Posts){

    var _this = this;

    Articles.find().$promise
      .then(function(res){
        _this.stories = res;
      });

    Posts.getRecent({}, {member: $rootScope.currentUser}).$promise
      .then(function(res){
        _this.posts = res.recent;
      });


    this.goToArticle = function(id) {
      $state.go('article', {id: id});
    };

  }

})();
