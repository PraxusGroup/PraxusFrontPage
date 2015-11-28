;(function() {
  'use strict';

  angular
    .module('app')
    .controller('AdminListController', AdminListController);

  AdminListController.$inject = ['$state', 'Articles'];

  function AdminListController($state, Articles){

    var _this = this;

    Articles.find({}, function(res){
      _this.stories = res;
    });

    this.goToEdit = goToEdit;

    function goToEdit(id) {
      $state.go('admin.articlesEdit', {aid: id});
    }

  }

})();
