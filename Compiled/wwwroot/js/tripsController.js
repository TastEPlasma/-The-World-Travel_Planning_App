//tripsController.js
(function () {
    "use strict";

    //getting the existing module
    angular.module("app-trips")
        .controller("tripsController", tripsController);

    function tripsController($http) {
        var vm = this;

        vm.trips = [{
            name: "US Trip",
            created: new Date(),
            id: 0
        },
        {
            name: "World Trip",
            created: new Date(),
            id: 1
        }];

        vm.newTrip = {};

        vm.errorMessage = "";
        vm.isBusy = true;

        $http.get("/api/trips")
            .then(function (response) {
                //succeed
                angular.copy(response.data, vm.trips);
            }, function (error) {
                //fail
                vm.errorMessage = "Failed to load data: " + error;
            })
        .finally(function () {
            vm.isBusy = false;
        });

        vm.addTrip = function () {
            vm.isBusy = true;
            vm.errorMessage = "";

            $http.post("/api/trips", vm.newTrip)
            .then(function (response) {
                vm.trips.push(response.data);
                vm.newTrip = {};
            }, function () {
                vm.errorMessage = "Failed to save new trip";
            })
            .finally(function () {
                vm.isBusy = false;
            });
        };

        vm.deleteTrip = function (tripId) {
            vm.isBusy = true;
            vm.errorMessage = "";

            $http.post("/api/trips/DeleteTrip/" + tripId)
            .then(function (response) {
                angular.copy(response.data, vm.trips);
            }, function (error) {
                vm.errorMessage = "Failed to delete existing trip ";
            })
            .finally(function () {
                vm.isBusy = false;
            });
        };
    }
})();