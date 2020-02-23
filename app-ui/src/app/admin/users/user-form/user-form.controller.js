
function UserFormController($state, UsersService, DepartmentsService, PermissionsService, DepotsService) {
  var ctrl = this;

  ctrl.formPermission = {};

  ctrl.baseAction = {
    'c': 'Create',
    'r': 'Read',
    'u': 'Update',
    'd': 'Delete'
  };


  DepotsService.list().then(function(res) {
    ctrl.depots = res.data;
  })

  ctrl.addDepotToUser = function() {
    ctrl.user.depots.push(ctrl.depot);
  }

  ctrl.removeDepotFromUser = function(d) {
    var length = ctrl.user.depots.length
    for (var i = 0; i < length; i++) {
      if (ctrl.user.depots[i].id == d.id) {
        ctrl.user.depots.splice(i, 1);
      }
    }
  }

  ctrl.valueAction = ['c', 'r', 'u', 'd'];


  ctrl.$onChanges = function (changes) {
    if (changes.user) {
      ctrl.user = angular.copy(ctrl.user);
    }

    if (changes.formPermission) {
      ctrl.formPermission = angular.copy(ctrl.formPermission);
    }
  };

  ctrl.hasCrud = function (action) {
    return action && UsersService.actionArrayToString(action) === 'crud';
  };

  ctrl.checkAction = function (event, permissionCode) {
    if (event.target.checked) {
      ctrl.user.permissions[permissionCode].actions = angular.copy(ctrl.valueAction);
    } else {
      ctrl.user.permissions[permissionCode].actions = [];
    }
  };

  ctrl.loadDepartments = function (id) {
    DepartmentsService.listByCompany(id).then(function (response) {
      ctrl.departments = response.data;
    });
  };

  ctrl.submitForm = function () {
    console.log('submitForm: ' + JSON.stringify(ctrl.user));

    if (!ctrl.user.department) {
      alert('Please choose a department for the user'); //TODO modal dialog;
      return;
    }
    ctrl.onSubmit({
      $event: {
        user: ctrl.user
      }
    });
    //$state.go("user-new");
  };
}

angular
  .module('admin.users')
  .controller('UserFormController', UserFormController);
