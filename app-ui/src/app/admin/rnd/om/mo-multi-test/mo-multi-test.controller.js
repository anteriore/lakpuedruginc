
function MoMultiTestController($state, RecipesService, FinishedGoodsService, InventoryService, $rootScope, MoInventoryService, _) {
    var ctrl = this;

    ctrl.mo = { batchSize: 0};
    ctrl.mo.company = $rootScope.selectedCompany;
    ctrl.inventoryList = [];
    ctrl.mo.type = "";
    ctrl.tests = [];


  FinishedGoodsService.list().then(function(response){
  		  console.log("list response: " + JSON.stringify(response.data));
        ctrl.finishedGoods = response.data;
        ctrl.filteredFinishedGoods = response.data;
      });

      RecipesService.list().then(function(response) {
        console.log("recipes list", response.data);
      });


      ctrl.reset = function() {
        ctrl.tests = [];
        ctrl.filteredFinishedGoods = ctrl.finishedGoods;
        ctrl.inventoryList = [];
        ctrl.mo.inventoryList = [];
      }
   

      ctrl.testRun = function() {
        console.log("finishedGood id: ", ctrl.mo.finishedGood.id);
        ctrl.tests.push({id: ctrl.mo.finishedGood.id, code: ctrl.mo.finishedGood.code, batchsize: ctrl.mo.batchSize});
        
        ctrl.filteredFinishedGoods = _.filter(ctrl.finishedGoods, (o) => {
          return !ctrl.tests.map(function(item) {
            return item['id'];
          }).includes(o.id);
        });
        
        RecipesService.listByFinishedGood(ctrl.mo.finishedGood.id).then(function(res) {
          if (res.data.length > 0) {
            ctrl.recipe = res.data[0];
            console.log("recipe received", ctrl.recipe);

            InventoryService.listByRecipeItemsOnInventory(ctrl.mo.company.id, ctrl.recipe.id).then(function(res) {
              if (res.data.length > 0) {
                _.forEach(res.data, function(inventory) {
                    var inventoryListIndex = ctrl.findInventoryItemIndex(inventory);
                    console.log("inventoryListIndex", inventoryListIndex);
                    if (!inventoryListIndex) {
                      inventory['moQuantity'] = ctrl.getRecipeItemQuantity(inventory.item.code, ctrl.recipe);
                      if (ctrl.mo.type == 'RM' && inventory.item.type.code == 'RM') {
                        ctrl.inventoryList.push(inventory);
                      } else if (ctrl.mo.type == 'PM' && inventory.item.type.code == 'PM') {
                        ctrl.inventoryList.push(inventory);
                      } else if (ctrl.mo.type == ''){
                        ctrl.inventoryList.push(inventory);
                      }
                    } else {
                      ctrl.inventoryList[index]['moQuantity'] += ctrl.getRecipeItemQuantity(inventory.item.code, ctrl.recipe);
                    }
                });

                ctrl.mo.inventoryList = ctrl.inventoryList;

                if (ctrl.inventoryList.length == 0) {
                  alert("Items needed for MO does not exist in inventory");
                }
              } else {
                alert("Inventory not found for finished good ");
              }

              _.forEach(ctrl.recipe.activeIngredientGroup.ingredients, function(ingredient) {
                var isInRecipe = false;
                _.forEach(ctrl.inventoryList, function(inv) {
                  if (inv.item && inv.item.code == ingredient.item.code) {
                    isInRecipe = true;
                  }
                });

                if (!isInRecipe) {
                  if (ctrl.mo.type == 'RM' && ingredient.item.type.code == 'RM') {
                    ctrl.inventoryList.push({controlNumber: 'N/A', item: ingredient.item, quantity: 0, moQuantity: ingredient.quantity});
                  } else if (ctrl.mo.type == 'PM' && ingredient.item.type.code == 'PM') {
                    ctrl.inventoryList.push({controlNumber: 'N/A', item: ingredient.item, quantity: 0, moQuantity: ingredient.quantity});
                  } else if (ctrl.mo.type == ''){
                    ctrl.inventoryList.push({controlNumber: 'N/A', item: ingredient.item, quantity: 0, moQuantity: ingredient.quantity});
                  }
                  
                }
            });
              
            });
          } else {
            alert("Recipe not found for finished good");
          }

       });
      }

      ctrl.findInventoryItemIndex = function(inventory) {
        for (var i = 0; i < ctrl.inventoryList.length; i++) {
          if (ctrl.inventoryList[i].id == inventory.id) {
            return i;
          }
        }


        return null;
      }

      ctrl.getRecipeItemQuantity = function(itemCode, recipe) {
        var result = 0;
        _.forEach(recipe.activeIngredientGroup.ingredients, function(ingredient) {
          if (ingredient.item.code === itemCode) {
            result = ingredient.quantity * ctrl.mo.batchSize;
          } 
        });

        return result;
      }


      ctrl.isPassed = function() {
        var totalResult = 0;
        _.forEach(ctrl.mo.inventoryList, function(inv) {
          totalResult += (inv.result) ? inv.result : 0;
        });

        return (totalResult == 0) ? 'PASSED' : 'FAILED';
      }

    


      ctrl.processLacking = function(q1, q2) {
        var result = q1 - q2;
        return (result > 0) ? 0 : Math.abs(result);
      }

      ctrl.createMo = function() {
          _.forEach(ctrl.mo.inventoryList, function(inv) {
            inv.quantity = inv.quantity - inv.moQuantity;
          });
          console.log("createMo ", ctrl.mo);
          MoInventoryService.save(ctrl.mo);
          alert("New Mo Created");
      }
      
  }
  
  angular
    .module('admin.rnd')
    .controller('MoMultiTestController', MoMultiTestController);
  