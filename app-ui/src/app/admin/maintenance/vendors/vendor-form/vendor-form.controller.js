
function VendorFormController($state, AreasService, GroupService, DepartmentsService,_) {
  var ctrl = this;

  var currentUser = localStorage.getItem('currentUser');
      if (currentUser != null) {
          ctrl.currentUser = JSON.parse(currentUser);
      }
  
  ctrl.$onInit = function (){
    AreasService.list().then(function(response){
      ctrl.areas = response.data;
    });
    GroupService.list().then(function(response){
      ctrl.groups = response.data;
    });

    DepartmentsService.list().then(function(response){
      ctrl.departments = response.data;
    });
  };
  
  ctrl.$onChanges = function (changes) {
    if (changes.vendor) {
      ctrl.vendor = angular.copy(ctrl.vendor);
    }
  };


  
  ctrl.submitForm = function () {
    ctrl.onSubmit({
      $event: {
    	  vendor: ctrl.vendor
      }
    });
  };
  
}

angular
  .module('admin.maintenance')
  .controller('VendorFormController', VendorFormController);
