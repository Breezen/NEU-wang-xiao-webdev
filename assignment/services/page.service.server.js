module.exports = function (app, model) {
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    var pageModel = model.pageModel;

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(function (pages) {
                res.json(pages);
            }, function (err) {
                res.status(404).send(err);
            });
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
    }
};