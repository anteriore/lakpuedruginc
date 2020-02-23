// PRE MANUFACTURING ORDER
function MoNewController($state, RecipesService, FinishedGoodsService, InventoryService, $rootScope, MoInventoryService, _) {
    var ctrl = this;

    ctrl.mo = { batchSize: 0};
    ctrl.mo.company = $rootScope.selectedCompany;
    ctrl.inventoryList = [];
    ctrl.mo.type = "";


  FinishedGoodsService.list().then(function(response){
  		  console.log("list response: " + JSON.stringify(response.data));
  		  ctrl.finishedGoods = response.data;
      });

      RecipesService.list().then(function(response) {
        console.log("recipes list", response.data);
      });
   

      ctrl.testRun = function() {
        console.log("finishedGood id: ", ctrl.mo.finishedGood.id);
        RecipesService.listByFinishedGood(ctrl.mo.finishedGood.id).then(function(res) {
          if (res.data.length > 0) {
            ctrl.recipe = res.data[0];
            console.log("recipe received", ctrl.recipe);

            InventoryService.listByRecipeItemsOnInventory(ctrl.mo.company.id, ctrl.recipe.id).then(function(res) {
              ctrl.inventoryList = [];

              ctrl.ingredients = _.filter(ctrl.recipe.activeIngredientGroup.ingredients, function(ingredient) {
                return (ctrl.mo.type == '' || (ctrl.mo.type == 'RM' && ingredient.item.type.code == 'RM'));
              });

              if (res.data.length > 0) {
                _.forEach(res.data, function(inventory) {
                    if (ctrl.mo.type == 'RM' && inventory.item.type.code == 'RM') {
                      ctrl.inventoryList.push(inventory);
                    } else if (ctrl.mo.type == 'PM' && inventory.item.type.code == 'PM') {
                      ctrl.inventoryList.push(inventory);
                    } else if (ctrl.mo.type == ''){
                      ctrl.inventoryList.push(inventory);
                    }
                });

                ctrl.mo.inventoryList = ctrl.inventoryList;
                ctrl.mo.recipe = ctrl.recipe;
                ctrl.mo.ingredientGroup = ctrl.recipe.activeIngredientGroup;

                _.forEach(ctrl.ingredients, function(ingredient) {
                    var isInRecipe = false;
                    _.forEach(ctrl.mo.inventoryList, function(inv) {
                      if (inv.item && inv.item.code == ingredient.item.code) {
                        inv.ingredientQuantity = ingredient.quantity;
                        isInRecipe = true;
                      }
                    });

                    if (!isInRecipe) {
                      if (ctrl.mo.type == 'RM' && ingredient.item.type.code == 'RM') {
                        ctrl.inventoryList.push({controlNumber: 'N/A', item: ingredient.item, quantity: 0, ingredientQuantity: ingredient.quantity});
                      } else if (ctrl.mo.type == 'PM' && ingredient.item.type.code == 'PM') {
                        ctrl.inventoryList.push({controlNumber: 'N/A', item: ingredient.item, quantity: 0, ingredientQuantity: ingredient.quantity});
                      } else if (ctrl.mo.type == ''){
                        ctrl.inventoryList.push({controlNumber: 'N/A', item: ingredient.item, quantity: 0, ingredientQuantity: ingredient.quantity});
                      }
                      
                    }
                });

                if (ctrl.inventoryList.length == 0) {
                  alert("Items needed for MO does not exist in inventory");
                }
              } else {
                alert("Inventory not found for finished good: " + ctrl.mo.finishedGood.name + " " +  ctrl.mo.finishedGood.code);
              }
              
            });
          } else {
            alert("Recipe not found for finished good" + ctrl.mo.finishedGood.name + " " +  ctrl.mo.finishedGood.code);
          }

       });
      }


      ctrl.isPassed = function() {
        var totalResult = 0;
        _.forEach(ctrl.mo.inventoryList, function(inv) {
          totalResult += (inv.result) ? inv.result : 0;
        });

        return (totalResult == 0) ? 'PASSED' : 'Quantity Lacking';
      }

      ctrl.getRecipeItemQuantity = function(itemCode, recipe) {
        var recipeItemNeededQuantity = 0;
        _.forEach(recipe.activeIngredientGroup.ingredients, function(ingredient) {
          if (ingredient.item.code === itemCode) {
            recipeItemNeededQuantity = ingredient.quantity * ctrl.mo.batchSize;
          } 
        });

        return recipeItemNeededQuantity;
      }


      ctrl.processLacking = function(quantity, itemCode, recipe, $index) {
        var totalQuantity = 0;
        
        _.forEach(recipe.activeIngredientGroup.ingredients, function(ingredient) {
          
          if (ingredient.item.code === itemCode) {
            
            totalQuantity += ingredient.quantity
          }
        });

        var result = quantity - (totalQuantity * ctrl.mo.batchSize);

        return (result > 0) ? 0 : Math.abs(result);
      }

      ctrl.createMo = function() {
        ctrl.mo.inventoryList = _.filter(ctrl.mo.inventoryList, function(inv) {
          return inv.controlNumber != 'N/A';
        });

          _.forEach(ctrl.mo.inventoryList, function(inv) {
            if (inv.moqReserved) {
              inv.moqReserved += ctrl.getRecipeItemQuantity(inv.item.code, ctrl.mo.recipe);
            } else {
              inv.moqReserved = ctrl.getRecipeItemQuantity(inv.item.code, ctrl.mo.recipe)
            }

            inv.quantity = inv.quantity - inv.moqReserved;
          });
         
          if (ctrl.mo.type == 'RM') {
            ctrl.mo.remainingBatchSize = ctrl.mo.batchSize;
          }
          
          console.log("createMo ", ctrl.mo);
          MoInventoryService.save(ctrl.mo).then(function() {
            $state.go('mo');
          });
         
      }
      
  }
  
  angular
    .module('admin.rnd')
    .controller('MoNewController', MoNewController);
  