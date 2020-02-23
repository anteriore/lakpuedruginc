function RecipesService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/recipes');
	};

	this.save = function(recipe) {
		return $http.post(globalConfig.baseUrl + '/rest/recipes', recipe);
	};

	this.update = function(recipe) {
		return $http.post(globalConfig.baseUrl + '/rest/recipes/', recipe);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/recipes/' + id);
	};
	
	this.listByStatus = function(status) {
		return $http.get(globalConfig.baseUrl + '/rest/recipes/status/' + status);
	};
	
	this.listByFinishedGood = function(finishedGoodId) {
		return $http.get(globalConfig.baseUrl + '/rest/recipes/finished-good/' + finishedGoodId);
	};
	
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/recipes/delete/',id);
	};
}

/**
 * @ngdoc service
 * @name RecipesService
 * @module components.auth
 *
 */
angular.module('admin.rnd').service('RecipesService', RecipesService);
