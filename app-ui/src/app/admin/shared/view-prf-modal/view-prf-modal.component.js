var viewPrfModal = {
	bindings : {
		prf : '=',
		cancelreqs : '='
	},
	templateUrl : './view-prf-modal.html',
	controller : 'ViewPrfModalController'
};

angular.module('admin.shared').component('viewPrfModal', viewPrfModal);