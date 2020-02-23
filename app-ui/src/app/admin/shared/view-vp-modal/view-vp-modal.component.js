var viewVpModal = {
	bindings : {
		vp : '=',
		approve: '&'
	},
	templateUrl : './view-vp-modal.html',
	controller : 'ViewVpModalController'
};

angular.module('admin.shared').component('viewVpModal', viewVpModal);