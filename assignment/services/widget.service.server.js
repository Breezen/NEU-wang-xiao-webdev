module.exports = function (app) {
    var widgets = [
        { "_id": 1, "widgetType": "HEADER", "pageId": 3, "size": 2, "text": "GIZMODO"},
        { "_id": 2, "widgetType": "HEADER", "pageId": 3, "size": 4, "text": "Lorem ipsum"},
        { "_id": 3, "widgetType": "IMAGE", "pageId": 3, "width": "100%", "url": "http://lorempixel.com/400/200/"},
        { "_id": 4, "widgetType": "HTML", "pageId": 3, "text": "<p>Lorem ipsum</p>"},
        { "_id": 5, "widgetType": "HEADER", "pageId": 3, "size": 4, "text": "Lorem ipsum"},
        { "_id": 6, "widgetType": "YOUTUBE", "pageId": 3, "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": 7, "widgetType": "HTML", "pageId": 3, "text": "<p>Lorem ipsum</p>"}
    ];

    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    
    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        var results = [];
        for (var i in widgets) {
            if (pageId == widgets[i].pageId) {
                results.push(widgets[i]);
            }
        }
        res.json(results);
    }

    function findWidgetById(req, res) {
        var id = req.params.widgetId;
        var widget = widgets.find(function (widget) {
            return widget._id == id;
        });
        if (widget) {
            res.json(widget);
        } else {
            res.sendStatus(404);
        }
    }

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var newWidget = req.body;
        newWidget._id = widgets.length + 1;
        newWidget.pageId = pageId;
        widgets.push(newWidget);
        res.json(newWidget);
    }

    function updateWidget(req, res) {
        var id = req.params.widgetId;
        var newWidget = req.body;
        for (var i in widgets) {
            if (widgets[i]._id == id) {
                newWidget._id = id;
                widgets[i] = newWidget;
                res.json(widgets[i]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deleteWidget(req, res) {
        var id = req.params.widgetId;
        for (var i in widgets) {
            if (widgets[i]._id == id) {
                widgets.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
}