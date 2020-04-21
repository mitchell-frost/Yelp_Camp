var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    Campground     = require("./models/campgrounds"),
    seedDB         = require("./seeds"),
    Comment        = require("./models/comment"),
    User           = require("./models/user"),
    path           = require("path");

var CommentRoutes     = require("./routes/comments"),
    CampgroundRoutes  = require("./routes/campgrounds"),
    indexRoutes       = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp_v7", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname + '/public')));
seedDB();

//  PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "mitchell frost",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
}); 

app.use(indexRoutes);
app.use("/campgrounds", CampgroundRoutes);
app.use("/campgrounds/:id/comments", CommentRoutes);
         
app.listen(3000, process.env.IP, function(){
    console.log("YelpCamp Server has started");
});