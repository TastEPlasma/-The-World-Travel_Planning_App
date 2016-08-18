//registerController.js
(function () {
    "use strict";

    angular.module("app-registration")
        .controller("registrationController", registrationController);

    function registrationController($http, $location) {
        var vm = this;

        vm.errorMessage = "";
        vm.isBusy = false;
        vm.newUser = {};

        var url = "/api/register"; //API call url

        vm.addUser = function (data) {
            vm.isBusy = true;

            $http.post(url, vm.newUser)
            .then(function (response) {
                vm.successMessage = "Account created successfully!  Click here to Login.";
            }, function (response) {
                vm.errorMessage = "Error, account not created!";
            })
            .finally(function () {
                vm.isBusy = false;
            });
        }
    }
})();