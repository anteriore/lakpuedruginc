var findRequestedItemsModal = {
	bindings : {
		ordereditems : '=',
		button : '@',
		message : '@'
	},
	templateUrl : './find-requested-items-modal.html',
	controller : 'FindRequestedItemsModalController'
};

angular.module('admin.shared').component('findRequestedItemsModal', findRequestedItemsModal);