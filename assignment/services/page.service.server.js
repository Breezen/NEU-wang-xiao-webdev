module.exports = function (app) {
    var pages = [
        {"_id": 1, "name": "Post 1", "websiteId": 4, "description": "Lorem"},
        {"_id": 2, "name": "Post 2", "websiteId": 4, "description": "Lorem"},
        {"_id": 3, "name": "Post 3", "websiteId": 4, "description": "Lorem"}
    ];

    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var results = [];
        for (var i in pages) {
            if (websiteId == pages[i].websiteId) {
                results.push(pages[i]);
            }
        }
        res.json(results);
    }

    function findPageById(req, res) {
        var id = req.params.pageId;
        var page = pages.find(function (page) {
            return page._id == id;
        });
        if (page) {
            res.json(page);
        } else {
            res.sendStatus(404);
        }
    }

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var newPage = req.body;
        newPage._id = pages.length + 1;
        newPage.websiteId = websiteId;
        pages.push(newPage);
        res.json(newPage);
    }

    function updatePage(req, res) {
        var id = req.params.pageId;
        var newPage = req.body;
        for (var i in pages) {
            if (pages[i]._id == id) {
                pages[i].name = newPage.name;
                pages[i].description = newPage.description;
                res.json(pages[i]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deletePage(req, res) {
        var id = req.params.pageId;
        for (var i in pages) {
            if (pages[i]._id == id) {
                pages.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
}