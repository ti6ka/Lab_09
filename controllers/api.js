const express = require('express');

module.exports = (userService, teamService, config) => {
    var router = express.Router();

    var teamController = require('./team')(teamService, config);
    var userController = require('./user')(userService, config);

    router.use('/team', teamController);
    router.use('/user', userController);

    return router;
};
