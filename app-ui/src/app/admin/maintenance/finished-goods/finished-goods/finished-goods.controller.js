function FinishedGoodController($state, FinishedGoodsService, _) {
  var ctrl = this;
  ctrl.finishedGoods = [];

  ctrl.searchCode = '';
  ctrl.searchName = '';
  ctrl.sortType = 'id';
  ctrl.sortReverse = false;

  ctrl.$onInit = function () {
    ctrl.addFinishedGood = false;
    ctrl.error = null;
    ctrl.getData(ctrl.currentPage);
  };

  function loadFinishedGoods() {
    FinishedGoodsService.list().then(function (response) {
      console.log('list response: ' + JSON.stringify(response.data));
      ctrl.finishedGoods = response.data;
    });
  }

  ctrl.totalCount = 0;
  ctrl.itemsPerPage = 30;
  ctrl.currentPage = 1;

  ctrl.getData = function (page) {
    FinishedGoodsService.paginate(
      ctrl.itemsPerPage,
      (page - 1) * ctrl.itemsPerPage
    ).then((res) => {
      var data = res.data;
      ctrl.currentPage = page;
      ctrl.totalCount = data.totalElements;
      ctrl.finishedGoods = data.content;
    });
  };

  ctrl.showAddFinishedGood = function (show) {
    ctrl.addFinishedGood = show;
  };

  ctrl.editFinishedGood = function (id) {
    FinishedGoodsService.get(id).then(function (response) {
      ctrl.finishedgood = response.data;
    });
    ctrl.addFinishedGood = true;
  };

  ctrl.saveFinishedGood = function (event) {
    FinishedGoodsService.save(event.finishedgood).then(function () {
      ctrl.getData(ctrl.currentPage);
      ctrl.showAddFinishedGood(false);
      ctrl.finishedgood = null;
    });
  };

  ctrl.deleteFinishedGood = function (id) {
    $('#findFgInventoryModal').modal('show');
    FinishedGoodsService.delete(id).then(function (response) {
      ctrl.getData(ctrl.currentPage);
    });
  };
}

angular
  .module('admin.maintenance')
  .controller('FinishedGoodController', FinishedGoodController);
