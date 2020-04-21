var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    Campground     = require("./models/campgrounds"),
    seedDB         = require("./seeds"),
    flash          = require("connect-flash"),
    Comment        = require("./models/comment"),
    User           = require("./models/user"),
    path           = require("path");

var CommentRoutes     = require("./routes/comments"),
    CampgroundRoutes  = require("./routes/campgrounds"),
    indexRoutes       = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp_v12", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname + '/public')));
app.use(methodOverride("_method"));
app.use(flash());
 
//seedDB(); //do not seed the database

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
    res.locals.error     = req.flash("error"); 
    res.locals.success   = req.flash("success"); 
    next();
}); 

app.use(indexRoutes);
app.use("/campgrounds", CampgroundRoutes);
app.use("/campgrounds/:id/comments", CommentRoutes);
         
app.listen(3000, process.env.IP, function(){
    console.log("YelpCamp Server has started");
});