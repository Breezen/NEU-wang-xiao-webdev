(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.websiteId = $routeParams.wid;
        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();
    }

    function NewPageController($routeParams, PageService) {
        var vm = this;
        vm.websiteId = $routeParams.wid;
        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();
    }

    function EditPageController($routeParams, PageService) {
        var vm = this;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();
    }

})();