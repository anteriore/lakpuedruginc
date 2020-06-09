function ClassificationController(
  $state,
  ClassificationsService,
  $rootScope,
  _
) {
  var ctrl = this;
  ctrl.classifications = [];
  ctrl.companies = [];

  ctrl.searchCode = '';
  ctrl.searchName = '';
  ctrl.sortType = 'code';
  ctrl.sortReverse = false;

  ctrl.$onInit = function () {
    ctrl.addClassification = false;
    ctrl.error = null;
    loadClassifications();
  };

  function loadClassifications() {
    ClassificationsService.list().then(function (response) {
      console.log('list response: ' + JSON.stringify(response.data));
      ctrl.classifications = response.data;
    });
  }

  ctrl.showAddClassification = function (show) {
    ctrl.addClassification = show;
  };

  ctrl.confirmDelete = function (id, name) {
    $('#confirmDeleteAction').modal('show');
    ctrl.itemName = 'Are you sure you want to delete ' + name + '?';
    ctrl.id = id;
  };

  ctrl.confirmEdit = function (event) {
    $('#confirmEditAction').modal('show');
    ctrl.itemName = 'Are you sure you want to save changes ?';
    ctrl.event = event;
  };

  ctrl.cancelDelete = function () {
    $('#confirmDeleteAction').modal('hide');
  };

  ctrl.cancelEdit = function () {
    $('#confirmEditAction').modal('hide');
  };

  ctrl.confirm = function () {
    $('#actionDialog').modal('hide');
  };

  ctrl.editClassification = function (id) {
    ClassificationsService.get(id).then(function (response) {
      ctrl.classification = response.data;
    });
    ctrl.addClassification = true;
  };

  ctrl.saveClassification = function (event) {
    $('#confirmEditAction').modal('hide');
    ClassificationsService.save(event.classification).then(function () {
      ctrl.actionTitle = 'Confirmation';
      ctrl.actionMessage = 'You have successfully updated the list';
      loadClassifications();
      ctrl.showAddClassification(false);
    });

    $('#actionDialog').modal('show');
  };

  ctrl.deleteClassification = function (id) {
    $('#confirmDeleteAction').modal('hide');
    ClassificationsService.delete(id)
      .then(function (response) {
        loadClassifications();
        ctrl.actionTitle = 'Confirmation';
        ctrl.actionMessage = 'You have successfully deleted the item';
      })
      .catch(function (error) {
        ctrl.actionTitle = 'Error';
        ctrl.actionMessage = 'The item was not deleted';
      });
    $('#confirmAction').modal('hide');
    $('#actionDialog').modal('show');
  };
}

angular
  .module('admin.maintenance')
  .controller('ClassificationController', ClassificationController);
