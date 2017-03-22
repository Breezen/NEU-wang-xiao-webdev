module.exports = function () {
    var q = require("q");
    var mongoose = require("mongoose");
    var websiteSchema = require("./website.schema.server.js")();
    var websiteModel = mongoose.model("Website", websiteSchema);

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    };
    return api;

    function createWebsiteForUser(userId, website) {
        var d = q.defer();
        website._user = userId;
        websiteModel.create(website, function (err, website) {
            if (err) { d.reject(err); }
            else { d.resolve(website); }
        });
        return d.promise;
    }
    
    function findAllWebsitesForUser(userId) {
        var d = q.defer();
        websiteModel.find({_user: userId}, function (err, websites) {
            if (err) { d.reject(err); }
            else { d.resolve(websites); }
        });
        return d.promise;
    }
    
    function findWebsiteById(websiteId) {
        var d = q.defer();
        websiteModel.findOne({_id: websiteId}, function (err, website) {
            if (err) { d.reject(err); }
            else { d.resolve(website); }
        });
        return d.promise;
    }
    
    function updateWebsite(websiteId, website) {
        var d = q.defer();
        websiteModel.update({_id: websiteId}, {$set: website}, function (err, website) {
            if (err) { d.reject(err); }
            else { d.resolve(website); }
        });
        return d.promise;
    }
    
    function deleteWebsite(websiteId) {
        var d = q.defer();
        websiteModel.remove({_id: websiteId}, function (err, status) {
            if (err) { d.reject(err); }
            else { d.resolve(status); }
        });
        return d.promise;
    }
};