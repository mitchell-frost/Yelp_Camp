var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var campgrounds = [
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
]

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("camgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    //make a form to add a new campground
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
    //redirect back to the campgrounds page with the new one added
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.listen(3000, process.env.IP, function(){
    console.log("YelpCamp Server has started");
});