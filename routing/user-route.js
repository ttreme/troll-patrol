var express = require("express");
var userRoute = express.Router();
var User = require("../models/userSchema");


userRoute

    .get("/", function(req,res){
    res.render("home");
})
    .post("/", function (req, res){
    User.register(new User ({username: req.body.username}, req.body.password, function(err,User){
        if(err){
            console.log(err);
            return res.render("register")
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("routing/components/chat/chat.html");
        })
    }))
})

module.exports = userRoute;