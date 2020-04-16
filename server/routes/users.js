const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


router.get('/', (req, res) => {
    User
    .find().exec()
    .then(users => {
        res.status(200).json({message: "Hooray! welcome to our api"});
        });
});


router.get('/:id', (req, res) => { 
    User 
    .findById(req.params.id).exec()
    .then(users => {
        res.status(200).json(users);
    });
});
   

module.exports = router;