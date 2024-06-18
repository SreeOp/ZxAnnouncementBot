// database.js

const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'database.sqlite')
});

const StoreItem = sequelize.define('StoreItem', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    downloadLabel: {
        type: DataTypes.STRING,
        allowNull: false
    },
    downloadLink: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

async function init() {
    await sequelize.sync({ alter: true });
}

module.exports = {
    StoreItem,
    init
};
