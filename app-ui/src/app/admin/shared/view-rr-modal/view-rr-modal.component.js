var viewRrModal = {
	bindings : {
		rr : '='
	},
	templateUrl : './view-rr-modal.html',
	controller : 'ViewRrModalController'
};

angular.module('admin.shared').component('viewRrModal', viewRrModal);