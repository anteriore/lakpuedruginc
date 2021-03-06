
function AccountTitleController($state, AccountTitlesService, _) {
  var ctrl = this;
  ctrl.accountTitles = [];
  ctrl.searchCode = '';
  ctrl.searchName = '';
  ctrl.searchArea = '';
  ctrl.sortType = 'id';
  ctrl.sortReverse = false;
  ctrl.level = 1;
  ctrl.accountTitleHistory = [];
  ctrl.parentId = null;
  
  ctrl.$onInit = function () {
	  ctrl.addAccountTitle = false;
	  ctrl.error = null;
	  loadAccountTitles(1, -1);
  };
  
  function loadAccountTitles(level, parentId){
	  AccountTitlesService.listByLevelAndParentId(level, parentId).then(function(response){
		  console.log("list response: " + JSON.stringify(response.data));
		  ctrl.accountTitles = response.data;
	  });
  }
  
  ctrl.showAddAccountTitle = function (show){
	  ctrl.addAccountTitle = show;
  };
  
  ctrl.editAccountTitle = function (id) {
	  AccountTitlesService.get(id).then(function(response){
		  ctrl.accountTitle = response.data;
	  });
	  ctrl.addAccountTitle = true;
  };
  
  ctrl.saveAccountTitle = function (event) {
	    AccountTitlesService.save(event.accounttitle).then(function () {
	          loadAccountTitles(event.accounttitle.level, event.accounttitle.parent.id);
	    	  ctrl.showAddAccountTitle(false);
	    	  ctrl.accountTitle = null;
	    });
  };
  
  ctrl.digAccountTitle = function(id, title, level, parentId){
	  if(level == 1){
		  id = -1;
		  ctrl.accountTitle = {level: 1};
	  }
	  AccountTitlesService.listByLevelAndParentId(level, id).then(function(response){
		  console.log("list response: " + JSON.stringify(response.data));
		  ctrl.accountTitles = response.data;
		  
		  console.log(level + " " + ctrl.level);
		  if(level < ctrl.level){
			  console.log("splice");
			  ctrl.accountTitleHistory.splice(level-1, ctrl.accountTitleHistory.length);
		  }else if(level > ctrl.level){
			  ctrl.parentId = id; 
			  ctrl.accountTitleHistory.push({id:parentId, title: title, level: ctrl.level});
		  }
		  
		  ctrl.level = level;
	  });
	  
	  if(level != 1){
		  AccountTitlesService.get(id).then(function(response){
			  ctrl.accountTitle = {parent: response.data, level: level};
			  console.log("get resp" + JSON.stringify(ctrl.accountTitle));
		  });
	  }
  };
  
  ctrl.deleteAccountTitle = function (id){
	  AccountTitlesService.delete(id).then(function(response){
		  ctrl.accountTitleHistory = [];
		  loadAccountTitles(1, -1);
	  });
  };
}

angular
  .module('admin.maintenance')
  .controller('AccountTitleController', AccountTitleController);
