
function JoCostSaveController(JoCostService, RecipesService, FinishedGoodsService, ProcedureAreasService, $state, _, $rootScope) {
  var ctrl = this;
  ctrl.joCost = { finishedGood: {}, recipe: {}, company: $rootScope.selectedCompany,  jobOrderCostSheetIngredients: [], jobOrderCostSheetProcedureAreas: [], employeeTotalCost: 0, grandTotal: 0 };

  ctrl.$onInit = function () {
    console.log('JoCostSaveController: id: ', ctrl.id.id);

    FinishedGoodsService.list().then(function(response){
      console.log("list response: " + JSON.stringify(response.data));
      ctrl.finishedGoods = response.data;
    });


    if (!ctrl.costing.moCostingInventories) {
      ctrl.costing.moCostingInventories = [];
    }

  };

  ctrl.selectFinishedGood = function() {
    console.log('selectFinishedGood');

    RecipesService.listByFinishedGood(ctrl.joCost.finishedGood.id).then(function(res) {
      if (res.data.length > 0) {
        ctrl.joCost.recipe = res.data[0];
        console.log("recipe received",  ctrl.joCost.recipe);

        _.forEach(ctrl.joCost.recipe.activeIngredientGroup.ingredients, (ingredient) => {
          console.log(ingredient);
          ctrl.joCost.jobOrderCostSheetIngredients.push({
            ingredient: ingredient,
            costPerUnit: 0
          });
        });


        ProcedureAreasService.list().then((res) => {
          var procedureAreas = res.data;
          _.forEach(procedureAreas, (procedureArea) => {
            ctrl.joCost.jobOrderCostSheetProcedureAreas.push({
              procedureArea: procedureArea,
              hours: 0,
              ratePerHour: 0
            });
          });
        });

        if (ctrl.joCost.jobOrderCostSheetIngredients.length == 0) {
          alert('Recipe ingredient not found');
        }
      }
    });
  }

  ctrl.recomputeTotal = function () {
    ctrl.joCost.grandTotal = 0;
    _.forEach(ctrl.joCost.jobOrderCostSheetIngredients, (jocsIngredient) => {
      ctrl.joCost.grandTotal += (jocsIngredient.costPerUnit * jocsIngredient.ingredient.quantity);
    });

    _.forEach(ctrl.joCost.jobOrderCostSheetProcedureAreas, (jocsProcedureArea) => {
      ctrl.joCost.grandTotal += (jocsProcedureArea.hours * jocsProcedureArea.ratePerHour);
    });

    console.log('recomputeTotal()', ctrl.joCost.grandTotal);
  }

  ctrl.save = function (event) {
    ctrl.recomputeTotal();

    return JoCostService
      .save(ctrl.joCost)
      .then(function () {
        $state.go('joCosts');
      });
  };
}

angular
  .module('admin.dashboard')
  .controller('JoCostSaveController', JoCostSaveController);