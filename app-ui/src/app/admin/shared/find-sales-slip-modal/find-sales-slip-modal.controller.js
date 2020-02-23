
function FindSalesSlipModalController($state, SalesOrdersService, $rootScope) {
  var ctrl = this;
  ctrl.salesOrders = [];
  ctrl.sortType = 'number';
  ctrl.sortReverse = false;
  
  
  ctrl.getSalesSlip = function(ss){
	ctrl.ss = ss;  
  };
}

angular
  .module('admin.shared')
  .controller('FindSalesSlipModalController', FindSalesSlipModalController);
