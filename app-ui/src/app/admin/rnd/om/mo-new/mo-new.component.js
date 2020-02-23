
var moNew = {
    templateUrl: './mo-new.html',
    controller: 'MoNewController'
  };
  
  angular
    .module('admin.rnd')
    .component('moNew', moNew)
    .config(function ($stateProvider) {
      $stateProvider
        .state('mo-new', {
          parent: 'app',
          url: '/admin/rnd/mo/new',
          component: 'moNew'
        });
    });