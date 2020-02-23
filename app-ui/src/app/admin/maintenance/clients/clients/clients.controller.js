
function ClientController($state, ClientsService, CompanyService, $rootScope, _) {
  var ctrl = this;
  ctrl.clients = [];
  ctrl.companies = [];

  ctrl.searchCode = '';
  ctrl.searchName = '';
  ctrl.searchTin = '';
  ctrl.sortType = 'id';
  ctrl.sortReverse = false;
  
  ctrl.$onInit = function () {
	  ctrl.addClient = false;
	  ctrl.error = null;
	  ctrl.getData(ctrl.currentPage);
  };
  
  function loadClients(){
	  ctrl.company = $rootScope.selectedCompany;
	  ClientsService.listByCompany(ctrl.company.id).then(function(response){
		  console.log("list response: " + JSON.stringify(response.data));
		  ctrl.clients = response.data;
	  });
  }
  
  ctrl.totalCount = 0;
  ctrl.itemsPerPage = 5;
  ctrl.currentPage = 1;
  
  ctrl.getData = function(page) {
	  ctrl.company = $rootScope.selectedCompany;
	    ClientsService.paginateByCompany(ctrl.company.id, ctrl.itemsPerPage, (page - 1) * ctrl.itemsPerPage).then((res) => {
	      var data = res.data;
	      ctrl.currentPage = page;
	      ctrl.totalCount = data.totalElements;
	      ctrl.finishedGoods = data.content;
	    });
	  }
  
  ctrl.showAddClient = function (show){
	  ctrl.addClient = show;
  };
  
  ctrl.editClient = function (id) {
	  ClientsService.get(id).then(function(response){
		  ctrl.client = response.data;
	  });
	  ctrl.addClient = true;
  };
  
  ctrl.saveClient = function (event) {
	    event.client.company = $rootScope.selectedCompany;
	    console.log(event.client.company);
	    ClientsService.save(event.client).then(function () {
	    	  loadClients();
	    	  ctrl.showAddClient(false);
	    });
  };
  
  ctrl.deleteClient = function (id){
	  ClientsService.delete(id).then(function(response){
		  loadClients();
	  });
  };
}

angular
  .module('admin.maintenance')
  .controller('ClientController', ClientController);
