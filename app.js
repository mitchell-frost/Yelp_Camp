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

mongoose.connect("mongodb://localhost/yelp_camp_v6", { useNewUrlParser: true, useUnifiedTopology: true });
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

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    //show campgrounds from database
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user}); } // else
    }); //.find
});     //app.get();

app.post("/campgrounds", function(req, res){
    //make a form to add a new campground
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}
    //Create a new campground and save to database
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
    //redirect back to the campgrounds page with the new one added
});

// Add a new campground
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new.ejs");
    
});  

// SHOW - shows more info about any campground
app.get("/campgrounds/:id", function(req, res){
    //res.render("show");
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
}); 

//===================================================================================================================
// COMMENTS ROUTES
//===================================================================================================================

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    //find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else{
            Comment.create(req.body.comment, function(err, comment){
                if(err) {
                    console.log(err);
                    res.redirect("/campgrounds");
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

// AUTH ROUTES

// show register form
app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

// SHOW LOGIN FORM

app.get("/login", function(req,res){
    res.render("login");
});

// app.post("/login", middleware, callback);
app.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }
), function(req, res){
});

// LOGOUT ROUTES
app.get("/logout", function(req,res){
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else {
        res.redirect("/login");
    }
}

app.listen(3000, process.env.IP, function(){
    console.log("YelpCamp Server has started");
});