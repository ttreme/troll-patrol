var app = angular.module("myApp",["ngRoute"]);
app.config(["$routeProvider", function ($routeProvider){
    $routeProvider
        .when("/home", {
            templateUrl: "routing/components/home/home.html",
            controller: "homeCtrl"

        })
        .when ("/chat", {
            templateUrl: "routing/components/chat/chat.html",
            controller: "chatCtrl"
        })
        .otherwise({
            redirectTo:"/home"
        })
}]);




