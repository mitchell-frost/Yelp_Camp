var mongoose   = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment    = require("./models/comment")

var data = [
    {
        name: "Cloud's Rest",
        image: "https://cdn.pixabay.com/photo/2018/12/24/22/19/camping-3893587_1280.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Rainbow Fair",
        image: "https://cdn.pixabay.com/photo/2017/08/04/20/04/camping-2581242_1280.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Cocolate Lake",
        image: "https://cdn.pixabay.com/photo/2016/09/05/12/48/camping-1646504__480.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
]

function seedDB(){
    //remove all campgrounds
    Campground.remove({}, function(err)
    {
        if(err)
        {
            console.log(err);
        }
        console.log("removed campgronds!");
        data.forEach(function(seed)
        {
            Campground.create(seed, function(err, campground)
            {
                if(err)
                {
                    console.log(err);
                } 
                else
                {
                    console.log("added a campground");
                    Comment.create(
                    {
                        text: "This place is great but I wish they had Wi-Fi",
                        author: "Colt"
                    }, function(err, comment)
                        { //second thing, the callback to Comment.create()
                        if(err) {
                            console.log(err);
                        } else {
                            campground.comments.push(comment); 
                            campground.save();
                            console.log("added a comment");
                        }
                    });//Comment.create()
                }
            });//Campground.create()
        });           
    }); //Campground.remove()
    //add a few campgrounds
}

module.exports = seedDB;
