var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Comment = require("../models/comment");
var Campground = require("../models/campgrounds");

// ROOT ROUTE

router.get("/", function(req, res){
    res.render("landing");
});

//===============================================================================================================================
// AUTH ROUTES
//===============================================================================================================================

// show register form
router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req,res){
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

router.get("/login", function(req,res){
    res.render("login");
});

// app.post("/login", middleware, callback);
// LOGIC FOR LOGIN

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }
), function(req, res){
});

// LOGOUT ROUTES

router.get("/logout", function(req,res){
    req.logout();
    res.redirect("/campgrounds");
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