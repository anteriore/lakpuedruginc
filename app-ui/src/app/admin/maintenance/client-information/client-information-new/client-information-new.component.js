var clientInformationNew = {
  templateUrl: './client-information-new.html',
  controller: 'ClientInformationNewController'
};

angular
  .module('admin.maintenance')
  .component('clientInformationNew', clientInformationNew)
  .config(function ($stateProvider) {
    $stateProvider
      .state('client-information-new', {
        parent: 'app',
        url: '/admin/maintenance/client-information/new',
        component: 'clientInformationNew'
      });
  });
