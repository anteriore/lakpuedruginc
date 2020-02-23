
var approvedReceipt = {
  templateUrl: './approval-receipts.html',
  controller: 'ApprovedReceiptController'
};

angular
  .module('admin.dashboard')
  .component('approvedReceipt', approvedReceipt)
  .config(function ($stateProvider) {
    $stateProvider
      .state('approved-receipts', {
        parent: 'app',
        url: '/admin/dashboard/approved-receipt',
        component: 'approvedReceipt'
      });
  });