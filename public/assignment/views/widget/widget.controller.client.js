(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, $sce, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        function init() {
             WidgetService.findWidgetsByPageId(vm.pageId)
                 .success(function (widgets) {
                     vm.widgets = widgets;
                 });
        }
        init();

        vm.getTrustedHtml = function (html) {
            return $sce.trustAsHtml(html);
        }

        vm.getYouTubeEmbedUrl = function (widgetUrl) {
            var urlParts = widgetUrl.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }
    }

    function NewWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.widgetTypes = ["HEADER", "HTML", "IMAGE", "YOUTUBE"];

        vm.createWidget = function () {
            WidgetService.createWidget(vm.pageId, vm.widget)
                .success(function (res) {
                    alert("Widget created!");
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                });
        }
    }

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;

        function init() {
            WidgetService.findWidgetById(vm.widgetId)
                .success(function (widget) {
                    vm.widget = widget;
                });
        }
        init();

        vm.getEditorTemplateUrl = function (type) {
            return 'views/widget/editor/widget-' + type + '-editor.view.client.html';
        }
        
        vm.updateWidget = function () {
            WidgetService.updateWidget(vm.widgetId, vm.widget)
                .success(function (res) {
                    alert("Widget updated!");
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                });
        }

        vm.deleteWidget = function () {
            WidgetService.deleteWidget(vm.widgetId)
                .success(function (res) {
                    alert("Widget deleted!");
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                });
        }
    }

})();