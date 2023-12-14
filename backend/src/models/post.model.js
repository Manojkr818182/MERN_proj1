const mongoose = require('mongoose');

const schema = mongoose.Schema;

const postSchema = new schema(
    {
        title: {
            type: String,
            default: ""
        },
        content: {
            type: String,
            default: ""
        },
        img_urls: {
            type: Array,
            default: []
        },
        author: {
            type: mongoose.Types.ObjectId,
            ref: "user"
        },
        comments: [{ type: mongoose.Types.ObjectId, ref: "comment" }],
        likes: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    },
    {
        timestamps: true
    }
);

const Post = mongoose.model('post', postSchema);
module.exports = Post;