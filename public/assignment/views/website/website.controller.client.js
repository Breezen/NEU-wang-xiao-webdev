(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        var userId = $routeParams.uid;
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(userId);
        }
        init();
    }

    function NewWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        var userId = $routeParams.uid;
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(userId);
        }
        init();
    }

    function EditWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(userId);
            vm.website = WebsiteService.findWebsiteById(websiteId);
        }
        init();
    }

})();