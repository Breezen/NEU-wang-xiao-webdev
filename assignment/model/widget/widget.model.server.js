module.exports = function () {
    var q = require("q");
    var mongoose = require("mongoose");
    var widgetSchema = require("./widget.schema.server.js")();
    var widgetModel = mongoose.model("Widget", widgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget
    };
    return api;

    function createWidget(pageId, widget) {
        var deferred = q.defer();
        widget._page = pageId;
        widgetModel.create(widget, function (err, widget) {
            if (err) { deferred.abort(err); }
            else { deferred.resolve(widget); }
        });
        return deferred.promise;
    }

    function findAllWidgetsForPage(pageId) {
        var deferred = q.defer();
        widgetModel.find({_page: pageId}, function (err, widgets) {
            if (err) { deferred.abort(err); }
            else { deferred.resolve(widgets); }
        });
        return deferred.promise;
    }

    function findWidgetById(widgetId) {
        var deferred = q.defer();
        widgetModel.findOne({_id: widgetId}, function (err, widget) {
            if (err) { deferred.abort(err); }
            else { deferred.resolve(widget); }
        });
        return deferred.promise;
    }

    function updateWidget(widgetId, widget) {
        var deferred = q.defer();
        widgetModel.update({_id: widgetId}, {$set: widget}, function (err, widget) {
            if (err) { deferred.abort(err); }
            else { deferred.resolve(widget); }
        });
        return deferred.promise;
    }

    function deleteWidget(widgetId) {
        var deferred = q.defer();
        widgetModel.remove({_id: widgetId}, function (err, status) {
            if (err) { deferred.abort(err); }
            else { deferred.resolve(status); }
        });
        return deferred.promise;
    }

    function reorderWidget(pageId, start, end) {
        
    }
};