var salesInvoiceNew = {
  templateUrl: './sales-invoice-new.html',
  controller: 'SalesInvoiceNewController'
};

angular
  .module('admin.sales')
  .component('salesInvoiceNew', salesInvoiceNew)
  .config(function ($stateProvider) {
    $stateProvider
      .state('sales-invoice-new', {
        parent: 'app',
        url: '/admin/sales/sales-invoice/new',
        component: 'salesInvoiceNew'
      });
  });
