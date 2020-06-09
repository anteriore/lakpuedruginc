function ProductReceivingsController(
  $state,
  ProductReceivingsService,
  $rootScope,
  _
) {
  var ctrl = this;
  ctrl.productReceivingSlips = [];

  ctrl.searchNumber = '';
  ctrl.searchDate = '';
  ctrl.sortType = 'date';
  ctrl.sortReverse = false;

  ctrl.$onInit = function () {
    ctrl.addProductReceivings = false;
    ctrl.error = null;
    loadProductReceivings();
  };

  function loadProductReceivings() {
    ctrl.user = JSON.parse(window.localStorage.getItem('currentUser'));
    ctrl.company = $rootScope.selectedCompany;
    ProductReceivingsService.listByCompany(ctrl.company.id).then(function (
      response
    ) {
      console.log('list response: ' + JSON.stringify(response.data));
      ctrl.productReceivingSlips = response.data;
    });
  }

  ctrl.openModal = function (inventory) {
    ctrl.prs = inventory;
  };

  ctrl.createNewPRS = function (event) {
    console.log('new mis');
    $state.go('product-receiving-new');
  };
}

angular
  .module('admin.dashboard')
  .controller('ProductReceivingsController', ProductReceivingsController);
