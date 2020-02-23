
/**
 *
 * @ngdoc module
 * @name admin.purchasing
 *
 * @requires ui.router
 *
 * @description
 *
 * This is the purchasing module. It includes all of our components for the purchasing feature.
 *
 **/
angular
  .module('admin.purchasing', [
    'ui.router',
    'admin.shared',
    'admin.dashboard'
  ]);