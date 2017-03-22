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
        var deferred = q.defer();
        website._user = userId;
        websiteModel.create(website, function (err, website) {
            if (err) { deferred.reject(err); }
            else { deferred.resolve(website); }
        });
        return deferred.promise;
    }
    
    function findAllWebsitesForUser(userId) {
        var deferred = q.defer();
        websiteModel.find({_user: userId}, function (err, websites) {
            if (err) { deferred.reject(err); }
            else { deferred.resolve(websites); }
        });
        return deferred.promise;
    }
    
    function findWebsiteById(websiteId) {
        var deferred = q.defer();
        websiteModel.findOne({_id: websiteId}, function (err, website) {
            if (err) { deferred.reject(err); }
            else { deferred.resolve(website); }
        });
        return deferred.promise;
    }
    
    function updateWebsite(websiteId, website) {
        var deferred = q.defer();
        websiteModel.update({_id: websiteId}, {$set: website}, function (err, website) {
            if (err) { deferred.reject(err); }
            else { deferred.resolve(website); }
        });
        return deferred.promise;
    }
    
    function deleteWebsite(websiteId) {
        var deferred = q.defer();
        websiteModel.remove({_id: websiteId}, function (err, status) {
            if (err) { deferred.reject(err); }
            else { deferred.resolve(status); }
        });
        return deferred.promise;
    }
};