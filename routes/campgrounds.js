var express = require("express");
var router  = express.Router();
var Campground = require("../models/campgrounds"),
    Comment    = require("../models/comment");

//INDEX OF SHOW CAMPGROUNDS
router.get("/", function(req, res){
    //show campgrounds from database
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user}); } // else
    }); //.find
});     //app.get();

router.post("/", function(req, res){
    //make a form to add a new campground
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, description: desc, author: author}
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
router.get("/new", isLoggedIn, function(req, res){
    res.render("campgrounds/new.ejs");
    
});  

// SHOW - shows more info about any campground
router.get("/:id", isLoggedIn, function(req, res){
    //res.render("show");
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
}); 

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else {
        res.redirect("/login");
    }
}

module.exports = router;