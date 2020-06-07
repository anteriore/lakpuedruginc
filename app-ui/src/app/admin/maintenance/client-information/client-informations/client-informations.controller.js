function ClientInformationsController($state, $rootScope, _, ClientsService) {
  var ctrl = this;
  ctrl.clientInformations = [];
  ctrl.totalClients = 0;
  ctrl.clientsPerPage = 1;

  ctrl.company = $rootScope.selectedCompany;
  getResultsPage(1);

  ctrl.pagination = {
    current: 1,
  };

  ctrl.pageChanged = function (newPage) {
    getResultsPage(newPage);
  };

  function getResultsPage(pageNumber) {
    // this is just an example, in reality this stuff should be in a service
    ClientsService.paginateByCompany(
      ctrl.company.id,
      ctrl.clientsPerPage,
      pageNumber - 1
    ).then(function (result) {
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

  function loadClients() {
    ClientsService.list().then((response) => {
      ctrl.clientInformations = response.data;
    });
  }

  ctrl.confirmDelete = function (id) {
    $('#confirmDeleteAction').modal('show');
    ctrl.itemName = 'Are you sure you want to delete ?';
    ctrl.id = id;
  };

  // ctrl.cancelDelete = function () {
  //   $('#confirmDeleteAction').modal('hide');
  // };

  // ctrl.deleteFinishedGood = function (id) {
  //   $('#confirmDeleteAction').modal('hide');
  //   ClientsService.delete(id)
  //     .then(function (response) {
  //       ctrl.getData(ctrl.currentPage);
  //       ctrl.actionTitle = 'Confirmation';
  //       ctrl.actionMessage = 'You have successfully deleted the item';
  //     })
  //     .catch(function (error) {
  //       ctrl.actionTitle = 'Error';
  //       ctrl.actionMessage = 'The item was not deleted';
  //     });

  //   $('#confirmAction').modal('hide');
  //   $('#actionDialog').modal('show');
  // };

  ctrl.goToEdit = function (id) {
    $state.go('client-information-edit', { clientId: id });
  };
}

angular
  .module('admin.maintenance')
  .controller('ClientInformationsController', ClientInformationsController);
