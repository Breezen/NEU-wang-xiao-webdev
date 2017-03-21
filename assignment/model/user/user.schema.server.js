module.exports = function () {
    var Schema = require("mongoose").Schema;

    var userSchema = Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [{type: Schema.Types.ObjectId, ref: "Website"}],
        dateCreated: { type: Date, default: Date.now }
    }, {collection: "assignment.user"});

    return userSchema;
};