module.exports = function () {
    var connectionString = "mongodb://127.0.0.1:27017/test";

    if(process.env.MLAB_USERNAME) {
        connectionString = "mongodb://" +
            process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }

    var mongoose = require("mongoose");
    mongoose.createConnection(connectionString);

    var model = {
        userModel: require("./user/user.model.server.js")(),
        websiteModel: require("./website/website.model.server.js")(),
        pageModel: require("./page/page.model.server.js")(),
        widgetModel: require("./widget/widget.model.server.js")()
    };
    return model;
};