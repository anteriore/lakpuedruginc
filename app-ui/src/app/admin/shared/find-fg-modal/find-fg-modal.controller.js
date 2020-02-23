
function FindFgModalController($state, FinishedGoodsService) {
  var ctrl = this;
  ctrl.fgList = [];

  ctrl.$onInit = function(){
	loadFg();
	};
	
	ctrl.sortType = 'mis';
	ctrl.sortReverse = false;
  
  
  function loadFg(){
	  ctrl.company = JSON.parse(window.localStorage.getItem('company'));
	  FinishedGoodsService.list().then(function(response){
		  ctrl.fgList = response.data;
		  console.log(JSON.stringify(response.data));
	  });
  }
  
  ctrl.selectFG = function(fg){
	  ctrl.fg = fg;
  };
  
  
}

angular
  .module('admin.shared')
  .controller('FindFgModalController', FindFgModalController);
