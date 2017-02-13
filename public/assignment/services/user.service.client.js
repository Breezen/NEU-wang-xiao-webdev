(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    function userService() {

        var users = [
            {_id: 1, username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: 2, username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: 3, username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: 4, username: "xw", password: "xw", firstName: "Xiao", lastName: "Wang"}
        ];

        var api = {
            "createUser": createUser,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials
        };
        return api;

        function createUser(user) {
            user._id = users.length + 1;
            users.push(user);
            return user;
        }

        function updateUser(userId, user) {
            user._id = userId;
            for (var i in users) {
                if (users[i]._id == userId) {
                    users[i] = user;
                    return user;
                }
            }
            return null;
        }

        function deleteUser(userId) {
            for (var i in users) {
                if (users[i]._id == userId) {
                    users.splice(i);
                }
            }
        }
        
        function findUserById(userId) {
            for (var i in users) {
                if (users[i]._id == userId) {
                    return users[i];
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            for (var i in users) {
                if (users[i].username == username) {
                    return users[i];
                }
            }
            return null;
        }
        
        function findUserByCredentials(username, password) {
            for (var i in users) {
                if (users[i].username == username && users[i].password == password) {
                    return users[i];
                }
            }
            return null;
        }
    }
})();