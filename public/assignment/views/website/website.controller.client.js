(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController() {
        var vm = this;
    }

    function NewWebsiteController() {
        var vm = this;
    }

    function EditWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        var websiteId = $routeParams.wid;
        function init() {
            vm.website = WebsiteService.findWebsiteById(websiteId);
        }
        init();
    }

})();