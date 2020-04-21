var mongoose = require("mongoose");

//SCHEMA SETUP
var commentSchema = new mongoose.Schema({
    text: String,
    author: String
});

//here, we use the signular name of the model which is "Comment" and not "Comments"
module.exports = mongoose.model("Comment", commentSchema);
