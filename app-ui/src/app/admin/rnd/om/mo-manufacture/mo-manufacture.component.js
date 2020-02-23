
var moManufacture = {
    templateUrl: './mo-manufacture.html',
    controller: 'MoManufactureController'
  };
  
  angular
    .module('admin.rnd')
    .component('moManufacture', moManufacture)
    .config(function ($stateProvider) {
      $stateProvider
        .state('mo-manufacture', {
          parent: 'app',
          url: '/admin/rnd/mo/manufacture?id',
          component: 'moManufacture',
          params: {
            id: null
          },
          resolve: {
            id: function ($transition$) {
              console.log('transitions.id', $transition$.params().id);
              return $transition$.params().id;
            }
          }
        });
    });