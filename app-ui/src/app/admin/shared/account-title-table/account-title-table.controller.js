
function AccountTitleTableController($state, AccountTitlesService, DepartmentsService, GroupService, AreasService, $rootScope, _) {
  var ctrl = this;
  
  ctrl.$onInit = function(){
	  ctrl.company = $rootScope.selectedCompany;
	  AccountTitlesService.list().then(function(response){
		  ctrl.accountTitlesList = response.data;
		  console.log("response" + JSON.stringify(ctrl.accountTitles));
	  });
	  
	  DepartmentsService.listByCompany(ctrl.company.id).then(function(response){
		  ctrl.departments = response.data;
	  });
	  
	  GroupService.listByCompany(ctrl.company.id).then(function(response){
		  ctrl.groups = response.data;
	  });
	  
	  AreasService.listByCompany(ctrl.company.id).then(function(response){
		  ctrl.areas = response.data;
	  });
	  
	  ctrl.debitAmount = 0;
	  ctrl.creditAmount = 0;
	  
	  $("#myInput").focusout(function () {
		document.getElementById("myDropdown").classList.toggle("show");
		});

		$("#myDropdown").focusout(function () {
			document.getElementById("myDropdown").classList.toggle("show");
		});
  };
	
  
  
  ctrl.addRow = function(){
	  ctrl.accounttitles.push({
		  accountTitle: ctrl.accountTitle,
		  department: ctrl.department,
		  group: ctrl.group,
		  area: ctrl.area,
		  amount: ctrl.amount
	  });
	  if(ctrl.accountTitle.type == 'Credit'){
		  ctrl.creditAmount += ctrl.amount;
	  }else if(ctrl.accountTitle.type == 'Debit'){
		  ctrl.debitAmount -= ctrl.amount;
	  }
	  ctrl.accountTitle = null;
	  ctrl.department = null;
	  ctrl.group = null;
	  ctrl.area = null;
	  ctrl.amount = null;
  };
  
  ctrl.deleteRow = function(index){
	  if(ctrl.accounttitles[index].accountTitle.type == 'Credit'){
		  ctrl.creditAmount -= ctrl.accounttitles[index].amount;
	  }else if(ctrl.accounttitles[index].accountTitle.type == 'Debit'){
		  ctrl.debitAmount += ctrl.accounttitles[index].amount;
	  }
	  
	  ctrl.accounttitles.splice(index, 1);
  }
  
  ctrl.showAccountTitleModal = function(){
	  console.log(ctrl.accountTitle);
  }

  ctrl.myFunction = function() {
	document.getElementById("myDropdown").classList.toggle("show");
	
  }
  
  ctrl.filterFunction = function() {
	var input, filter, ul, li, a, i, div, txtValue;
	input = document.getElementById("myInput");
	filter = input.value.toUpperCase();
	div = document.getElementById("myDropdown");
	a = div.getElementsByTagName("a");
	for (i = 0; i < a.length; i++) {
	  txtValue = a[i].textContent || a[i].innerText;
	  if (txtValue.toUpperCase().indexOf(filter) > -1) {
		a[i].style.display = "";
	  } else {
		a[i].style.display = "none";
	  }
	}

	if(a.length == 1){
		console.log("ASDASD");
		AccountTitlesService.findByTitle(a[0].textContent || a[0].innerText).then(function(response){
			this.accountTitle = response.data;
		});	
	}
  }

  ctrl.selectAccountTitle = function(accountTitle){
	  ctrl.accountTitle = accountTitle;
	  document.getElementById("myDropdown").classList.toggle("show");
  }
  
}

angular
  .module('admin.shared')
  .controller('AccountTitleTableController', AccountTitleTableController);
