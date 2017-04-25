angular.module('myApp')
    app.controller("chatCtrl", ['$rootScope','$scope', 'userService', function($rootScope, $scope, userService){
        // var vm = this;
        var socket = window.io('localhost:3000/');
        $scope.newMessage = undefined;
        $scope.messages = [];

        socket.emit("test", "we are passing in a message");
        socket.on("receive-message", function(msg){
            $scope.$apply(function(){
                console.log("received message");
                $scope.messages.push(msg);
            });

        });

        $scope.username = undefined;

        $scope.sendMessage = function(){
            var newMessage = {
                username: userService.user,
                message: $scope.newMessage
            };
            socket.emit("new-message", newMessage);
            $scope.newMessage = undefined;
        };

        $rootScope.$on('new-user', function(event, username){
            console.log("this is working ", "testing testing please please work");
            console.log(username);
            $scope.username = username;
        });

        $scope.$watch(function(){
            return $scope.username;
        }, function(){
            if ($scope.username){
                console.log("This is the value for username" ,$scope.username);
            }
        })

    }])
