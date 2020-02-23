var findProductModal = {
	bindings : {
		productlist: '=',
		issuedlist:'=',
		stockonhand: '=',
		message : '@'
	},
	templateUrl : './find-product-modal.html',
	controller : 'FindProductModalController'
};

angular.module('admin.shared').component('findProductModal', findProductModal);