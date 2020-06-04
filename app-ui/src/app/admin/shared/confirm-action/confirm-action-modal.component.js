var confirmActionModal = {
  bindings: {
    client: '=',
    button: '@',
    message: '@',
  },
  templateUrl: './confirm-action-modal.html',
  controller: 'ConfirmActionModalController',
};

angular
  .module('admin.shared')
  .component('confirmActionModal', confirmActionModal);
