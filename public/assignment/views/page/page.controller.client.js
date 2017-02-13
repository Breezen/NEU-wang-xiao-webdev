(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController() {
        var vm = this;
    }

    function NewPageController() {
        var vm = this;
    }

    function EditPageController($routeParams, PageService) {
        var vm = this;
        var pageId = $routeParams.pid;
        function init() {
            vm.page = PageService.findPageById(pageId);
        }
        init();
    }

})();