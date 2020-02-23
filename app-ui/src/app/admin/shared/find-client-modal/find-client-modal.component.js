var findClientModal = {
	bindings : {
		client : '=',
		button : '@',
		message : '@'
	},
	templateUrl : './find-client-modal.html',
	controller : 'FindClientModalController'
};

angular.module('admin.shared').component('findClientModal', findClientModal);