(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        function init() {
            WebsiteService.findWebsitesByUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                });
        }
        init();
    }

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        function init() {
            WebsiteService.findWebsitesByUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                });
        }
        init();

        vm.createWebsite = function (website) {
            WebsiteService.createWebsite(vm.userId, website)
                .success(function (res) {
                    alert("New website created!");
                    $location.url("/user/" + vm.userId + "/website");
                });
        }
    }

    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        function init() {
            WebsiteService.findWebsitesByUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                });
            WebsiteService.findWebsiteById(vm.websiteId)
                .success(function (website) {
                    vm.website = website;
                });
        }
        init();

        vm.updateWebsite = function (website) {
            WebsiteService.updateWebsite(vm.websiteId, website)
                .success(function (res) {
                    alert("Website updated!");
                    $location.url("/user/" + vm.userId + "/website");
                });
        }
        
        vm.deleteWebsite = function () {
            WebsiteService.deleteWebsite(vm.websiteId)
                .success(function (res) {
                    alert("Website deleted!");
                    $location.url("/user/" + vm.userId + "/website");
                });
        }
    }

})();