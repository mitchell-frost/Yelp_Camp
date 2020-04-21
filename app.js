var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    Campground     = require("./models/campgrounds"),
    seedDB         = require("./seeds"); 

mongoose.connect("mongodb://localhost/yelp_camp_v3", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    //show campgrounds from database
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds}); } // else
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
    res.render("new.ejs");
    
});  

// SHOW - shows more info about any campground
app.get("/campgrounds/:id", function(req, res){
    //res.render("show");
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("show", {campground: foundCampground});
        }
    });
}); 

app.listen(3000, process.env.IP, function(){
    console.log("YelpCamp Server has started");
});