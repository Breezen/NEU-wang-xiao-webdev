module.exports = function () {
    var Schema = require("mongoose").Schema;

    var websiteSchema = Schema({
        _user: {type: Schema.Types.ObjectId, ref: "User"},
        name: String,
        description: String,
        pages: [{type: Schema.Types.ObjectId, ref: "Page"}],
        dateCreated: { type: Date, default: Date.now }
    }, {collection: "assignment.website"});

    return websiteSchema;
};