var mongoose = require("mongoose");

//SCHEMA SETUP
var commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

//here, we use the signular name of the model which is "Comment" and not "Comments"
module.exports = mongoose.model("Comment", commentSchema);
