const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    jobPost: { type: DataTypes.STRING },
    jobTitle: { type: DataTypes.STRING },
    jobLocation: { type: DataTypes.STRING },
    fromSalary: { type: DataTypes.STRING },
    toSalary: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    timings: { type: DataTypes.STRING },
    inteview: { type: DataTypes.STRING },
    companyName: { type: DataTypes.STRING },
    contractName: { type: DataTypes.STRING },
    phoneNo: { type: DataTypes.STRING },
    EmailId: { type: DataTypes.STRING },
    panNo: { type: DataTypes.STRING },
    // gstDoc: { type: DataTypes.STRING },
  };
  return sequelize.define("job_posts", attributes);
}
