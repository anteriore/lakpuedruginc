
function ClassificationFormController($state, ClassificationsService) {
  var ctrl = this;

  ctrl.$onChanges = function (changes) {
    if (changes.classification) {
      ctrl.classification = angular.copy(ctrl.classification);
    }
  };
  
  ctrl.$onInit = function() {
	  //ClassificationsService.listTypes().then(function(response){
//		  ctrl.types = response.data;
//	  });
  };

  ctrl.submitForm = function () {
    console.log('submitForm: ' + JSON.stringify(ctrl.classification));
    ctrl.onSubmit({
      $event: {
        classification: ctrl.classification
      }
    });
  };
}

angular
  .module('admin.maintenance')
  .controller('ClassificationFormController', ClassificationFormController);
