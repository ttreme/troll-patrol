angular.module('myApp');
        app.controller("homeCtrl", ['$rootScope' ,'$scope',"userService", function($rootScope, $scope, userService){

            $scope.username = undefined;



            $scope.createUser = function(username,password){
                // console.log(username, password);
                userService.user = username;
                userService.passPassword(username,password);
                $scope.username = (username);
                $rootScope.$emit('new-user', username);

            }



        }]);


