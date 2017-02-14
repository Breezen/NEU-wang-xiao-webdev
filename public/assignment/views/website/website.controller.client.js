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
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();
    }

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();

        vm.createWebsite = function (website) {
            WebsiteService.createWebsite(vm.userId, website);
            alert("New website created!");
            $location.url("/user/" + vm.userId + "/website");
        }
    }

    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

        vm.updateWebsite = function (website) {
            WebsiteService.updateWebsite(vm.websiteId, website);
            alert("Website updated!");
            $location.url("/user/" + vm.userId + "/website");
        }
        
        vm.deleteWebsite = function () {
            WebsiteService.deleteWebsite(vm.websiteId);
            alert("Website deleted!");
            $location.url("/user/" + vm.userId + "/website");
        }
    }

})();