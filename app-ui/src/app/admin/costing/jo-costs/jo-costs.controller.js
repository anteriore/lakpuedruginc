function JoCostsController(JoCostService, $rootScope, $state) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
    ctrl.company = $rootScope.selectedCompany;
    JoCostService.listByCompany(ctrl.company.id).then(function(res) {
      ctrl.joCosts = res.data;
    });
  };
  
  ctrl.view = function(id) {
    $state.go('joCost-view', {id: id});
  }

}

angular
  .module('admin.dashboard')
  .controller('JoCostsController', JoCostsController);