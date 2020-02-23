
function FindClientModalController($state, ClientsService, $rootScope) {
  var ctrl = this;
  ctrl.clients = [];
  ctrl.sortType = 'number';
	ctrl.sortReverse = false;
  
  ctrl.$onInit = function(){
	loadClients();
  };
  
  
  function loadClients(){
	  ctrl.company = $rootScope.selectedCompany;
	  ClientsService.listByCompany(ctrl.company.id).then(function(response){
		  ctrl.clients = response.data;
		  console.log("response" + JSON.stringify(ctrl.clients));
	  });
  }
  
  
  ctrl.getClient = function(client){
	ctrl.client = client;  
  };
}

angular
  .module('admin.shared')
  .controller('FindClientModalController', FindClientModalController);
