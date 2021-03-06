

function AppNavController(globalConfig, $http, $rootScope) {
    var ctrl = this;

    ctrl.currentUser = { firstName: "Unknown user", department: { name: 'No ' } };

    ctrl.$onInit = function () {
        var currentUser = localStorage.getItem('currentUser');
        if (currentUser != null) {
            ctrl.currentUser = JSON.parse(currentUser);
        }
    }

    

    ctrl.logout = function() {
      $rootScope.logout();
    }
};

/**
 * @ngdoc type
 * @module admin.common
 * @name AppController
 *
 */
angular
  .module('admin.common')
  .controller('AppNavController', AppNavController);