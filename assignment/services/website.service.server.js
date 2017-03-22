module.exports = function (app, model) {
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    var websiteModel = model.websiteModel;

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(function (websites) {
                res.json(websites);
            }, function (err) {
                res.status(404).send(err);
            });
    }
    
    function findWebsiteById(req, res) {
        var id = req.params.websiteId;
        websiteModel
            .findWebsiteById(id)
            .then(function (website) {
                res.json(website);
            }, function (err) {
                res.status(404).send(err);
            });
    }

    function createWebsite(req, res) {
        var userId = req.params.userId;
        var newWebsite = req.body;
        websiteModel
            .createWebsiteForUser(userId, newWebsite)
            .then(function (website) {
                res.json(website);
            }, function (err) {
                res.status(500).send(err);
            });
    }

    function updateWebsite(req, res) {
        var id = req.params.websiteId;
        var newWebsite = req.body;
        websiteModel
            .updateWebsite(id, newWebsite)
            .then(function (website) {
                res.json(website);
            }, function (err) {
                res.status(500).send(err);
            });
    }
    
    function deleteWebsite(req, res) {
        var id = req.params.websiteId;
        websiteModel
            .deleteWebsite(id)
            .then(function (status) {
                res.send(status);
            }, function (err) {
                res.status(500).send(err);
            });
    }
};