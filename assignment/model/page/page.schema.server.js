module.exports = function () {
    var Schema = require("mongoose").Schema;

    var pageSchema = Schema({
        _website: {type: Schema.Types.ObjectId, ref: "Website"},
        name: String,
        title: String,
        description: String,
        widgets: [{type: Schema.Types.ObjectId, ref: "Widget"}],
        dateCreated: { type: Date, default: Date.now }
    }, {collection: "assignment.page"});

    return pageSchema;
};