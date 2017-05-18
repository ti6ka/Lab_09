'use strict'
var express = require('express');

module.exports = (userService, config) => {
    const router = express.Router();

    router.post('/create',(req,res)=> {
        userService.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.error(err));
    });
    router.put('/update/:id', (req, res) => {
        userService.update(req.params.id,req.body)
            .then((user) => res.json(user))
            .catch((err) => res.error(err));
    });
    router.delete('/delete/:id',(req,res) =>{
        userService.deleteUser(req.params.id)
            .then(() => res.json({success:true}))
            .catch((err) => res.error(err));
    });
    router.get('/all',(req,res) =>{
        userService.getAll()
            .then((user) => res.json(user))
            .catch((err) => res.error(err));
    });
    router.get('/:id',(req,res) =>{
        userService.getUserById(req.params.id)
            .then((user) => res.json(user))
            .catch((err) => res.error(err));
    });
    router.get('/check/:id',(req,res) =>{
        userService.checkTime(req.params.id)
            .then((user) => res.json(user))
            .catch((err) => res.error(err));
    });
    router.get('/moment/:id/:id2',(req,res) =>{
        userService.momentTime(req.params.id,req.params.id2)
            .then((user) => res.json(user))
            .catch((err) => res.error(err));
    });

    return router;
};