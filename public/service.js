angular.module("myApp")

app.service("userService", ["$http", function ($http){
     this.user = "";
     // this.password = "";

     this.passPassword = function(username,password){
         console.log(username,password);
         console.log("password pass sucess")
         return $http.post("/user",{username: username, password: password}).then(function(response){
             return response.data;
         })
     }


}]);