module.exports = function (app, model) {
    // var websites = [
    //     {"_id": 1, "name": "Facebook", "developerId": 4, "description": "Lorem"},
    //     {"_id": 2, "name": "Tweeter", "developerId": 4, "description": "Lorem"},
    //     {"_id": 3, "name": "Gizmodo", "developerId": 4, "description": "Lorem"},
    //     {"_id": 4, "name": "Tic Tac Toe", "developerId": 1, "description": "Lorem"},
    //     {"_id": 5, "name": "Checkers", "developerId": 1, "description": "Lorem"},
    //     {"_id": 6, "name": "Chess", "developerId": 2, "description": "Lorem"}
    // ];

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
        // var sites = [];
        // for (var i in websites) {
        //     if (userId == websites[i].developerId) {
        //         sites.push(websites[i]);
        //     }
        // }
        // res.json(sites);
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
        // var website = websites.find(function (website) {
        //     return website._id == id;
        // });
        // if (website) {
        //     res.json(website);
        // } else {
        //     res.sendStatus(404);
        // }
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
        // newWebsite._id = websites.length + 1;
        // newWebsite.developerId = userId;
        // websites.push(newWebsite);
        // res.json(newWebsite);
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
        // for (var i in websites) {
        //     if (websites[i]._id == id) {
        //         websites[i].name = newWebsite.name;
        //         websites[i].description = newWebsite.description;
        //         res.json(websites[i]);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
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
        // for (var i in websites) {
        //     if (websites[i]._id == id){
        //         websites.splice(i, 1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }
};