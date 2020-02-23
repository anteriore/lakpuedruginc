var productInventory = {
	templateUrl : './product-inventory.html',
	controller : 'ProductInventoryController'
};

angular.module('admin.dashboard').component('productInventory', productInventory).config(
		function($stateProvider) {
			$stateProvider.state('productInventory', {
				parent : 'app',
				url : '/admin/dashboard/product-inventory',
				component : 'productInventory'
			});
		});