function GroupAndCategoryController($state, _, GroupService) {
  var ctrl = this;
  ctrl.groups = [];
  ctrl.selectedGroup = null;
  ctrl.group = {};
  ctrl.groupButtonText = '';
  ctrl.category = {};
  ctrl.hideGroup = true;
  ctrl.hideCategory = true;

  ctrl.$onInit = function () {
    loadGroups().then(function (response) {
      console.log(JSON.stringify(response.data));
      ctrl.groups = response.data;
      if (ctrl.groups.length > 0 && ctrl.selectedGroup == null) {
        ctrl.selectedGroup = ctrl.groups[0];
      }
    });
  };

  var loadGroups = function () {
    return GroupService.list();
  };

  ctrl.toggleGroupForm = function () {
    ctrl.groupButtonText = 'Add';
    ctrl.hideGroup = !ctrl.hideGroup;
  };

  ctrl.onSelectGroup = function (group) {
    ctrl.selectedGroup = group;
  };

  ctrl.submitGroup = function () {
    if (ctrl.group.name) {
      GroupService.save(ctrl.group).then(function () {
        ctrl.loadGroups().then(function (response) {
          ctrl.groups = response.data;
          ctrl.group = {};
        });
      });
    }
  };

  ctrl.toggleCategoryForm = function () {
    ctrl.categoryButtonText = 'Add Category';
    ctrl.hideCategory = !ctrl.hideCategory;
  };

  ctrl.submitCategory = function () {
    if (ctrl.category.name) {
      ctrl.selectedGroup.categories.push(ctrl.category);
      GroupService.save(ctrl.selectedGroup).then(function () {
        ctrl.category = {};
      });
    }
  };

  ctrl.removeCategory = function (index) {
    ctrl.selectedGroup.categories.splice(index, 1);
    GroupService.save(ctrl.selectedGroup).then(function () {
      ctrl.category = {};
    });
  };
}

angular
  .module('admin.maintenance')
  .controller('GroupAndCategoryController', GroupAndCategoryController);
