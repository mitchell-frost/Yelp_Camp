var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campgrounds"),
    Comment    = require("../models/comment");

//===================================================================================================================
// COMMENTS ROUTES
//===================================================================================================================

// NEW COMMENT

router.get("/new", isLoggedIn, function(req, res){
    //find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

//CREATE COMMENT

router.post("/", isLoggedIn, function(req, res){
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

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else {
        res.redirect("/login");
    }
}

module.exports = router;