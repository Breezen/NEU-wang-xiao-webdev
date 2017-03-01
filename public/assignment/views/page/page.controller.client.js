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
             PageService.findPageByWebsiteId(vm.websiteId)
                 .success(function (pages) {
                     vm.pages = pages;
                 });
        }
        init();
    }

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        function init() {
            PageService.findPageByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                });
        }
        init();
        
        vm.createPage = function (page) {
            PageService.createPage(vm.websiteId, page)
                .success(function (res) {
                    alert("Page created!");
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                });
        }
    }

    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        function init() {
            PageService.findPageByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                });
            PageService.findPageById(vm.pageId)
                .success(function (page) {
                    vm.page = page;
                });
        }
        init();

        vm.updatePage = function (page) {
            PageService.updatePage(vm.pageId, page)
                .success(function (res) {
                    alert("Page updated!");
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                });
        }
        
        vm.deletePage = function () {
            PageService.deletePage(vm.pageId)
                .success(function (res) {
                    alert("Page deleted!");
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                });
        }
    }

})();