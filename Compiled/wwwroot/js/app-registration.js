//app-registration.js
(function () {
    "use strict";

    angular.module("app-registration", ["simpleControls", "ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider.when("/", {
            controller: "registrationController",
            controllerAs: "vm",
            templateUrl: "/views/registerView.html"
        });

        $routeProvider.otherwise({ redirectTo: "/" });
    })
})();