(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {

        var pages = [
            {"_id": 1, "name": "Post 1", "websiteId": 4, "description": "Lorem"},
            {"_id": 2, "name": "Post 2", "websiteId": 4, "description": "Lorem"},
            {"_id": 3, "name": "Post 3", "websiteId": 4, "description": "Lorem"}
        ];

        var api = {
            "createPage": createPage,
            "updatePage": updatePage,
            "deletePage": deletePage,
            "findPageById": findPageById,
            "findPageByWebsiteId": findPageByWebsiteId
        };
        return api;

        function createPage(websiteId, page) {
            page._id = pages.length + 1;
            page.websiteId = websiteId;
            pages.push(page);
            return page;
        }

        function updatePage(pageId, page) {
            page._id = pageId;
            for (var i in pages) {
                if (pages[i]._id == pageId) {
                    pages[i] = page;
                    return page;
                }
            }
            return null;
        }

        function deletePage(pageId) {
            for (var i in pages) {
                if (pages[i]._id == pageId) {
                    pages.splice(i);
                }
            }
        }

        function findPageById(pageId) {
            for (var i in pages) {
                if (pages[i]._id == pageId) {
                    return pages[i];
                }
            }
            return null;
        }

        function findPageByWebsiteId(websiteId) {
            for (var i in pages) {
                if (pages[i].websiteId == websiteId) {
                    return pages[i];
                }
            }
            return null;
        }
    }
})();