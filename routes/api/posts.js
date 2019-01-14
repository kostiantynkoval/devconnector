const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post Model
const Post = require('../../models/Post');

// Profile Model
const Profile = require('../../models/Profile');

// Validation
const validatePostInput = require('../../validation/post');

/**
// @route   GET api/posts/test
// @desc    Tests posts route
// @access  Public
*/
router.get('/test', (req, res) => res.json({ msg: 'Posts works' }));

/**
 // @route   GET api/posts
 // @desc    Get posts
 // @access  Public
 */
router.get('/', (req, res) => {
  Post
    .find()
    .sort({date: -1})
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json(err))
});

/**
 // @route   GET api/posts/:id
 // @desc    Get posts bu id
 // @access  Public
 */
router.get('/:id', (req, res) => {
  Post
    .findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json(err))
});

/**
// @route   POST api/posts
// @desc    Create post
// @access  Private
*/
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  // Check Validation
  if(!isValid) {
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  })

  newPost.save().then(post => res.json(post));
});

/**
 // @route   DELETE api/posts/:id
 // @desc    Delete post
 // @access  Private
 */
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

        Post.findById(req.params.id)
          .then(post => {
            // Check for post owner
            if(post.user.toString() !== req.user.id){
              return res.status(401).json({notauthorized: 'User not authorized'})
            }
            // Delete
            post.remove().then(() => res.json({success: true}));
          })
          .catch(err => res.status(404).json({notfound: 'Post not found'}));
      }
);

/**
 // @route   POST api/posts/like/:post_id
 // @desc    Add like to the post
 // @access  Private
 */
router.post('/like/:post_id', passport.authenticate('jwt', {session: false}), (req, res) => {
      Post.findById(req.params.post_id)
        .then(post => {
          // Add like to the post
          if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({alreadyliked: 'User liked this post already'});
          } else {
            // Add user id to likes array
            post.likes.push({user: req.user.id});
            // Save
            post.save().then(post => res.json(post));
          }
        })
        .catch(err => res.status(404).json({notfound: 'Post not found'}));
    }
);

/**
 // @route   POST api/posts/unlike/:post_id
 // @desc    Unlike the post
 // @access  Private
 */
router.post('/unlike/:post_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        // Check if user liked this post before
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
          return res.status(400).json({notliked: 'User did not like this post yet'});
        }
        // Get remove index
        const removeIndex = post.likes
          .map(like => like.user.toString())
          .indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);
        // Save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({notfound: 'Post not found'}));
  }
);

/**
 // @route   POST api/posts/comment/:post_id
 // @desc    Add comment to the post
 // @access  Private
*/
router.post('/comment/:post_id', passport.authenticate('jwt', {session: false}), (req, res) => {
  const {errors, isValid} = validatePostInput(req.body);

  // Check validation
  if(!isValid) {
    return res.status(400).json(errors);
  }
  Post.findById(req.params.post_id)
    .then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      }
      // Add to comments array
      post.comments.unshift(newComment);
      // Save
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({notfound: 'No post found'}));
})

/**
 // @route   DELETE api/posts/comment/:post_id/:comment_id
 // @desc    Delete comment
 // @access  Private
 */
router.delete('/comment/:post_id/:comment_id', passport.authenticate('jwt', {session: false}), (req, res) => {

    Post.findById(req.params.post_id)
      .then(post => {
        // Find comment in the post Check for post owner
        const comment = post.comments.find(item => item._id.toString() === req.params.comment_id);

        if(typeof comment === 'undefined') {
          return res.status(404).json({notfound: 'Comment is not found'})
        }
        // Check if the comment belongs to current user
        if(comment.user.toString() !== req.user.id){
          return res.status(401).json({notauthorized: 'User not authorized to delete this comment'})
        }
        // Delete comment & save
        const index = post.comments.findIndex(item => item._id.toString() === comment._id.toString());
        post.comments.splice(index,1);
        post.save().then((post) => res.json(post));
      })
      .catch(err => res.status(404).json({notfound: 'Post not found'}));
  }
);


module.exports = router;