
function JobOrderNewController($state, JobOrdersService, $rootScope) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
    ctrl.jo = {};
  };

  ctrl.createJobOrder = function (event) {
	  console.log("submit jo " + JSON.stringify(event.jo));
    JobOrdersService.save(event.jo).then(function (response) {
        $state.go('job-order');
    });

  };
}

angular
  .module('admin.dashboard')
  .controller('JobOrderNewController', JobOrderNewController);
