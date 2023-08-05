const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        gpfcpsNo: { type: DataTypes.STRING, allowNull: false },
        ifhrmsNo: { type: DataTypes.STRING, allowNull: false },
        aadhaarNo: { type: DataTypes.STRING, allowNull: false },
        mobileNo: { type: DataTypes.STRING, allowNull: false },
    };

    const options = {
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('Serveing_User', attributes, options);
}