module.exports = function (app, model) {
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);

    var widgetModel = model.widgetModel;

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                res.json(widgets);
            }, function (err) {
                res.status(404).send(err);
            });
    }

    function findWidgetById(req, res) {
        var id = req.params.widgetId;
        widgetModel
            .findWidgetById(id)
            .then(function (widget) {
                res.json(widget);
            }, function (err) {
                res.status(404).send(err);
            });
    }

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var newWidget = req.body;
        widgetModel
            .createWidget(pageId, newWidget)
            .then(function (widget) {
                res.json(widget);
            }, function (err) {
                res.status(500).send(err);
            });
    }

    function updateWidget(req, res) {
        var id = req.params.widgetId;
        var newWidget = req.body;
        widgetModel
            .updateWidget(id, newWidget)
            .then(function (widget) {
                res.json(widget);
            }, function (err) {
                res.status(500).send(err);
            });
    }

    function deleteWidget(req, res) {
        var id = req.params.widgetId;
        widgetModel
            .deleteWidget(id)
            .then(function (status) {
                res.json(status);
            }, function (err) {
                res.status(500).send(err);
            });
    }

    function uploadImage(req, res) {
        var id = req.body.widgetId;
        var path = "/uploads/" + req.file.filename;
        widgetModel
            .updateWidget(id, {path: path})
            .then(function (widget) {
                res.json(widget);
            }, function (err) {
                res.status(500).send(err);
            });

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var callbackUrl = "/assignment/index.html#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + id;
        res.redirect(callbackUrl);
    }
};