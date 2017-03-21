module.exports = function (app, model) {
    // var users = [
    //     {_id: 1, username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
    //     {_id: 2, username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    //     {_id: 3, username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    //     {_id: 4, username: "xw", password: "xw", firstName: "Xiao", lastName: "Wang"}
    // ];

    app.get("/api/user", findUser);
    app.post("/api/user", createUser);
    app.get("/api/user/:userId", findUserByUserId);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username && password) {
            findUserByCredentials(req, res);
        } else if (username) {
            findUserByUsername(req, res);
        }
    }
    
    function findUserByUsername(req, res) {
        var username = req.query.username;
        model
            .findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.status(404).send(err);
            });
        // var user = users.find(function (u) {
        //     return u.username == username;
        // });
        // if (user) {
        //     res.json(user);
        // } else {
        //     res.sendStatus(404);
        // }
    }
    
    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        model
            .findUserByCredentials(username, password)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.status(404).send(err);
            });
        // var user = users.find(function (u){
        //     return u.username == username && u.password == password;
        // });
        // if (user) {
        //     res.json(user);
        // } else {
        //     res.sendStatus(404);
        // }
    }
    
    function findUserByUserId(req, res) {
        var userId = req.params.userId;
        model
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.status(404).send(err);
            });
        // var user = users.find(function (u) {
        //     return u._id == userId;
        // });
        // if (user) {
        //     res.json(user);
        // } else {
        //     res.sendStatus(404);
        // }
    }

    function createUser(req, res) {
        model
            .createUser(req.body)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.status(500).send(err);
            });
        // var newUser = req.body;
        // newUser._id = users.length + 1;
        // users.push(newUser);
        // res.json(newUser);
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        model
            .updateUser(userId, newUser)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.status(500).send(err);
            });
        // for (var i in users){
        //     if (users[i]._id == userId){
        //         users[i].firstName = newUser.firstName;
        //         users[i].lastName = newUser.lastName;
        //         res.json(users[i]);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }
    
    function deleteUser(req, res) {
        var userId = req.params.userId;
        model
            .deleteUser(userId)
            .then(function (status) {
                res.send(status);
            }, function (err) {
                res.status(500).send(err);
            });
        // for (var i in users) {
        //     if (users[i]._id == userId) {
        //         users.splice(i, 1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }
}