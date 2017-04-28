
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require ("passport-local").Strategy,
    User            = require ("./models/userSchema"),
    UserRoute       = require("./routing/user-route"),
    path            = require("path"),
    http            = require("http").Server(app),
    io              = require("socket.io")(http);

app.use(express.static("public"));
app.use(bodyParser.json());
app.use("/user", UserRoute);
//passport config
app.use(require("express-session")({
    secret: "tacos are nice",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
passport.use(new LocalStrategy(function(username, password, done){
    User.findOne({username: username, password: password}, function(err,user){
        if(err){return done(err); }
        if(!user){return done(null, false)}
        return done(null, user);
    })
}));
passport.serializeUser(function(user, done){
    done(null,user);
})
passport.deserializeUser(function(user,done){
    User.findById(user._id, function(err, user){
        done(err,user);
    })
})
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, "../troll-patrol/public", '/index.html'));
});
io.on('connection', function(socket){
    console.log("a user connected");
    socket.on("new-message", function(msg){
        console.log(msg);
        io.emit("receive-message", msg);
    })
});
mongoose.connect("mongodb://localhost/troll-patrol", function(err){
    if(err)throw err;
    console.log("connected to DB");
})

http.listen(3000, function () {
   console.log('The Server Lives on port 3000')
});



