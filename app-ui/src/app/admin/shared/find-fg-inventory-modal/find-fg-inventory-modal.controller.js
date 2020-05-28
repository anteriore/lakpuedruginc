
function FindFgInventoryModalController($state, FinishedGoodsService, ProductInventoryService) {
	var ctrl = this;

	ctrl.sortType = 'mis';
	ctrl.sortReverse = false;



	ctrl.selectFG = function (fg) {
		console.log("teh search fg" + ctrl.searchFG);

		if (ctrl.fglist.indexOf(fg) !== -1) {
			var index = ctrl.fglist.indexOf(fg);
			ctrl.fglist.splice(index, 1);
			console.log("splice " + index);
		} else {
			ctrl.fglist.push(fg);
			console.log(fg);
		}
	};




	ctrl.searchInput = function (input) {
		//ctrl.company = $rootScope.selectedCompany;
		console.log("search content:" + ctrl.searchFG);
		ProductInventoryService.listFinishedGoodView(1).then(function (response) {
			ctrl.fglistview = response.data;
			console.log(ctrl.fglistview[0].name);
			console.log(response);
			ctrl.fglistview = [];


			console.log(response.data.length);
			for (var i = 0; i < response.data.length; i++) {
				console.log(response.data[i].finishedGood.name);

				if (response.data[i].finishedGood.name.toLowerCase().includes(ctrl.searchFG.toLowerCase())) {
					ctrl.fglistview.push(response.data[i]);
				}
			}




		});

	};


}

angular
	.module('admin.shared')
	.controller('FindFgInventoryModalController', FindFgInventoryModalController);
