
var costing = {
  bindings: {
    id: '<'
  },
  templateUrl: './costing.html',
  controller: 'CostingController'
};

angular
  .module('admin.dashboard')
  .component('costing', costing)
  .config(function ($stateProvider) {
    $stateProvider
      .state('costing-view', {
        parent: 'app',
        url: '/admin/costing-view?id',
        component: 'costing',
        params: {
          id: null
        },
        resolve: {
          id: function ($transition$) {
            return $transition$.params();
          }
        }
      });
  });