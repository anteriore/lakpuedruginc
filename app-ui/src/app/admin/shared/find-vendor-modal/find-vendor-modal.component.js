var findVendorModal = {
	bindings : {
		vendor : '=',
		button : '@',
		message : '@'
	},
	templateUrl : './find-vendor-modal.html',
	controller : 'FindVendorModalController'
};

angular.module('admin.shared').component('findVendorModal', findVendorModal);