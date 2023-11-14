const { tshirtModel, tshirtSchema } = require('./tshirt.model');

function setUpModels(sequelize) {
    tshirtModel.init(tshirtSchema, tshirtModel.config(sequelize));
}

module.exports = setUpModels;
