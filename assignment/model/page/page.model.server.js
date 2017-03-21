module.exports = function () {
    var q = require("q");
    var mongoose = require("mongoose");
    var pageSchema = require("./page.schema.server.js")();
    var pageModel = mongoose.model("Page", pageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage
    };
    return api;

    function createPage(websiteId, page) {
        var deferred = q.defer();
        page._website = websiteId;
        pageModel.create(page, function (err, page) {
            if (err) { deferred.abort(err); }
            else { deferred.resolve(page); }
        });
        return deferred.promise;
    }
    
    function findAllPagesForWebsite(websiteId) {
        var deferred = q.defer();
        pageModel.find({_website: websiteId}, function (err, pages) {
            if (err) { deferred.abort(err); }
            else { deferred.resolve(pages); }
        });
        return deferred.promise;
    }

    function findPageById(pageId) {
        var deferred = q.defer();
        pageModel.findOne({_id: pageId}, function (err, page) {
            if (err) { deferred.abort(err); }
            else { deferred.resolve(page); }
        });
        return deferred.promise;
    }

    function updatePage(pageId, page) {
        var deferred = q.defer();
        pageModel.update({_id: pageId}, {$set: page}, function (err, page) {
            if (err) { deferred.abort(err); }
            else { deferred.resolve(page); }
        });
        return deferred.promise;
    }
    
    function deletePage(pageId) {
        var deferred = q.defer();
        pageModel.remove({_id: pageId}, function (err, status) {
            if (err) { deferred.abort(err); }
            else { deferred.resolve(status); }
        });
        return deferred.promise;
    }
};