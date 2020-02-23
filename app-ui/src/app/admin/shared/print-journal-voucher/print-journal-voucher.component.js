var printJournalVoucher = {
	templateUrl : './print-journal-voucher.html',
	controller : 'PrintJournalVoucherController'
};

angular.module('admin.shared')
.component('printJournalVoucher', printJournalVoucher)
.config(function ($stateProvider) {
    $stateProvider
      .state('print-journal-voucher', {
        url: '/admin/shared/print-journal-voucher/:journalVoucherId',
		component: 'printJournalVoucher',
		params: {
			journalVoucherId: null
		}
	  });
	});
