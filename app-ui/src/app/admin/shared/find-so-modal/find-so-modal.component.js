var findSoModal = {
	bindings : {
		so : '=',
		salesorders: '=',
		button : '@',
		message : '@',
		onSubmit: '&'
	},
	templateUrl : './find-so-modal.html',
	controller : 'FindSoModalController'
};

angular.module('admin.shared').component('findSoModal', findSoModal);