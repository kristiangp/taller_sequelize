const { Model, DataTypes } = require('sequelize');

const TSHIRT_TABLE = 'tshirts';

const tshirtSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false
    },
    talla: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    disponible: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    stock: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    fechaLanzamiento: {
        type: DataTypes.DATE,
        allowNull: false
    }
};

class tshirtModel extends Model {

    static associate(models) {
        // Puedes agregar asociaciones aquí si es necesario para tu aplicación
        // this.belongsToMany(models.user, { foreignKey: 'tshirtId', through: 'usersTshirts' });
    }

    static config(sequelize) {
        return {
            sequelize,
            modelName: 'Tshirt',
            tableName: TSHIRT_TABLE,
            timestamps: false
        }
    }
}

module.exports = { tshirtModel, tshirtSchema, TSHIRT_TABLE };
