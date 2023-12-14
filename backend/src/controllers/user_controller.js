const { ERROR_CODE, ERROR_MESSEGE } = require('../utils/error_code');
const { MESSAGE } = require('../utils/message_code');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const Post = require('../models/post.model');
const Comment = require('../models/coments.model');
const utils = require('../utils/utils');

exports.signup = (req, res) => {
    User.findOne({ phone: req.body.phone }).then((user_data) => {
        if (user_data) {
            return res.json({
                code: ERROR_CODE.PHONE_ALLREADY_USED,
                message: ERROR_MESSEGE.PHONE_ALLREADY_USED
            })
        }
        User.findOne({ email: req.body.email }).then((user_detail) => {
            if (user_detail) {
                return res.json({
                    code: ERROR_CODE.EMAIL_ALLREADY_USED,
                    message: ERROR_MESSEGE.EMAIL_ALLREADY_USED
                })
            }
            const user = new User({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                phone: req.body.phone,
                email: req.body.email,
                password: req.body.password,
            });
            user.save().then((user_details) => {
                res.json({
                    code: 1,
                    message: MESSAGE.REGISTER_SUCCESSFULLY,
                    data: user_details
                })
            }).catch(err => {
                res.json({
                    code: ERROR_CODE.SERVER_ERROR,
                    message: err.toString()
                })
            })
        }).catch(err => {
            res.json({
                code: ERROR_CODE.SERVER_ERROR,
                message: err.toString()
            })
        })
    }).catch(err => {
        res.json({
            code: ERROR_CODE.SERVER_ERROR,
            message: err.toString()
        })
    })
};

exports.login = (req, res) => {
    User.findOne({ email: req.body.email }).then((user_detail) => {
        if (!user_detail) {
            return res.json({
                code: ERROR_CODE.INVALID_LOGIN_CREDENTIAL,
                message: ERROR_MESSEGE.INVALID_LOGIN_CREDENTIAL
            })
        }
        bcrypt.compare(req.body.password, user_detail.password).then(async (isMatched) => {
            if (!isMatched) {
                return res.json({
                    code: ERROR_CODE.INVALID_LOGIN_CREDENTIAL,
                    message: ERROR_MESSEGE.INVALID_LOGIN_CREDENTIAL
                })
            }
            const user_token = await utils.generateToken(user_detail._id.toString());
            user_detail.server_token = user_token;
            user_detail.save().then((user_details) => {
                res.json({
                    code: 1,
                    message: MESSAGE.LOGIN_SUCCESSFULLY,
                    data: user_details
                })
            }).catch(err => {
                res.json({
                    code: ERROR_CODE.SERVER_ERROR,
                    message: err.toString()
                })
            })
        }).catch(err => {
            res.json({
                code: ERROR_CODE.SERVER_ERROR,
                message: err.toString()
            })
        })
    }).catch(err => {
        res.json({
            code: ERROR_CODE.SERVER_ERROR,
            message: err.toString()
        })
    })
};

exports.createPost = (req, res) => {
    try {
        const user_id = req.user_id;
        var file_urls = []
        if (req.files != undefined) {
            for (let i = 0; i < req.files.length; i++) {
                file_urls.push(req.files[i].filename);
            }
        }
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            img_urls: file_urls,
            author: user_id
        });
        post.save().then((post_details) => {
            res.json({
                code: 1,
                message: MESSAGE.POST_CREATED_SUCCESSFULLY,
                data: post_details
            })
        }).catch(err => {
            return res.json({
                code: ERROR_CODE.SERVER_ERROR,
                message: err.toString()
            })
        })
    } catch (err) {
        return res.json({
            code: ERROR_CODE.SERVER_ERROR,
            message: err.toString()
        })
    }
};

exports.getPosts = (req, res) => {
    Post.find({}).then((post_list) => {
        res.json({
            code: 1,
            message: "post list",
            data: post_list
        })
    }).catch(err => {
        res.json({
            code: ERROR_CODE.SERVER_ERROR,
            message: err.toString()
        })
    })
};

exports.createComment = (req, res) => {
    const user_id = req.user_id;
    const comment = new Comment({
        comment_text: req.body.comment_text,
        author: user_id
    });
    comment.save().then((comment_data) => {
        Post.updateOne({ _id: req.body.post_id }, { $push: { comments: comment_data._id } }).then((post_detail) => {
            res.json({
                code: 1,
                message: 'commented !!',
                data: comment_data
            })
        }).catch(err => {
            res.json({
                code: ERROR_CODE.SERVER_ERROR,
                message: err.toString()
            })
        })
    }).catch(err => {
        res.json({
            code: ERROR_CODE.SERVER_ERROR,
            message: err.toString()
        })
    })
};


exports.getPostsDetails = (req, res) => {
    Post.find({}).populate({
        path: 'comments',   //3rd level
        populate: {
            path: 'comments',
            populate: {
                path: 'comments',
                populate: {
                    path: 'author',
                    select: { '_id': 1, 'first_name': 1, 'last_name': 1 },
                }
            }
        }
    }).populate({
        path: 'comments', //2nd level
        populate: {
            path: 'comments',
            populate: {
                path: 'author',
                select: { '_id': 1, 'first_name': 1, 'last_name': 1 },
            }
        }
    }).populate({
        path: 'comments',//1st level
        populate: {
            path: 'author',
            select: { '_id': 1, 'first_name': 1, 'last_name': 1 },
        }
    }).populate({
        path: 'author', //for posted by user
        select: { '_id': 1, 'first_name': 1, 'last_name': 1 },
    }).sort({ createdAt: -1 }).then((post_list) => {
        res.json({
            code: 1,
            message: "post list",
            data: post_list
        })
    }).catch(err => {
        res.json({
            code: ERROR_CODE.SERVER_ERROR,
            message: err.toString()
        })
    })
};

exports.createNestedComment = (req, res) => {
    const user_id = req.user_id;
    Comment.findOne({ _id: req.body.parent_comment_id }).then((comment_data) => {
        if (comment_data) {
            const new_comment = new Comment({
                parent_comment_id: comment_data._id,
                comment_text: req.body.comment_text,
                author: user_id
            });
            new_comment.save().then((comment_detail) => {
                Comment.findByIdAndUpdate({ _id: req.body.parent_comment_id }, { $push: { comments: comment_detail._id } }).then((detail) => {
                    res.json({
                        code: 1,
                        data: detail
                    })
                }).catch(err => {
                    res.json({
                        code: ERROR_CODE.SERVER_ERROR,
                        message: err.toString()
                    })
                })
            }).catch(err => {
                res.json({
                    code: ERROR_CODE.SERVER_ERROR,
                    message: err.toString()
                })
            })
        }
    }).catch(err => {
        res.json({
            code: ERROR_CODE.SERVER_ERROR,
            message: err.toString()
        })
    })
};

exports.createLikeAction = (req, res) => {
    const user_id = req.user_id;
    Post.findOne({ _id: req.body.post_id }).then((post_detail) => {
        if (!post_detail) {
            return res.json({
                code: 0,
                message: 'Post not found !'
            })
        }
        Post.findByIdAndUpdate({ _id: post_detail._id }, { $push: { likes: user_id } }).then((result) => {
            return res.json({
                code: 1,
                message: 'Liked !'
            })
        }).catch(err => {
            res.json({
                code: ERROR_CODE.SERVER_ERROR,
                message: err.toString()
            })
        })
    }).catch(err => {
        res.json({
            code: ERROR_CODE.SERVER_ERROR,
            message: err.toString()
        })
    })
};

exports.createUnLikeAction = (req, res) => {
    const user_id = req.user_id;
    Post.findOne({ _id: req.body.post_id }).then((post_detail) => {
        if (!post_detail) {
            return res.json({
                code: 0,
                message: 'Post not found !'
            })
        }
        Post.findByIdAndUpdate({ _id: post_detail._id }, { $pull: { likes: user_id } }).then((result) => {
            return res.json({
                code: 1,
                message: 'unliked !'
            })
        }).catch(err => {
            res.json({
                code: ERROR_CODE.SERVER_ERROR,
                message: err.toString()
            })
        })
    }).catch(err => {
        res.json({
            code: ERROR_CODE.SERVER_ERROR,
            message: err.toString()
        })
    })
}