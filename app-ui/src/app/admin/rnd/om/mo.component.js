
var mo = {
    templateUrl: './mo.html',
    controller: 'MoController'
  };
  
  angular
    .module('admin.rnd')
    .component('mo', mo)
    .config(function ($stateProvider) {
      $stateProvider
        .state('mo', {
          parent: 'app',
          url: '/admin/rnd/mo',
          component: 'mo'
        });
    });