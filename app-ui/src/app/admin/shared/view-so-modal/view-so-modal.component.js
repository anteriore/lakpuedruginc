var viewSoModal = {
	bindings : {
		so : '=',
		cancelreqs : '='
	},
	templateUrl : './view-so-modal.html',
	controller : 'ViewSoModalController'
};

angular.module('admin.shared').component('viewSoModal', viewSoModal);