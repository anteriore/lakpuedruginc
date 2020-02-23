var findSalesSlipModal = {
	bindings : {
		ss : '=',
		salesslips: '=',
		button : '@',
		message : '@'
	},
	templateUrl : './find-sales-slip-modal.html',
	controller : 'FindSalesSlipModalController'
};

angular.module('admin.shared').component('findSalesSlipModal', findSalesSlipModal);