var findSoProductModal = {
	bindings : {
		products : '=',
		inventorylist: '=',
		button : '@',
		message : '@'
	},
	templateUrl : './find-so-product-modal.html',
	controller : 'FindSoProductModalController'
};

angular.module('admin.shared').component('findSoProductModal', findSoProductModal);