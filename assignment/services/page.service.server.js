module.exports = function (app, model) {
    // var pages = [
    //     {"_id": 1, "name": "Post 1", "websiteId": 4, "description": "Lorem"},
    //     {"_id": 2, "name": "Post 2", "websiteId": 4, "description": "Lorem"},
    //     {"_id": 3, "name": "Post 3", "websiteId": 4, "description": "Lorem"}
    // ];

    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    // var websiteModel = model.websiteModel;
    var pageModel = model.pageModel;
    // var widgetModel = model.widgetModel;

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(function (pages) {
                res.json(pages);
            }, function (err) {
                res.status(404).send(err);
            });
        // var results = [];
        // for (var i in pages) {
        //     if (websiteId == pages[i].websiteId) {
        //         results.push(pages[i]);
        //     }
        // }
        // res.json(results);
    }

    function findPageById(req, res) {
        var id = req.params.pageId;
        pageModel
            .findPageById(id)
            .then(function (page) {
                res.json(page);
            }, function (err) {
                res.status(404).send(err);
            });
        // var page = pages.find(function (page) {
        //     return page._id == id;
        // });
        // if (page) {
        //     res.json(page);
        // } else {
        //     res.sendStatus(404);
        // }
    }

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var newPage = req.body;
        pageModel
            .createPage(websiteId, newPage)
            .then(function (page) {
                res.json(page);
            }, function (err) {
                res.status(500).send(err);
            });
        // newPage._id = pages.length + 1;
        // newPage.websiteId = websiteId;
        // pages.push(newPage);
        // res.json(newPage);
    }

    function updatePage(req, res) {
        var id = req.params.pageId;
        var newPage = req.body;
        pageModel
            .updatePage(id, newPage)
            .then(function (page) {
                res.json(page);
            }, function (err) {
                res.status(500).send(err);
            });
        // for (var i in pages) {
        //     if (pages[i]._id == id) {
        //         pages[i].name = newPage.name;
        //         pages[i].description = newPage.description;
        //         res.json(pages[i]);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }

    function deletePage(req, res) {
        var id = req.params.pageId;
        pageModel
            .deletePage(id)
            .then(function (status) {
                res.send(status);
            }, function (err) {
                res.status(500).send(err);
            });
        // for (var i in pages) {
        //     if (pages[i]._id == id) {
        //         pages.splice(i, 1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }
};