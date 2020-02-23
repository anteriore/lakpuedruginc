
var joCostSave = {
  bindings: {
    id: '<'
  },
  templateUrl: './jo-cost-save.html',
  controller: 'JoCostSaveController'
};

angular
  .module('admin.dashboard')
  .component('joCostSave', joCostSave)
  .config(function ($stateProvider) {
    $stateProvider
      .state('joCost-save', {
        parent: 'app',
        url: '/admin/joCost-save?id',
        component: 'joCostSave',
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