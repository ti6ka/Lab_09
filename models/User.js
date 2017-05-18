module.exports = (Sequelize, sequelize) => {
    return sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstname   : Sequelize.STRING,
        lastname    : Sequelize.STRING,
        timezone    : Sequelize.STRING,
        start_t     : Sequelize.STRING,
        end_t       : Sequelize.STRING,
        email       : Sequelize.STRING
    });
};