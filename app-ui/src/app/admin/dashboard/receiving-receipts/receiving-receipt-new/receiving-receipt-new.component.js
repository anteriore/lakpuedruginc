var receivingReceiptNew = {
  templateUrl: './receiving-receipt-new.html',
  controller: 'ReceivingReceiptNewController'
};

angular
  .module('admin.dashboard')
  .component('receivingReceiptNew', receivingReceiptNew)
  .config(function ($stateProvider) {
    $stateProvider
      .state('receiving-receipt-new', {
        parent: 'app',
        url: '/admin/dashboard/receiving-receipt/new',
        component: 'receivingReceiptNew'
      });
  });
