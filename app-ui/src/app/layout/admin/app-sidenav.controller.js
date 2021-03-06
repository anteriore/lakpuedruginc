

function AppSideNavController($state, $rootScope) {
    var ctrl = this;

    ctrl.isPageWithSubMenu = false;
    ctrl.currentUser = { firstName: "Unknown user", department: { name: 'No ' } };

    ctrl.$onInit = function () {
        var currentUser = localStorage.getItem('currentUser');
        if (currentUser != null) {
            ctrl.currentUser = JSON.parse(currentUser);
        }
    }

    var checkPermission = function (code) {
        if (ctrl.currentUser.permissions[code]) {
            if (ctrl.currentUser.permissions[code].actions !== '') {
                return true;
            }
        }

        return false;
    }

    ctrl.showTabs = function (page) {
        if (checkPermission('superadmin')) {
            return true;
        }

        switch (page) {
            case 'DASHBOARD':
                return true;
                break;
            case 'USERS':
                return checkPermission('admin-dac') || checkPermission('admin-gc');
                break;
            case 'MMD':
                return checkPermission('mmd-p') || checkPermission('mmd-r');
                break;
            case 'RND':
                return checkPermission('rnd-recipe') || checkPermission('rnd-report') || checkPermission('rnd-items');
                break;
            case 'PURCHASING':
                return checkPermission('purchasing-po') || checkPermission('purchasing-r') || checkPermission('purchasing-v');
                break;
            case 'BUILDING1':
                return checkPermission('building1-jo') || checkPermission('building1-r');
                break;
            default:
                return false;
        }
    }


    ctrl.navList = {
        "/admin/dashboard": { withSub: false },
        "/admin/users": { withSub: false },
        "/admin/mmd": { withSub: false },
        "/admin/rnd": { withSub: true },
        "/admin/purchasing": { withSub: false },
        "/admin/costing": { withSub: false },
        "/admin/job_order": { withSub: false },
        "/admin/accounting": {withSub: false},
        "/admin/sales": {withSub: false},
        "/admin/maintenance": {withSub: false}

    }

    ctrl.getPathname = function () {
        return window.location.pathname;
    }

    ctrl.checkSub = function (location) {
        console.log('checkSub: ' + location);
        ctrl.isPageWithSubMenu = ctrl.navList[location].withSub;
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
    .controller('AppSideNavController', AppSideNavController);