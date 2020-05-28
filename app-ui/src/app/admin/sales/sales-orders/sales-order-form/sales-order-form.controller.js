
function SalesOrderFormController($state, SalesOrdersService, ItemsService, ProductInventoryService, PurchaseOrdersService, UsersService, $rootScope) {
  var ctrl = this;

  ctrl.stockOnHandList = [];
  ctrl.reserved = [];
  ctrl.$onInit = function () {
<<<<<<< Updated upstream
    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
    ctrl.so.number = 0001;
=======
    ctrl.so.number = "0001";
    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));

>>>>>>> Stashed changes
    UsersService.get(ctrl.user.id).then(function (response) {
      ctrl.depots = response.data.depots;
    });

    ctrl.so.date = new Date();
  };
  ctrl.$onChanges = function (changes) {
    if (changes.so) {
      ctrl.so = angular.copy(ctrl.so);
    }
  };


  ctrl.submitForm = function () {
    console.log('submitForm: POTANGINA ' + JSON.stringify(ctrl.so));
    for (var i = 0; i < ctrl.so.products.length; i++) {
      ctrl.so.products[i].depot = ctrl.so.depot;
      ctrl.so.products[i].soNumber = ctrl.so.number;
    }
    console.log('HERE')
    SalesOrdersService.save(ctrl.so)
    ctrl.onSubmit({
      $event: {
        so: ctrl.so
      }
    });

  };



  ctrl.computeTotalAmount = function (value, index) {
    ctrl.so.products[index].amount = value;
    ctrl.so.totalAmount = 0;
    for (var i = 0; i < ctrl.so.products.length; i++) {
      ctrl.so.totalAmount += ctrl.so.products[i].quantity * ctrl.so.products[i].unitPrice;
    }
  };

  ctrl.findProduct = function () {
    ctrl.company = $rootScope.selectedCompany;
    ProductInventoryService.listFinishedGoodView(ctrl.company.id).then(function (response) {
      ctrl.fglistview = response.data;
      console.log("FGLISTVIEW" + ctrl.fglistview);
      $("#findFgInventoryModal").modal('show');
    });

  };



}

angular
  .module('admin.sales')
  .controller('SalesOrderFormController', SalesOrderFormController);
