var searchForm = {
  bindings: {
    search: '=',
    placeholder: '@',
    button: '@',
    message: '@',
    onSubmit: '&',
  },
  templateUrl: './app-searchbox.html',
  controller: 'SearchBoxFormController'
};

angular
  .module('admin.common')
  .component('searchForm', searchForm);
