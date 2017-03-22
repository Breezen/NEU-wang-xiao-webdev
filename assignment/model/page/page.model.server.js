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
        var d = q.defer();
        page._website = websiteId;
        pageModel.create(page, function (err, page) {
            if (err) { d.reject(err); }
            else { d.resolve(page); }
        });
        return d.promise;
    }
    
    function findAllPagesForWebsite(websiteId) {
        var d = q.defer();
        pageModel.find({_website: websiteId}, function (err, pages) {
            if (err) { d.reject(err); }
            else { d.resolve(pages); }
        });
        return d.promise;
    }

    function findPageById(pageId) {
        var d = q.defer();
        pageModel.findOne({_id: pageId}, function (err, page) {
            if (err) { d.reject(err); }
            else { d.resolve(page); }
        });
        return d.promise;
    }

    function updatePage(pageId, page) {
        var d = q.defer();
        pageModel.update({_id: pageId}, {$set: page}, function (err, page) {
            if (err) { d.reject(err); }
            else { d.resolve(page); }
        });
        return d.promise;
    }
    
    function deletePage(pageId) {
        var d = q.defer();
        pageModel.remove({_id: pageId}, function (err, status) {
            if (err) { d.reject(err); }
            else { d.resolve(status); }
        });
        return d.promise;
    }
};