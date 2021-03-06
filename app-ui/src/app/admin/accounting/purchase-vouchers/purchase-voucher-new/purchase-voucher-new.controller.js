
function PurchaseVoucherNewController($state, PurchaseVouchersService, $rootScope) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
    ctrl.company = $rootScope.selectedCompany;
    ctrl.pv = {
    		company: ctrl.company,
    		date: new Date(),
    		accountTitles: [],
    		manual: false,
    		type: "PJV",
    		preparedBy: ctrl.user
    }
    };

  ctrl.createPurchaseVoucher = function (event) {
    PurchaseVouchersService.save(event.pv).then(function (response) {
    	  console.log("createPurchaseVoucher " + JSON.stringify(response.data));
    	  alert("PJV successfully added");
    	  ctrl.pv.number = response.data.number;
    	  ctrl.pv.id = response.data.id;
    });

  };
}

angular
  .module('admin.accounting')
  .controller('PurchaseVoucherNewController', PurchaseVoucherNewController);
