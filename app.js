const express = require('express');
var favicon = require('serve-favicon')
var path = require('path')
const Sequelize = require('sequelize');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('./config');
const dbcontext = require('./context/db')(Sequelize, config);
const errors = require('./utils/errors');

const app = express();

const userService = require('./services/user')(dbcontext.user);
const teamService = require('./services/team')(dbcontext.team);

const apiController = require('./controllers/api')(userService,teamService, config);
app.use(express.static(path.join(__dirname, 'public')));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use(cookieParser(config.cookie.key));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/api', apiController);

app.use('/api',function(req, res, next) {
    res.sendData = function(obj) {
        var contentType = req.headers['content-type'];
        if (contentType == 'application/json') {
            res.header('Content-Type', 'application/json');
            res.send(obj);
        } else if (contentType == 'application/xml') {
            res.header('Content-Type', 'text/xml');
            var xml = serializer.render(obj);
            res.send(xml);
        } else {
            res.send(obj);
        }
    };
    next();
});
//
const port = process.env.PORT || 3000;

dbcontext.sequelize
    .sync()
    .then(() => {
        app.listen(port, () => console.log('Running on http://localhost:3000'));
    })
    .catch((err) => console.log(err));