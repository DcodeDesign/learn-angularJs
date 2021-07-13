

export default function ($location, $authService) {
        let vm = this;

        vm.login = login;

        initController();

        function initController() {
            // reset login status
            $authService.Logout();
        }

        function login() {
            vm.loading = true;
            $authService.Login(vm.email, vm.password, function (result) {

                if (result === true) {
                    $location.path('/');
                } else {
                    vm.error = 'Username or password is incorrect';
                    vm.loading = false;
                }
            });
        }
    }


