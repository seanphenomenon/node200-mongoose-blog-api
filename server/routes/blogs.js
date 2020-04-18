const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const User = require('../models/User');


router.get("/", (req, res) => {
  Blog
  .find()
  .exec()
  .then((blogs) => {
    res.status(200).json(blogs);
    console.log("Success! This is the get all blogs api!")
  });
});


router.get('/featured', (req, res) => {
    Blog
    .where({featured: true })
    .then(blogs => {
        res.status(200).json(blogs);
    })
});

router.get('/:id', (req, res) => {
    Blog
    .findById(req.params.id)
    .then(blogs => {
        if (blogs){ 
            res.status(200).json(blogs)
        console.log('Success! Found user by Id');
    } else {
    res.status(404).send('No Blog Found')
        }
    });
});

router.post('/', (req, res) => {
    let newBlog = new Blog ({
        title: req.body.title,
        article: req.body.article,
        published: req.body.published,
        featured: req.body.featured, 
        author: req.body.author
    })

    newBlog.save(function (err, newBlog) {
        if (newBlog) {
          res.status(201).json(newBlog);
          console.log(newBlog, "Success! You posted a new user!");
        } else {
           console.log(err);
        }
      });
});

router.put('/:id', (req, res) => {
    Blog
    .findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        article: req.body.article,
        published: req.body.published,
        featured: req.body.featured,
        author: req.body.author
    })
    .then(blogs => {
        res.send(204).json(blogs);
        blogs.save();
        console.log('Blog was successfully updated!');
    });
});

router.delete("/:id", (req, res) => {
    Blog
    .findByIdAndRemove(req.params.id)
      .exec()
      .then(blogs => {
        res.status(200).json(blogs);
        console.log("Successfully Deleted user!");
      })
  });






module.exports = router;
