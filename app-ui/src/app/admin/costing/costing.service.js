
function CostingService($http, globalConfig) {
  return {
    list: function() {
      return $http.get(globalConfig.baseUrl + '/rest/moCosting');
    },
    listByCompany: function(companyId) {
      return $http.get(globalConfig.baseUrl + '/rest/moCosting/company/' + companyId);
    },
    one: function(id) {
      return $http.get(globalConfig.baseUrl + '/rest/moCosting/' + id);
    },
    save: function(obj) {
      return $http.post(globalConfig.baseUrl + '/rest/moCosting', obj);
    },
    delete: function(id) {
      return $http.delete(globalConfig.baseUrl + '/rest/moCosting/' + id);
    }
  }
}


angular
  .module('admin.dashboard')
  .factory('CostingService', CostingService);