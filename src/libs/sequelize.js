const { Sequelize, Op } = require('sequelize');
const setUpModels = require('../../DB/models/INDEX.JS');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('tshirts', 'postgres', '12980565', {
    host: 'localhost',
    dialect: 'postgres',
    logging: true
});

setUpModels(sequelize);

module.exports = sequelize;