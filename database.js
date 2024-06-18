const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'store.sqlite')
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
});

async function init() {
    await sequelize.sync();
}

module.exports = { StoreItem, init };
