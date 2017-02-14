(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        var websiteId = $routeParams.wid;
        function init() {
            vm.pages = PageService.findPageByWebsiteId(websiteId);
        }
        init();
    }

    function NewPageController($routeParams, PageService) {
        var vm = this;
        var websiteId = $routeParams.wid;
        function init() {
            vm.pages = PageService.findPageByWebsiteId(websiteId);
        }
        init();
    }

    function EditPageController($routeParams, PageService) {
        var vm = this;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;
        function init() {
            vm.pages = PageService.findPageByWebsiteId(websiteId);
            vm.page = PageService.findPageById(pageId);
        }
        init();
    }

})();