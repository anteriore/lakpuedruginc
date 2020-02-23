var inventoryMovementNew = {
  templateUrl: './inventory-movement-new.html',
  controller: 'InventoryMovementNewController'
};

angular
  .module('admin.dashboard')
  .component('inventoryMovementNew', inventoryMovementNew)
  .config(function ($stateProvider) {
    $stateProvider
      .state('inventory-movement-new', {
        parent: 'app',
        url: '/admin/dashboard/inventory-movements/new',
        component: 'inventoryMovementNew'
      });
  });
