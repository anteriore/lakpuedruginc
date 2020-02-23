
function CompanyNavController($state, CompanyService, $rootScope, _) {
    var ctrl = this;
    ctrl.companies = [];
    
    ctrl.$onInit  = function() {
        CompanyService.list().then(function(response) {
            ctrl.companies = response.data;
            //console.log(window.localStorage.getItem("company"));
            ctrl.company = $rootScope.selectedCompany;
            if (ctrl.company == null) {
                $rootScope.selectedCompany = ctrl.companies[0];
            }
        });

        ctrl.selectCompany = function(company) {
        	$rootScope.selectedCompany = company;
        	localStorage.setItem('company', JSON.stringify(company));
        	ctrl.company = company;
        	$state.reload();
        }
    };

    ctrl.showCompanyNav = function(){
    	ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
    	if(ctrl.user.department.name == "Admin"){
    		return true;
    	}else{
    		$rootScope.selectedCompany = ctrl.user.company;
    		return false;
    	}
    };

  }
  
  angular
    .module('admin.shared')
    .controller('CompanyNavController', CompanyNavController);
  