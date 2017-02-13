(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {

        var websites = [
            {"_id": 1, "name": "Facebook", "developerId": 4, "description": "Lorem"},
            {"_id": 2, "name": "Tweeter", "developerId": 4, "description": "Lorem"},
            {"_id": 3, "name": "Gizmodo", "developerId": 4, "description": "Lorem"},
            {"_id": 4, "name": "Tic Tac Toe", "developerId": 1, "description": "Lorem"},
            {"_id": 5, "name": "Checkers", "developerId": 1, "description": "Lorem"},
            {"_id": 6, "name": "Chess", "developerId": 2, "description": "Lorem"}
        ];

        var api = {
            "createWebsite": createWebsite,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite,
            "findWebsiteById": findWebsiteById,
            "findWebsitesByUser": findWebsitesByUser
        };
        return api;

        function createWebsite(userId, website) {
            website._id = websites.length + 1;
            website.developerId = userId;
            websites.push(website);
            return website;
        }

        function updateWebsite(websiteId, website) {
            website._id = websiteId;
            for (var i in websites) {
                if (websites[i]._id == websiteId) {
                    websites[i] = website;
                    return website;
                }
            }
            return null;
        }

        function deleteWebsite(websiteId) {
            for (var i in websites) {
                if (websites[i]._id == websiteId) {
                    websites.splice(i);
                }
            }
        }

        function findWebsiteById(websiteId) {
            for (var i in websites) {
                if (websites[i]._id == websiteId) {
                    return websites[i];
                }
            }
            return null;
        }

        function findWebsitesByUser(userId) {
            for (var i in websites) {
                if (websites[i].developerId == userId) {
                    return websites[i];
                }
            }
            return null;
        }
    }
})();