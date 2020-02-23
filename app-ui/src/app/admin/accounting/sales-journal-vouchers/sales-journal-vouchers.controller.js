
function SalesJournalVoucherController($state, SalesInvoicesService, UsersService, OrderSlipsService, $rootScope, $location, _) {
    var ctrl = this;
    ctrl.salesJournalVouchers = [];
    
    
    ctrl.sortType = 'date';
    ctrl.sortReverse = false;
    ctrl.totalAmount = 0;
    ctrl.totalTaxAmount = 0;
    ctrl.totalAccountsReceivable = 0;
    ctrl.$onInit = function () {
        ctrl.addSalesJournalVoucher = false;
        ctrl.error = null;

        ctrl.user = JSON.parse(window.localStorage.getItem('currentUser'));
        UsersService.get(ctrl.user.id).then(function(response){
            ctrl.userAssignedDepots = response.data.depots;
        });
        
      
    };
    
    ctrl.search = function () {
        loadSalesJournalVouchers();
    }
    
    function loadSalesJournalVouchers(){
        ctrl.user = JSON.parse(window.localStorage.getItem('currentUser'));
        ctrl.company = $rootScope.selectedCompany;
        if(ctrl.type === 'DR_SI'){
            SalesInvoicesService.listByDateFromAndDateToAndDepot(ctrl.userAssignedDepot.id, ctrl.dateFrom, ctrl.dateTo).then(function(response){
                console.log("list response: {}", response.data);
                ctrl.salesJournalVouchers = response.data;

                for(let si of ctrl.salesJournalVouchers){
                	si.taxPercentage = si.taxPercentage != null && si.taxPercentage != 0 ? si.taxPercentage : 100;
                    ctrl.totalAmount += si.totalAmount * (1 - (si.taxPercentage / 100));
                    ctrl.totalTaxAmount += si.totalAmount * (si.taxPercentage / 100);
                    ctrl.totalAccountsReceivable += si.totalAmount;
                }
            });
        }else if(ctrl.type === 'OS'){
            OrderSlipsService.listByDateFromAndDateToAndDepot(ctrl.userAssignedDepot.id, ctrl.dateFrom, ctrl.dateTo).then(function(response){
                console.log("list response: {}", response.data);
                ctrl.salesJournalVouchers = response.data;

                for(let si of ctrl.salesJournalVouchers){
                    ctrl.totalAmount += si.totalAmount * (1 - (si.taxPercentage / 100));
                    ctrl.totalTaxAmount += si.totalAmount * (si.taxPercentage / 100);
                    ctrl.totalAccountsReceivable += si.totalAmount;
                }
            });
        }
    }
    
    ctrl.searchPrf = function(event){
        ctrl.prfTable.DataTable.search(event).draw();
    };
    
    ctrl.print = function(){
        $("#sjvTable").print
    };
    
    ctrl.createNewSalesJournalVoucher = function (event) {
          console.log('createNewSalesJournalVoucher');
          $state.go('sales-journal-voucher-new');
          
    };
    
    ctrl.openModal = function(orderSlip){
        ctrl.si = orderSlip;
    };
    
    /*
    ctrl.showAddSalesJournalVoucher = function (show){
        ctrl.addSalesJournalVoucher = show;
    };
    
    
    
    ctrl.saveSalesJournalVoucher = function (event) {
          SalesJournalVouchersService.save(event.purchaserequest).then(function () {
                loadSalesJournalVouchers();
                ctrl.showAddSalesJournalVoucher(false);
                ctrl.purchaserequest = null;
          });
    };
    */
    
   
  }
  
  angular
    .module('admin.accounting')
    .controller('SalesJournalVoucherController', SalesJournalVoucherController);
  