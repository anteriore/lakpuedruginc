
function ClientInformationsController($state, $rootScope, _, ClientsService) {
  var ctrl = this;
  ctrl.clientInformations = [];
  ctrl.totalClients = 0;
  ctrl.clientsPerPage = 1;

  ctrl.company = $rootScope.selectedCompany;
  getResultsPage(1);
  
  ctrl.pagination = {
    current: 1
  };

  ctrl.pageChanged = function(newPage) {
    getResultsPage(newPage);
  };

  function getResultsPage(pageNumber) {
    // this is just an example, in reality this stuff should be in a service
    ClientsService.paginateByCompany(ctrl.company.id, ctrl.clientsPerPage, pageNumber-1)
        .then(function(result) {
            console.log(result.data);
            ctrl.clients = result.data.content;
            ctrl.totalClients = 3;
        });
  }

  ctrl.sortType = 'name';
  ctrl.sortReverse = false;
  
  ctrl.$onInit = function () {
    
	  ctrl.addPurchaseRequest = false;
	  ctrl.error = null;
	  
  };
  
  function loadClients(){
    ClientsService.list().then((response) => {
      ctrl.clientInformations = response.data;
    });
	  
  }

  ctrl.goToEdit = function(id) {
    $state.go("client-information-edit",  { 'clientId': id });
  }
}

angular
  .module('admin.maintenance')
  .controller('ClientInformationsController', ClientInformationsController);
