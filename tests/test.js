'use strict'
let user            = require('../controllers/user');
let request         = require('supertest')(user);
let Sequelize       = require('sequelize');
let sinon           = require('sinon');
let should          = require('should');
let errors = require('../utils/errors');

let config          = require('../config');
let dbcontext       = require('../context/db')(Sequelize, config);

let userRepository  = dbcontext.user;
let userService     = require('../services/user')(userRepository);
let teamRepository  = dbcontext.team;
let teamService     = require('../services/team')(teamRepository);

let res = {
    msg1: "Work time.",
    msg2: "Not Work time."
}

var user1 =
    {
        firstname   : 'Michael',
        lastname    : 'Chernyavskiy',
        timezone    : 'Europe/Minsk',
        start_t     : '08:00',
        end_t       : '17:00',
        email       : 'chernyavskiy@mail.ru'
    };
var user2 =
    {
        firstname   : '',
        lastname    : 'Chernyavskiy',
        timezone    : 'America/New_York',
        start_t     : '11:00',
        end_t       : '17:00',
        email       : 'chernyavskiy@mail.ru'
    };
var user3 =
    {

    };

var user4 =
    {
        firstname   : 'Michael',
        lastname    : 'Chernyavskiy',
        timezone    : 'Europe/Minsk',
        start_t     : '09:00',
        end_t       : '17:00',
        email       : 'chernyavskiy@mail.ru'
    };
var user5 =
    {
        firstname   : 'dsadas',
        lastname    : 'Chernyavskiy',
        timezone    : 'America/New_York',
        start_t     : '11:00',
        end_t       : '17:00',
        email       : 'chernyavskiy@mail.ru'
    };
var team1 =
    {
        name        : 'Fnatic',
        userId      : 1
    };
var team2 =
    {
        name        : '',
        userId      : 1
    };
var team3 =
    {

    };
var team4 =
    {
        name        : 'SK',
        userId      : 2
    };
var team5 =
    {
        name        : 'EG',
        userId      : 3
    };

var sandbox;
beforeEach(function ()
{
    sandbox = sinon.sandbox.create();
});

afterEach(function ()
{
    sandbox.restore();
});

describe('- User Service testing', ()=> {
    describe('Create User: ', () => {
        it('Return object Data', () => {
            sandbox.stub(userRepository, 'create').returns(Promise.resolve(user1));
            let promise = userService.create(user1);
            return promise.then((result) => {
                result.should.be.an.Object();
            })
        });
        it('Data is empty', () => {
            sandbox.stub(userRepository, 'create').returns(Promise.resolve(user2));
            let promise = userService.create(user2);
            return promise.catch((err) => {
                err.status.should.be.equal(errors.emptyData.status);
            })
        });
        it('Data is undefined', () => {
            sandbox.stub(userRepository, 'create').returns(Promise.resolve(user3));
            let promise = userService.create(user3);
            return promise.catch((err) => {
                err.status.should.be.equal(errors.undefinedData.status);
            })
        });
    });

    describe('Update User: ', () =>
    {
        it('Return object Data', () => {
            sandbox.stub(userRepository, 'update').returns(Promise.resolve(user1));
            let promise = userService.update(1,user1);
            return promise.then((result) => {
                result.should.be.an.Object();
            })
        });
        it('Data is empty', () => {
            sandbox.stub(userRepository, 'update').returns(Promise.resolve(user2));
            let promise = userService.update(1,user2);
            return promise.catch((err) => {
                err.status.should.be.equal(errors.emptyData.status);
            })
        });
        it('Data is undefined', () => {
            sandbox.stub(userRepository, 'update').returns(Promise.resolve(user3));
            let promise = userService.update(1,user3);
            return promise.catch((err) => {
                err.status.should.be.equal(errors.undefinedData.status);
            })
        });
    });

    describe('Delete User: ', () =>
    {
        it('Return JSON resolve', () => {
            sandbox.stub(userRepository, 'destroy').returns(Promise.resolve(user1));
            let promise = userService.deleteUser(1);
            return promise.then((result) => {
                result.should.be.an.json;
            })
        });
    });

    describe('Get all Users: ', () =>
    {
        it('Return object Data', () => {
            sandbox.stub(userRepository, 'findAll').returns(Promise.resolve([user1,user4,user5]));
            let promise = userService.getAll();
            return promise.then((result) => {
                result.should.be.an.Object();
            })
        });
    });
    describe('Get User by id: ', () => {
        it('Return object Data', () => {
            sandbox.stub(userRepository, 'findById').returns(Promise.resolve(user1));
            let promise = userService.getUserById(1);
            return promise.then((result) => {
                result.should.be.an.Object();
            })
        });
    });
    describe('Check Time Zones: ', () =>
    {
        it('Return object Data', () => {
            sandbox.stub(userRepository, 'findById').returns(Promise.resolve(user4,user5));
            let promise = userService.momentTime(1,2);
            return promise.then((result) => {
                result.should.be.an.Object();
            })
        });
        it('Return resolve Work time/Not Work time', () => {
            sandbox.stub(userRepository, 'findById').returns(Promise.resolve(user1));
            let promise = userService.checkTime(1);
            return promise.then((result) => {
                result.should.be.an.String();
            })
        });
        it('Return String Data', () => {
            sandbox.stub(userRepository, 'findById').returns(Promise.resolve(user1));
            let promise = userService.checkTime(1);
            return promise.then((result) => {
                result.should.be.an.String();
            })
        });
    });

});
describe('- Team Service testing', ()=> {
    describe('Create Team: ', () => {
        it('Return object Data', () => {
            sandbox.stub(teamRepository, 'create').returns(Promise.resolve(team1));
            let promise = teamService.create(team1);
            return promise.catch((err) => {
                result.should.be.an.Object();
            })
        });
        it('Data is empty', () => {
            sandbox.stub(teamRepository, 'create').returns(Promise.resolve(team2));
            let promise = teamService.create(team2);
            return promise.catch((err) => {
                err.status.should.be.equal(errors.emptyData.status);
            })
        });
        it('Data is undefined', () => {
            sandbox.stub(teamRepository, 'create').returns(Promise.resolve(team3));
            let promise = teamService.create(team3);
            return promise.catch((err) => {
                err.status.should.be.equal(errors.undefinedData.status);
            })
        });
    });

    describe('Update Team: ', () =>
    {
        it('Return object Data', () => {
            sandbox.stub(teamRepository, 'update').returns(Promise.resolve(team1));
            let promise = teamService.update(1,team1);
            return promise.then((result) => {
                result.should.be.an.Object();
            })
        });
        it('Data is empty', () => {
            sandbox.stub(teamRepository, 'update').returns(Promise.resolve(team2));
            let promise = teamService.update(1,team2);
            return promise.catch((err) => {
                err.status.should.be.equal(errors.emptyData.status);
            })
        });
        it('Data is undefined', () => {
            sandbox.stub(teamRepository, 'update').returns(Promise.resolve(team3));
            let promise = teamService.update(1,team3);
            return promise.catch((err) => {
                err.status.should.be.equal(errors.undefinedData.status);
            })
        });
    });

    describe('Delete Team: ', () =>
    {
        it('Return JSON resolve', () => {
            sandbox.stub(teamRepository, 'destroy').returns(Promise.resolve(team1));
            let promise = teamService.deleteTeam(1);
            return promise.then((result) => {
                result.should.be.an.json;
            })
        });
    });

    describe('Get all Teams: ', () =>
    {
        it('Return object Data', () => {
            sandbox.stub(userRepository, 'findAll').returns(Promise.resolve([team1,team4,team5]));
            let promise = userService.getAll();
            return promise.then((result) => {
                result.should.be.an.Object();
            })
        });
    });

    describe('Get Team by id: ', () => {
        it('Return object Data', () => {
            sandbox.stub(teamRepository, 'findById').returns(Promise.resolve(team1));
            let promise = teamService.getTeamById(1);
            return promise.then((result) => {
                result.should.be.an.Object();
            })
        });
    });
});