

/**
 *
 * @ngdoc module
 * @name admin.common
 *
 * @requires ui.router
 * @requires angular-loading-bar
 *
 * @description
 *
 * This is the admin.common module. It includes a run method that setups the loading bar.
 *
 **/
 angular
  .module('admin.common', [
    'ui.router',
    'angular-loading-bar',
    'ngCookies',
    'checklist-model',
    'angularUtils.directives.dirPagination'
  ])
   .run(function ($transitions, cfpLoadingBar) {
     $transitions.onStart({}, cfpLoadingBar.start);
     $transitions.onSuccess({}, cfpLoadingBar.complete);
   });
