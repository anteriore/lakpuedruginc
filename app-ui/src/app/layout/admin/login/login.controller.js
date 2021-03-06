

function LoginController($state, $rootScope, $cookieStore, AuthService, UsersService) {
    var ctrl = this;

    ctrl.email = 'katharine@yahoo.com';
    ctrl.password = 'test';

    ctrl.login = function() {
      console.log("login: " + ctrl.email);
      AuthService.authenticate(ctrl.email, ctrl.password).then(function(response) {
        console.log("LOGIN.response: " + JSON.stringify(response));
        if (response.data) {
          $rootScope.accessToken = response.data.token;
          $cookieStore.put('accessToken', response.data.token);
          
          UsersService.me().then(function(response) {
            console.log("### UsersService.me: " + JSON.stringify(response.data));
            $rootScope.user = response.data;
            localStorage.setItem('currentUser', JSON.stringify($rootScope.user));
            $state.go('dashboard');
          });
        } else {
          console.log("####  FAILED TO LOGIN");
        }
        
      });
    }
};

/**
 * @ngdoc type
 * @module admin.common
 * @name AppController
 *
 */
angular
  .module('admin.common')
  .controller('LoginController', LoginController);