var printPurchaseVoucher = {
	templateUrl : './print-purchase-voucher.html',
	controller : 'PrintPurchaseVoucherController'
};

angular.module('admin.shared')
.component('printPurchaseVoucher', printPurchaseVoucher)
.config(function ($stateProvider) {
    $stateProvider
      .state('print-purchase-voucher', {
        url: '/admin/shared/print-purchase-voucher/:purchaseVoucherId',
		component: 'printPurchaseVoucher',
		params: {
			purchaseVoucherId: null
		}
	  });
	});
