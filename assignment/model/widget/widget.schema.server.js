module.exports = function () {
    var Schema = require("mongoose").Schema;

    var widgetSchema = Schema({
        _page: {type: Schema.Types.ObjectId, ref: "Page"},
        widgetType: {
            type: String,
            enum: ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT']
        },
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: { type: Date, default: Date.now }
    }, {collection: "assignment.widget"});

    return widgetSchema;
};