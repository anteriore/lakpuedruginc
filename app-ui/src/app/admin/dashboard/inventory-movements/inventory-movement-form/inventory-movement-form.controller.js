function InventoryMovementFormController($state, InventoryMovementsService,
		ApprovedItemsService, $rootScope, _) {
	var ctrl = this;
	
	ctrl.$onInit = function() {
		ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
		ctrl.inventorymovement.requestedBy = ctrl.user;
		ctrl.name = ctrl.user.firstName + ' ' + ctrl.user.lastName;
		ctrl.inventorymovement.date = new Date();
		ctrl.inventorymovement.company = $rootScope.selectedCompany;
		ctrl.inventorymovement.inventory = [];
		ctrl.stockOnHandList = [];
	};

	ctrl.$onChanges = function(changes) {
		if (changes.inventorymovement) {
			ctrl.inventorymovement = angular.copy(ctrl.inventorymovement);
		}
	};

	ctrl.submitForm = function() {
		console.log('submitForm: ' + JSON.stringify(ctrl.inventorymovement));
		ctrl.onSubmit({
			$event : {
				inventorymovement : ctrl.inventorymovement
			}
		});
	};

}

angular.module('admin.dashboard').controller('InventoryMovementFormController',
		InventoryMovementFormController);
