const express = require('express');
const router = express.Router();
const User = require('../models/User');

// using Postman to test all routes 

router.get('/', (req, res) => {
    User
    .find().exec()
    .then(users => {
        res.status(200).json(users);
        console.log('Success! This is the get all users api!')
        });
});

router.get('/:id', (req, res) => { 
    User 
    .findById(req.params.id).exec()
    .then(users => {
        res.status(200).json(users);
        console.log('Successfully found user by ID!')
    });
});

router.post('/', (req,res, next) => {
     let newUser = new User({
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         email: req.body.email
     });

     newUser.save(function (err, newUser){
        if(newUser) {
            res.status(201).json(newUser);
        } else console.log(err);
    });
    console.log(newUser, 'Success! You posted a new user!')
});

router.put('/:id', (req, res) => {
    User
    .findByIdAndUpdate(req.params.id,{
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    })

    .then (users => {
        res.status(204).json(users)
        users.save();
        console.log('User was successfully updated!')
    })
});

router.delete('/:id', (req, res) => {
    User
    .findByIdAndRemove(req.params.id).exec()
    .then(users => {
        res.status(201).json(users)
    })
    console.log("Successfully Deleted user!")
});





module.exports = router;