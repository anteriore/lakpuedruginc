
function RecipeFormController($state, FinishedGoodsService, ItemsService) {
  var ctrl = this;

  var ingredientGroup = { 
    name: "", 
    ingredient: []
  }

  var ingredient = {
    quantity: 0    
  }
  
  ctrl.$onChanges = function (changes) {
    if (changes.po) {
      ctrl.po = angular.copy(ctrl.po);
    }
  };

  ctrl.addIngredientGroup = function() {
    ctrl.recipe.ingredientGroups.push({ingredients: []});
  }

  ctrl.addIngredient = function(ingredientGroup) {
    ingredientGroup.ingredients.push({item: {}, quantity: 0});
  }
  
  ctrl.$onInit = function() {
	  FinishedGoodsService.list().then(function(response){
		  console.log("list response: " + JSON.stringify(response.data));
		  ctrl.finishedGoods = response.data;
    });

    ItemsService.list().then(function(response){
		  ctrl.items = response.data;
    });

  };

  
  ctrl.submitForm = function () {
    console.log('submitForm: ' + JSON.stringify(ctrl.recipe));
    ctrl.onSubmit({
      $event: {
    	  recipe: ctrl.recipe
      }
    });
  };
  
}

angular
  .module('admin.rnd')
  .controller('RecipeFormController', RecipeFormController);
