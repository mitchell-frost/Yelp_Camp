var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
});

var Campground = mongoose.model("Campground", campgroundSchema);

 /* Campground.create({
    name: "Magic Moments", 
    image:"https://cdn.pixabay.com/photo/2020/02/04/10/42/camping-4817872__340.jpg",
    description: "Nasha bohot hota hai. Mahadev dikh jaate hain."
}, function(err, campground){
    if(err){
        console.log(err);
    } else {
        console.log("NEWLY CREATED CAMPGROUND: ");
        console.log(campground);
    }
}); */

/* var campgrounds = [
    {name: "Salmon Creek", image:"https://cdn.pixabay.com/photo/2020/02/15/00/33/yoga-4849683__340.jpg"},
    {name: "Magic Moments", image:"https://cdn.pixabay.com/photo/2020/02/04/10/42/camping-4817872__340.jpg"},
    {name: "Old Monk", image:"https://cdn.pixabay.com/photo/2019/10/03/11/14/camp-4522970__340.jpg"},
    {name: "Salmon Creek", image:"https://cdn.pixabay.com/photo/2020/03/13/20/06/namibia-4929027__340.jpg"},
    {name: "Magic Moments", image:"https://cdn.pixabay.com/photo/2020/02/04/10/42/camping-4817872__340.jpg"},
    {name: "Old Monk", image:"https://cdn.pixabay.com/photo/2019/10/03/11/14/camp-4522970__340.jpg"},
    {name: "Salmon Creek", image:"https://cdn.pixabay.com/photo/2020/03/10/09/04/flower-4918361__340.jpg"},
    {name: "Magic Moments", image:"https://cdn.pixabay.com/photo/2020/02/04/10/42/camping-4817872__340.jpg"},
    {name: "Old Monk", image:"https://cdn.pixabay.com/photo/2019/10/03/11/14/camp-4522970__340.jpg"},
    {name: "Salmon Creek", image:"https://pixabay.com/photos/tent-camp-night-star-camping-548022/"},
    {name: "Magic Moments", image:"https://cdn.pixabay.com/photo/2020/02/04/10/42/camping-4817872__340.jpg"},
    {name: "Old Monk", image:"https://cdn.pixabay.com/photo/2019/10/03/11/14/camp-4522970__340.jpg"}
] */ 

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

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
    
});  

app.get("/campgrounds/:id", function(req, res){
    //res.render("show");
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err) {
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
}); 

app.listen(3000, process.env.IP, function(){
    console.log("YelpCamp Server has started");
});