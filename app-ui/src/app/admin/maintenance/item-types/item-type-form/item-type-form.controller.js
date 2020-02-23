
function ItemTypeFormController($state, ItemTypesService) {
  var ctrl = this;

  ctrl.$onChanges = function (changes) {
    if (changes.itemtype) {
      ctrl.itemtype = angular.copy(ctrl.itemtype);
    }
  };

  ctrl.submitForm = function () {
    console.log('submitForm: ' + JSON.stringify(ctrl.itemtype));
    ctrl.onSubmit({
      $event: {
    	  itemtype: ctrl.itemtype
      }
    });
  };
}

angular
  .module('admin.maintenance')
  .controller('ItemTypeFormController', ItemTypeFormController);
