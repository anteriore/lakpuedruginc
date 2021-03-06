var costings = {
  bindings: {
    costings: '<'
  },
  templateUrl: './costings.html',
  controller: 'CostingsController'
};

angular
  .module('admin.dashboard')
  .component('costings', costings)
  .config(function ($stateProvider) {
    $stateProvider
      .state('costings', {
        parent: 'app',
        url: '/admin/costings?filter',
        component: 'costings',
        params: {
          filter: {
            value: 'none'
          }
        },
        resolve: {
          filter: function ($transition$) {
            return $transition$.params();
          }
        }
      });
  });