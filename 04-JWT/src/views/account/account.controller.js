export default function ($http) {
    let vm = this;

    initController();

    function initController() {
        $http.get('http://localhost:3000/api/user/current')
            .then(function (response) {
                vm.name = response.data.name;
                vm.email = response.data.email
            });
    }
}


