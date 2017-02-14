(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();
    }

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();
        
        vm.createPage = function (page) {
            PageService.createPage(vm.websiteId, page);
            alert("Page created!");
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }
    }

    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();

        vm.updatePage = function (page) {
            PageService.updatePage(vm.pageId, page);
            alert("Page updated!");
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }
        
        vm.deletePage = function () {
            PageService.deletePage(vm.pageId);
            alert("Page deleted!");
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }
    }

})();