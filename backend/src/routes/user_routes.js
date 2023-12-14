const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const user_controller = require('../controllers/user_controller');
const { userAuth } = require('../middleware/userAuth');


const imageStorage = multer.diskStorage({
    destination: 'uploads',
    filename: (request, file, cb) => {
        cb(null, 'image-' + Date.now() + ".png")
    }
});
const imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
});

router.post('/signup', user_controller.signup);
router.post('/login', user_controller.login);
router.post('/createPost', userAuth, imageUpload.any('images', 5), user_controller.createPost);
router.get('/getPosts', userAuth, user_controller.getPosts);
router.get('/getPostsDetails', userAuth, user_controller.getPostsDetails);

router.post('/createComment', userAuth, user_controller.createComment);
router.post('/createNestedComment', userAuth, user_controller.createNestedComment);
router.post('/createLikeAction', userAuth, user_controller.createLikeAction);
router.post('/createUnLikeAction', userAuth, user_controller.createUnLikeAction);


module.exports = router;