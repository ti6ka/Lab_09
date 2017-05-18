'use strict'

let errors = {
    emptyData: {
        message: 'data is empty, please return entered',
        code: 'data empty',
        status: 400
    },
    undefinedData: {
        message: 'data is undefined, please return entered',
        code: 'data undefined',
        status: 401
    },
    foreignKey: {
        message: 'Cannot add or update a child row: a foreign key constraint fails',
        code: 'a foreign key constraint fails',
        status: 402
    }
};

module.exports = (teamRepository) => {
    return {
        create: createTeam,
        update: updateTeam,
        deleteTeam: deleteTeam,
        getAllTeams: getAllTeams,
        getTeamById: getTeamById
    };
    function createTeam(data) {
        return new Promise((resolve, reject) => {
            let team = {
                name   : data.name,
                userId    : data.userId
            };
            if (data.name == "" || data.userId == "") {

                reject(errors.emptyData);
                return;
            }
            if (data.name == undefined || data.userId == undefined) {

                reject(errors.undefinedData);
                return;
            }
            teamRepository.create(team)
                .then((team) => {
                    resolve(team);
                })
                .catch((reject) => {
                    if (reject.name == 'SequelizeForeignKeyConstraintError') {
                        reject = errors.foreignKey;
                        resolve(reject);
                    }
                });
        });
    };

    function updateTeam(id,data) {
        return new Promise((resolve, reject) => {
            let updateTeam = {
                name    : data.name,
                userId  : data.userId
            };
            if (updateTeam.name == undefined || updateTeam.userId == undefined) {

                reject(errors.undefinedData);
                return;
            }
            if (updateTeam.name == "" || updateTeam.userId == "") {

                reject(errors.emptyData);
                return;
            }

            teamRepository.update(updateTeam, {where: {id: id}, limit: 1})
                .then(() => resolve(updateTeam))
                .catch(reject);
        });
    }

    function deleteTeam(id) {
        return new Promise((resolve, reject) => {
            teamRepository.destroy({where : {id : id}})
                .then(() => resolve({success:true}))
                .catch(reject);
        });
    }

    function getAllTeams() {
        return new Promise((resolve, reject) => {
            teamRepository.findAll()
                .then((team) => resolve(team))
                .catch(reject);
        });
    }

    function getTeamById(id) {
        return new Promise((resolve, reject) => {
            teamRepository.findById(id)
                .then((team) => resolve(team))
                .catch(reject);
        });
    }
}