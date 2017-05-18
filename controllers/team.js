'use strict'
var express = require('express');

module.exports = (teamService, config) => {
    const router = express.Router();

    router.post('/create',(req,res)=> {
        teamService.create(req.body)
            .then((team) => res.json(team))
            .catch((err) => res.error(err));
    });

    router.put('/update/:id',(req,res)=> {
        teamService.updateTeam(req.params.id, req.body)
            .then((team) => res.json(team))
            .catch((err) => res.error(err));
    });

    router.delete('/delete/:id',(req,res) =>{
        teamService.deleteTeam(req.params.id)
            .then(() => res.json({success:true}))
            .catch((err) => res.error(err));
    });

    router.get('/all',(req,res) =>{
        teamService.getAllTeams()
            .then((team) => res.json(team))
            .catch((err) => res.error(err));
    });

    router.get('/:id',(req,res) =>{
        teamService.getAllTeams(req.params.id)
            .then((team) => res.json(team))
            .catch((err) => res.error(err));
    });

    return router;
};