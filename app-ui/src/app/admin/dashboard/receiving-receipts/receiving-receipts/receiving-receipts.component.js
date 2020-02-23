
var receivingReceipt = {
  templateUrl: './receiving-receipts.html',
  controller: 'ReceivingReceiptController'
};

angular
  .module('admin.dashboard')
  .component('receivingReceipt', receivingReceipt)
  .config(function ($stateProvider) {
    $stateProvider
      .state('receiving-receipts', {
        parent: 'app',
        url: '/admin/dashboard/receiving-receipt',
        component: 'receivingReceipt'
      });
  });