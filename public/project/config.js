(function () {
    angular
        .module("TipTag")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl:"views/homepage.view.html",
                controller: "HomepageController",
                controllerAs: "model"
            })
            .otherwise({redirectTo: "/"});
    }
})();