//tripEditorController.js
(function () {
    "use strict";

    angular.module("app-trips")
        .controller("tripEditorController", tripEditorController);

    function tripEditorController($routeParams, $http, $route) {
        var vm = this;

        vm.tripName = $routeParams.tripName;
        vm.stops = [];
        vm.errorMessage = "";
        vm.successMessage = "";
        vm.isBusy = true;
        vm.newStop = {};

        var url = "/api/trips/" + vm.tripName + "/stops";

        $http.get(url)
        .then(function (response) {
            //success
            angular.copy(response.data, vm.stops);
            _showMap(vm.stops);
        }, function (err) {
            //failure
            vm.errorMessage = "Failed to load stops";
        })
        .finally(function () {
            vm.isBusy = false;
        });

        vm.deleteStop = function (stopID) {
            vm.isBusy = true;

            vm.Message = "Attempting to delete stop.";

            $http.post(url + "/" + stopID)
            .then(function (response) {
                angular.copy(response.data, vm.stops);
                vm.errorMessage = _showMap(vm.stops);
            }, function () {
                vm.Message = "Failed to delete stop.";
            })
            .finally(function () {
                vm.isBusy = false;
            });
        };

        vm.addStop = function (data) {
            vm.isBusy = true;

            $http.post(url, vm.newStop)
            .then(function (response) {
                //success
                vm.stops.push(response.data);
                vm.errorMessage = _showMap(vm.stops);
                vm.newStop = {};
            }, function () {
                //failure
                vm.errorMessage = "Failed to add new stop";
            })
            .finally(function () {
                vm.isBusy = false;
            });
        };

        vm.reloadRoute = function () {
            $route.reload();
        };
    }

    function _showMap(stops) {
        if (stops && stops.length > 1) {
            var mapStops = _.map(stops, function (item) {
                return {
                    lat: item.latitude,
                    long: item.longitude,
                    info: item.name
                };
            });

            //Show Map
            travelMap.createMap({
                stops: mapStops,
                selector: "#map",
                currentStop: 1,
                initialZoom: 3
            });

            return "";
        }
        else if(stops && stops.length < 2)
        {
            return "Must have at least 2 stops for the map to display.";
        }
    }
})();