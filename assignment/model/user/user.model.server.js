module.exports = function () {
    var q = require("q");
    var mongoose = require("mongoose");
    var userSchema = require("./user.schema.server.js")();
    var userModel = mongoose.model("User", userSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    function createUser(user) {
        var d = q.defer();
        userModel.create(user, function (err, user) {
            if (err) { d.reject(err); }
            else { d.resolve(user); }
        });
        return d.promise;
    }
    
    function findUserById(userId) {
        var d = q.defer();
        userModel.findOne({_id: userId}, function (err, user) {
            if (err) { d.reject(err); }
            else { d.resolve(user); }
        });
        return d.promise;
    }
    
    function findUserByUsername(username) {
        var d = q.defer();
        userModel.findOne({username: username}, function (err, user) {
            if (err) { d.reject(err); }
            else { d.resolve(user); }
        });
        return d.promise;
    }
    
    function findUserByCredentials(username, password) {
        var d = q.defer();
        userModel.findOne({username: username, password: password}, function (err, user) {
            if (err) { d.reject(err); }
            else { d.resolve(user); }
        });
        return d.promise;
    }
    
    function updateUser(userId, user) {
        var d = q.defer();
        userModel.update({_id: userId}, {$set: user}, function (err, user) {
                if (err) { d.reject(err); }
                else { d.resolve(user); }
            }
        );
        return d.promise;
    }
    
    function deleteUser(userId) {
        var d = q.defer();
        userModel.remove({_id: userId}, function (err, status) {
            if (err) { d.reject(err); }
            else { d.resolve(status); }
        });
        return d.promise;
    }
};