function DepartmentsAndAreasController(
  $state,
  DepartmentsService,
  GroupService,
  AreasService,
  $rootScope,
  _
) {
  var ctrl = this;

  ctrl.departments = [];
  ctrl.areas = [];
  ctrl.groups = [];
  ctrl.addGroupForm = false;
  ctrl.addAreaForm = false;
  ctrl.addDepartmentForm = false;

  ctrl.sortDeptReverse = false;
  ctrl.sortDeptType = 'code';

  ctrl.sortAreaReverse = false;
  ctrl.sortAreaType = 'code';

  ctrl.sortGroupReverse = false;
  ctrl.sortGroupType = 'code';

  ctrl.$onInit = function () {
    ctrl.company = $rootScope.selectedCompany;
    loadDepartments();
    loadAreas();
    loadGroups();
  };

  var loadGroups = function () {
    GroupService.listByCompany(ctrl.company.id).then(function (response) {
      console.log('list response: ' + JSON.stringify(response.data));
      ctrl.groups = response.data;
    });
    ctrl.addGroupForm = false;
  };

  function loadDepartments() {
    DepartmentsService.listByCompany(ctrl.company.id).then(function (response) {
      console.log('list response: ' + JSON.stringify(response.data));
      ctrl.departments = response.data;
    });
    ctrl.addDepartmentForm = false;
  }

  function loadAreas() {
    AreasService.listByCompany(ctrl.company.id).then(function (response) {
      console.log('list response area: ' + JSON.stringify(response.data));
      ctrl.areas = response.data;
    });
    ctrl.addAreaForm = false;
  }

  ctrl.showAddArea = function (show) {
    ctrl.addAreaForm = show;
  };

  ctrl.showAddGroup = function (show) {
    ctrl.addGroupForm = show;
  };

  ctrl.showAddDepartment = function (show) {
    ctrl.addDepartmentForm = show;
  };

  ctrl.saveGroup = function (event) {
    event.area.company = $rootScope.selectedCompany;
    console.log(event.group.company);
    GroupService.save(event.group).then(function () {
      loadGroups();
    });
  };

  ctrl.confirm = function () {
    $('#actionDialog').modal('hide');
  };

  //Department modals
  ctrl.confirmDeleteDepartment = function (id, name) {
    $('#confirmDeleteDepartment').modal('show');
    ctrl.itemName = 'Are you sure you want to delete ' + name + '?';
    ctrl.id = id;
  };

  ctrl.cancelDeleteDepartment = function () {
    $('#confirmDeleteDepartment').modal('hide');
  };

  ctrl.deleteDepartment = function (id) {
    console.log(id);
    $('#confirmDeleteDepartment').modal('hide');
    DepartmentsService.delete(id)
      .then(function (response) {
        if (response.data == true) {
          loadDepartments();
          ctrl.actionTitle = 'Confirmation';
          ctrl.actionMessage = 'You have successfully deleted the item';
        }
      })
      .catch(function (error) {
        ctrl.actionTitle = 'Error';
        ctrl.actionMessage = 'The item was not deleted';
      });
    $('#confirmAction').modal('hide');
    $('#actionDialog').modal('show');
  };

  ctrl.cancel = function () {
    $('#confirmSaveDepartment').modal('hide');
  };

  ctrl.confirmSaveDepartment = function (event) {
    ctrl.event = event;
    $('#confirmSaveDepartment').appendTo('body').modal('show');
  };

  ctrl.saveDepartment = function (event) {
    event.department.company = $rootScope.selectedCompany;
    DepartmentsService.save(event.department).then(function () {
      $('#confirmSaveDepartment').modal('hide');

      loadDepartments();
    });
  };

  //Area modals
  ctrl.confirmDeleteArea = function (id, name) {
    $('#confirmDeleteArea').modal('show');
    ctrl.itemName = 'Are you sure you want to delete ' + name + '?';
    ctrl.id = id;
  };

  ctrl.cancelDeleteArea = function () {
    $('#confirmDeleteArea').modal('hide');
  };

  ctrl.deleteArea = function (id) {
    $('#confirmDeleteArea').modal('hide');
    AreasService.delete(id)
      .then(function (response) {
        if (response.data == true) {
          loadAreas();
          ctrl.actionTitle = 'Confirmation';
          ctrl.actionMessage = 'You have successfully deleted the item';
        }
      })
      .catch(function (error) {
        ctrl.actionTitle = 'Error';
        ctrl.actionMessage = 'The item was not deleted';
      });
    $('#confirmAction').modal('hide');
    $('#actionDialog').modal('show');
  };

  ctrl.confirmSaveArea = function (event) {
    ctrl.event = event;
    $('#confirmSaveArea').appendTo('body').modal('show');
  };

  ctrl.saveArea = function (event) {
    event.area.company = $rootScope.selectedCompany;
    AreasService.save(event.area).then(function () {
      $('#confirmSaveArea').modal('hide');

      loadAreas();
    });
  };
  //Group modals
  ctrl.confirmDeleteGroup = function (id, name) {
    console;
    $('#confirmDeleteGroup').modal('show');
    ctrl.itemName = 'Are you sure you want to delete ' + name + '?';
    ctrl.id = id;
  };

  ctrl.cancelDeleteGroup = function () {
    $('#confirmDeleteGroup').modal('hide');
  };

  ctrl.deleteGroup = function (id) {
    console.log(id);
    $('#confirmDeleteGroup').modal('hide');
    GroupService.delete(id)
      .then(function (response) {
        if (response.data == true) {
          loadGroups();
          ctrl.actionTitle = 'Confirmation';
          ctrl.actionMessage = 'You have successfully deleted the item';
        }
      })
      .catch(function (error) {
        ctrl.actionTitle = 'Error';
        ctrl.actionMessage = 'The item was not deleted';
      });
    $('#confirmAction').modal('hide');
    $('#actionDialog').modal('show');
  };

  ctrl.confirmSaveGroup = function (event) {
    ctrl.event = event;
    $('#confirmSaveGroup').appendTo('body').modal('show');
  };

  ctrl.saveGroup = function (event) {
    event.group.company = $rootScope.selectedCompany;
    GroupService.save(event.group).then(function () {
      $('#confirmSaveGroup').modal('hide');

      loadGroups();
    });
  };
}

angular
  .module('admin.maintenance')
  .controller('DepartmentsAndAreasController', DepartmentsAndAreasController);
