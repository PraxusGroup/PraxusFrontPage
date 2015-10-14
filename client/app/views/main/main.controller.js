;(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainController', MainController);

  MainController.$inject = [];

  function MainController(){

    this.story = {
      title: '',
      category: '',
      createdOn: '',
      image: '',
      text: ''
    };

    this.search = 'Hello World';

  }

})();
