
var accountTitle = {
		bindings : {
			maintenance : '<'
		},
  templateUrl: './account-titles.html',
  controller: 'AccountTitleController'
};

angular
  .module('admin.maintenance')
  .component('accountTitle', accountTitle)
  .config(function ($stateProvider) {
    $stateProvider
      .state('account-titles', {
        parent: 'app',
        url: '/admin/maintenance/account-title',
        component: 'accountTitle'
      });
  });