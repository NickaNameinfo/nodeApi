const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    empName: { type: DataTypes.STRING },
    empStatus: { type: DataTypes.STRING },
    gpfcpd: { type: DataTypes.STRING },
    ppocps: { type: DataTypes.STRING },
    rand: { type: DataTypes.STRING },
    department: { type: DataTypes.STRING },
    District: { type: DataTypes.STRING },
    dob: { type: DataTypes.STRING },
    doe: { type: DataTypes.STRING },
    dopr: { type: DataTypes.STRING },
    dod: { type: DataTypes.STRING },
    gender: { type: DataTypes.STRING },
    mobileNo: { type: DataTypes.STRING },
    gno: { type: DataTypes.STRING },
    policePersonnel: { type: DataTypes.STRING },
    familyMember: { type: DataTypes.STRING },
    familystatusList: { type: DataTypes.STRING },
    unitName: { type: DataTypes.STRING },
    userName: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    CandidateName: { type: DataTypes.STRING },
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

  return sequelize.define("User_Register", attributes, options);
}
