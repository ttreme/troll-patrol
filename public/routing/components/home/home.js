angular.module('myApp');
        app.controller("homeCtrl", ['$rootScope' ,'$scope',"userService", function($rootScope, $scope, userService){

            $scope.username = undefined;

            $scope.createUser = function(username){
                userService.user = username;
                $scope.username = (username);
                $rootScope.$emit('new-user', username);

            }
            //
            // vm.createUser = function(username){
            //     console.log("firing")
            //     console.log("this is creating the user ", username);
            //     $rootScope.$emit('new-user', username);
            // }

        }]);


