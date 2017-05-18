module.exports = (Sequelize, sequelize) => {
    return sequelize.define('teams', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name        : Sequelize.STRING
    });
};