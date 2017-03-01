module.exports = function (app) {
    var users = [
        {_id: 1, username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: 2, username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: 3, username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: 4, username: "xw", password: "xw", firstName: "Xiao", lastName: "Wang"}
    ];

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
        var user = users.find(function (u) {
            return u.username == username;
        });
        if (user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    }
    
    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        var user = users.find(function (u){
            return u.username == username && u.password == password;
        });
        if (user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    }
    
    function findUserByUserId(req, res) {
        var userId = req.params.userId;
        var user = users.find(function (u) {
            return u._id == userId;
        });
        if (user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    }

    function createUser(req, res) {
        var newUser = req.body;
        newUser._id = users.length + 1;
        users.push(newUser);
        res.json(newUser);
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        for (var i in users){
            if (users[i]._id == userId){
                users[i].firstName = newUser.firstName;
                users[i].lastName = newUser.lastName;
                res.json(users[i]);
                return;
            }
        }
        res.sendStatus(404);
    }
    
    function deleteUser(req, res) {
        var userId = req.params.userId;
        for (var i in users) {
            if (users[i]._id == userId) {
                users.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
}