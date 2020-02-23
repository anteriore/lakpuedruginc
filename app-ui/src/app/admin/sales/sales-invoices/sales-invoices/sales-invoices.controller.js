
function SalesInvoiceController($state, SalesInvoicesService, UsersService, $rootScope, $location, _) {
  var ctrl = this;
  ctrl.salesInvoices = [];

  
  ctrl.sortType = 'date';
  ctrl.sortReverse = false;
  
  ctrl.$onInit = function () {
	  ctrl.addSalesInvoice = false;
	  ctrl.error = null;
	  ctrl.user = JSON.parse(window.localStorage.getItem('currentUser'));
	  UsersService.get(ctrl.user.id).then(function(response){
		  ctrl.userAssignedDepots = response.data.depots;
	  });
	  
  };
  
  ctrl.selectDepot = function (){
	  loadSalesInvoices();
  };
  
  function loadSalesInvoices(){
	  ctrl.user = JSON.parse(window.localStorage.getItem('currentUser'));
	  ctrl.company = $rootScope.selectedCompany;
	  SalesInvoicesService.listByDepot(ctrl.userAssignedDepot.id).then(function(response){
	  	  console.log("list response: {}", response.data);
		  ctrl.salesInvoices = response.data;
	  });
  }
  
  ctrl.searchPrf = function(event){
	  ctrl.prfTable.DataTable.search(event).draw();
  };
  
  ctrl.createNewSalesInvoice = function (event) {
	    console.log('createNewSalesInvoice');
	    $state.go('sales-invoice-new');
	    
  };
  
  ctrl.openModal = function(orderSlip){
	  ctrl.si = orderSlip;
  };
  
  /*
  ctrl.showAddSalesInvoice = function (show){
	  ctrl.addSalesInvoice = show;
  };
  
  
  
  ctrl.saveSalesInvoice = function (event) {
	    SalesInvoicesService.save(event.purchaserequest).then(function () {
	    	  loadSalesInvoices();
	    	  ctrl.showAddSalesInvoice(false);
	    	  ctrl.purchaserequest = null;
	    });
  };
  */
  
  ctrl.deleteSalesInvoice = function (id){
	  SalesInvoicesService.delete(id).then(function(response){
		  loadSalesInvoices();
	  });
  };
  
 
}

angular
  .module('admin.sales')
  .controller('SalesInvoiceController', SalesInvoiceController);
