
function VendorNewController($state, VendorsService, $rootScope) {
    var ctrl = this;
    
    ctrl.$onInit = function () {
      ctrl.error = null;
      ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
      ctrl.vendor = {
          company: $rootScope.selectedCompany
      };
    };
  
    ctrl.createVendor = function (event) {
      VendorsService.save(event.vendor).then(function (response) {
            console.log("createClient " + JSON.stringify(response.data));
          $state.go('vendors');
      });
  
    };
  }
  
  angular
    .module('admin.maintenance')
    .controller('VendorNewController', VendorNewController);
  