const mongoose = require('mongoose');

const schema = mongoose.Schema;

const commentSchema = new schema(
    {
        comment_text: {
            type: String,
            default: ""
        },
        author: {
            type: mongoose.Types.ObjectId,
            ref: "user"
        },
        parent_comment_id:{
            type: mongoose.Types.ObjectId,
            ref:'comment'
        },
        comments: [{ type: mongoose.Types.ObjectId, ref: "comment" }],
    },
    {
        timestamps: true
    }
);

const Comment = mongoose.model('comment', commentSchema);
module.exports = Comment;