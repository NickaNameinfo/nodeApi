const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    companyName: { type: DataTypes.STRING },
    contractName: { type: DataTypes.STRING },
    phoneNo: { type: DataTypes.STRING },
    EmailId: { type: DataTypes.STRING },
    panNo: { type: DataTypes.STRING },
    gstDoc: { type: DataTypes.STRING },
    userName: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    filesss:{ type: DataTypes.STRING },
  };

  const options = {
    defaultScope: {
      // exclude hash by default
      attributes: { exclude: ["hash"] },
    },
    scopes: {
      // include hash with this scope
      withHash: { attributes: {} },
    },
  };

  return sequelize.define("Company_User", attributes, options);
}
