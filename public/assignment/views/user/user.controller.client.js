(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = function (user) {
            user = UserService.findUserByCredentials(user.username, user.password);
            if(user) {
                $location.url("/user/" + user._id);
            } else {
                alert("Unable to login");
            }
        }
    }
    
    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = function (user) {
            if (user.password != user.passwordVerified) {
                alert("Passwords different!");
            } else {
                user = UserService.createUser(user);
                $location.url("/user/" + user._id);
            }
        }
    }
    
    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }
        init();

        vm.update = function (user) {
            UserService.updateUser(vm.userId, user);
            alert("Profile updated!");
        }
    }

})();