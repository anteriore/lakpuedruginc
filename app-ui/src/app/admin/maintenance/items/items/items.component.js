
var item = {
  templateUrl: './items.html',
  controller: 'ItemController'
};

angular
  .module('admin.maintenance')
  .component('item', item)
  .config(function ($stateProvider) {
    $stateProvider
      .state('items', {
        parent: 'app',
        url: '/admin/maintenance/item',
        component: 'item'
      });
  });