function FinishedGoodController($state, FinishedGoodsService, _) {
  var ctrl = this;
  ctrl.finishedGoods = [];

  ctrl.searchCode = '';
  ctrl.searchName = '';
  ctrl.sortType = 'id';
  ctrl.sortReverse = false;
  ctrl.isSelected = false;

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

  ctrl.selectedId = 0;

  ctrl.showAddFinishedGood = function (show) {
    ctrl.addFinishedGood = show;
  };

  ctrl.confirmDelete = function (id, name) {
    $('#confirmAction').modal('show');
    ctrl.itemName = name;
    ctrl.id = id;
  };

  ctrl.cancelDelete = function () {
    $('#confirmAction').modal('hide');
  };

  ctrl.confirm = function () {
    $('#actionDialog').modal('hide');
  };

  ctrl.editFinishedGood = function (id) {
    ctrl.selectedId = id;
    console.log(ctrl.selectedId);
    FinishedGoodsService.get(id).then(function (response) {
      ctrl.finishedgood = response.data;
    });
    ctrl.addFinishedGood = true;
  };

  ctrl.saveFinishedGood = function (event) {
    console.log(event.finishedgood);
    FinishedGoodsService.save(event.finishedgood).then(function (response) {
      console.log(response);
      if (response.data === '') {
        ctrl.actionTitle = 'Error';
        ctrl.actionMessage = 'The item code/name exists';
      } else {
        ctrl.actionTitle = 'Confirmation';
        ctrl.actionMessage = 'You have successfully updated the list';
        ctrl.getData(ctrl.currentPage);
        ctrl.showAddFinishedGood(false);
        ctrl.finishedgood = null;
      }
      $('#actionDialog').modal('show');
    });
  };

  ctrl.deleteFinishedGood = function (id) {
    console.log(id);
    id = 9;
    FinishedGoodsService.delete(id)
      .then(function (response) {
        ctrl.getData(ctrl.currentPage);
        ctrl.actionTitle = 'Confirmation';
        ctrl.actionMessage = 'You have successfully deleted the item';
      })
      .catch(function (error) {
        ctrl.actionTitle = 'Error';
        ctrl.actionMessage = 'The item was not deleted';
      });

    $('#confirmAction').modal('hide');
    $('#actionDialog').modal('show');
  };
}

angular
  .module('admin.maintenance')
  .controller('FinishedGoodController', FinishedGoodController);
