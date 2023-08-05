const db = require("_helpers/db");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const Papa = require("papaparse");
const iconv = require("iconv-lite");
const csvtojson = require("csvtojson");

module.exports = {
  getAll,
  getById,
  getByUserName,
  create,
  update,
  importData,
  delete: _delete,
};

async function getAll() {
  return await db.job_fair.findAll();
}

async function getById(id) {
  return await getjobFair(id);
}

async function create(params) {
  // save user
  await db.job_fair.create(params);
}

async function update(id, params) {
  console.log(id, "job_fairjob_fair", params);

  const job_fair = await getjobFair(id);
  // validate
  const jobFairameChanged = params.id && job_fair.id !== params.id;
  if (
    jobFairameChanged &&
    (await db.job_fair.findOne({ where: { id: params.id } }))
  ) {
    throw 'Username "' + params.id + '" is already taken';
  }

  // copy params to user and save
  Object.assign(job_fair, params);
  await job_fair.save();
  return job_fair.get();
}

async function _delete(id) {
  const job_fair = await getjobFair(id);
  await job_fair.destroy();
}

// helper functions

async function getjobFair(id) {
  const job_fair = await db.job_fair.findByPk(id);
  if (!job_fair) throw "Job Fair not found";
  return job_fair;
}

async function getByUserName(name) {
  const user = await db.job_fair.findAll({ where: { userName: name } });
  if (!user) throw "User not found";
  return user;
}

async function importData(data) {
  try {
    console.log(data, "datadata");
    const csvFilePath = path.join(data);
    csvtojson()
      .fromFile(csvFilePath)
      .then(async (source) => {
        for (var i = 0; i < source.length; i++) {
          const rowData = source[i];
          if (rowData["ZONE"] !== "") {
            await db.job_fair.create({
              email: rowData["Email address"],
              empName: rowData["Employee Name (Initials at end)"],
              empNameInit: null,
              relEmp: rowData["Relationship to the Employee"],
              empStatus: rowData["Status of Employment"],
              policePersonnel: rowData["Wards of Police Personnel / Ministerial Staff / Others"], //missing
              spouseCertificate:rowData["Wards/Spouse Certificate"] ,
              dob: rowData["Date of Birth"],
              ranks: rowData["Rank"], //missing
              gpfcpsNumber: rowData["GPF/CPS Number"],
              // ploliceGradeNnumber: rowData["Police Grade Number (GNO)"],
              stationUnit: rowData["Police Station / Unit"],
              workingDistrict: rowData["Working District"],
              lastDistrict: null,
              policeMobilePhone: rowData["Police Mobile Number"],
              CandidateNname: rowData["Candidate's Name (Initials at end)"],
              CandidateNnameInit: null,
              gender: rowData["Gender"],
              dobDate: rowData["Date of Birth"],
              email1: rowData["Email"],
              phone1: rowData["Mobile Number"],
              address1: rowData["Address Line 1"],
              address2: rowData["Address Line 2"],
              address3: rowData["Address Line 3"],
              CityDistrict: rowData["City/District"],
              state1: rowData["State"],
              pincode: rowData["Pincode"],
              aadharNumber: rowData["Aadhar Number"],
              perference1: rowData["Preferred Industry [Preference 1]"],
              preference2: rowData["Preferred Industry [Preference 2]"],
              preference3: rowData["Preferred Industry [Preference 3]"],
              otherPreferred: rowData["Other Preferred Industry"],
              workPreference1: rowData["Preferred Work Location [Preference 1]"],
              workPreference2: rowData["Preferred Work Location [Preference 2]"],
              workPreference3: rowData["Preferred Work Location [Preference 3]"],
              skills: rowData["Skills"],
              candPhoto: rowData["Candidate's Photo (Upto 10 MB)"],
              resume: rowData["Your Resume [ PDF ] (Upto 1 MB)"],
              Qualification: rowData["Highest Qualification"],
              studied: rowData["Qualification"],
              Board: rowData["Board"],
              pass10: rowData["Year of Passing"],
              Percentage: rowData["Percentage"],
              Board12: rowData["Board"],
              Passing: rowData["Year of Passing"],
              Percentage12: rowData["Percentage"],
              course: rowData["Name of the Course"],
              Passingiti: rowData["Year of Passing"],
              Percentageiti: rowData["Percentage"],
              courseDip: rowData["Name of the Course"],
              PassingDip: rowData["Year of Passing"],
              PercentageDip: rowData["Percentage"],
              GraduationDg: rowData["Name of the Degree"],
              Institute: rowData["Name of the Major Subject"],
              Subject: rowData["Name of the Institute / University"],
              Passinghigi: rowData["Year of Passing"],
              Percentagehigi: rowData["Percentage"],
              Degreename: rowData["Name of the Degree"],
              University: rowData["Name of the Institute / University"],
              MajorSubject: rowData["Name of the Major Subject"],
              passedYear: rowData["Year of Passing"],
              Percentageunder: rowData["Percentage"],
              Universityphd: rowData["Name of the Institute / University"],
              Subjectphd: rowData["Name of the Major Subject"],
              Passingphd: rowData["Year of Passing"],
              Percentagephd: rowData["Percentage"],
              BoardBelow: rowData["Pursuing Any Degree?"],
              below10thpass:null,
              belowPercentage: null,
              Pursuing: rowData["Pursuing Any Degree?"],
              UniversityOther: null,
              SubjectOther: null,
              detailsdeg: rowData["If yes, please mention the details of the degree"],
              Employment: rowData["Employment Status"],
              experience: rowData["Years of Experience"],
              CompanyName: rowData["Name of the Company / Organization"],
              Designation: rowData["Job Designation"],
              Workingplz: rowData["Place of Working"],
              fromDate: rowData["From Date"],
              toDate: rowData["To Date"],
              companyDet: rowData["If worked in more than one company, mention the details below"],
              // userName: rowData["ZONE"],
            });
          }
        }
      });
  } catch (error) {
    console.error("Error importing data:", error);
  }
}
