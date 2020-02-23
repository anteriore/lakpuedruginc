var findApprovedItemModal = {
	bindings : {
		approvedreceipt : '=',
		purchaserequest: '=',
		button : '@',
		message : '@'
	},
	templateUrl : './find-approved-item-modal.html',
	controller : 'FindApprovedItemModalController'
};

angular.module('admin.shared').component('findApprovedItemModal', findApprovedItemModal);