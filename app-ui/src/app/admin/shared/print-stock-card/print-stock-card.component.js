var printStockCard = {
	templateUrl : './print-stock-card.html',
	controller : 'PrintStockCardController'
};

angular.module('admin.shared')
.component('printStockCard', printStockCard)
.config(function ($stateProvider) {
    $stateProvider
      .state('print-stock-card', {
        url: '/admin/shared/print-stock-card/:controlNumber',
		component: 'printStockCard',
		params: {
			controlNumber: null
		}
	  });
	});
