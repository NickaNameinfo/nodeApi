const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const employmentService = require("./employment.service");
const multer = require("multer");
const path = require("path");
// routes

const storage = multer.diskStorage({
  destination: "./src/uploads/",
  filename: (req, file, cb) => {
    console.log(req, file, "filefilefile");
    return cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const uploads = multer({
  storage: storage,
  limits: { fileSize: "1000000" },
}).fields([
  { name: "spouseCertificate" },
  { name: "candPhoto"},
  { name: "resume"},
  { name: "CSV"},
]);

// routes
router.post("/createEmployeement", uploads, createEmployeement);
router.get("/getjobFair", getAll);
router.get("/:userName", getByUserName);
router.get("/id/:id", getById);
router.put("/updateID/:id", update); 
router.post("/importEmpolyee",uploads, importEmpolyee); 
router.delete("/deletejopFair", _delete);

module.exports = router;

function createEmployeement(req, res, next) {
  console.log(req.files, "req.filereq.filereq.file");
  const reqData = {
    email: req.body.email,
    empName: req.body.empName,
    empNameInit:req.body.empNameInit,
    relEmp: req.body.relEmp,
    empStatus: req.body.empStatus,
    policePersonnel: req.body.policePersonnel, //missing
    spouseCertificate: req?.files ? req?.files?.spouseCertificate?.[0]?.path : null,
    dob: req.body.dob,
    ranks: req.body.ranks, //missing
    gpfcpsNumber: req.body.gpfcpsNumber,
    // ploliceGradeNnumber: req.body.ploliceGradeNnumber,
    stationUnit: req.body.stationUnit,
    workingDistrict: req.body.workingDistrict,
    lastDistrict: req.body.lastDistrict,
    policeMobilePhone: req.body.policeMobilePhone,
    CandidateNname: req.body.CandidateNname,
    CandidateNnameInit: req.body.CandidateNnameInit,
    gender: req.body.gender,
    dobDate: req.body.dobDate,
    email1: req.body.email1,
    phone1: req.body.phone1,
    address1: req.body.address1,
    address2: req.body.address2,
    address3: req.body.address3,
    CityDistrict: req.body.CityDistrict,
    state1: req.body.state1,
    pincode: req.body.pincode,
    aadharNumber: req.body.aadharNumber,
    myCheckboxes: req.body["myCheckboxes[]"]?.toString(),
    perference1: req.body.perference1,
    preference2: req.body.preference2,
    preference3: req.body.preference3,
    otherPreferred: req.body.otherPreferred,
    workPreference1: req.body.workPreference1,
    workPreference2: req.body.workPreference2,
    workPreference3: req.body.workPreference3,
    skills: req.body.skills,
    candPhoto: req.files.candPhoto[0].path,
    resume: req.files.resume[0].path,
    Qualification: req.body.Qualification,
    studied: req.body.studied,
    Board: req.body.Board,
    pass10: req.body.pass10,
    Percentage: req.body.Percentage,
    Board12: req.body.Board12,
    Passing: req.body.Passing,
    Percentage12: req.body.Percentage12,
    course: req.body.course,
    Passingiti: req.body.Passingiti,
    Percentageiti: req.body.Percentageiti,
    courseDip: req.body.courseDip,
    PassingDip: req.body.PassingDip,
    PercentageDip: req.body.PercentageDip,
    GraduationDg: req.body.GraduationDg,
    Institute: req.body.Institute,
    Subject: req.body.Subject,
    Passinghigi: req.body.Passinghigi,
    Percentagehigi: req.body.Percentagehigi,
    Degreename: req.body.Degreename,
    University: req.body.University,
    MajorSubject: req.body.MajorSubject,
    passedYear: req.body.passedYear,
    Percentageunder: req.body.Percentageunder,
    Universityphd: req.body.Universityphd,
    Subjectphd: req.body.Subjectphd,
    Passingphd: req.body.Passingphd,
    Percentagephd: req.body.Percentagephd,
    BoardBelow: req.body.BoardBelow,
    below10thpass: req.body.below10thpass,
    belowPercentage: req.body.belowPercentage,
    Pursuing: req.body.Pursuing,
    UniversityOther: req.body.UniversityOther,
    SubjectOther: req.body.SubjectOther,
    detailsdeg: req.body.detailsdeg,
    Employment: req.body.Employment,
    experience: req.body.experience,
    CompanyName: req.body.CompanyName,
    Designation: req.body.Designation,
    Workingplz: req.body.Workingplz,
    fromDate: req.body.fromDate,
    toDate: req.body.toDate,
    companyDet: req.body.companyDet,
    userName: req.body.userName,
  };
  employmentService
    .create(reqData)
    .then(() => res.json({ message: "Employeement added successful" }))
    .catch(next);
}

function getAll(req, res, next) {
  employmentService
    .getAll()
    .then((blogs) => res.json(blogs))
    .catch(next);
}

function getByUserName(req, res, next) {
  employmentService
    .getByUserName(req.params.userName)
    .then((data) => res.json(data))
    .catch(next);
}

function getById(req, res, next) {
  employmentService
    .getById(req.params.id)
    .then((data) => res.json(data))
    .catch(next);
}


function update(req, res, next) {
  console.log(req.body, "req.filereq.filereq.file");
  const reqData = {
    email: req.body.email,
    empName: req.body.empName,
    empNameInit:req.body.empNameInit,
    relEmp: req.body.relEmp,
    empStatus: req.body.empStatus,
    policePersonnel: req.body.policePersonnel, //missing
    // spouseCertificate: req.files.spouseCertificate[0].path,
    dob: req.body.dob,
    ranks: req.body.ranks, //missing
    gpfcpsNumber: req.body.gpfcpsNumber,
    // ploliceGradeNnumber: req.body.ploliceGradeNnumber,
    stationUnit: req.body.stationUnit,
    workingDistrict: req.body.workingDistrict,
    lastDistrict: req.body.lastDistrict,
    policeMobilePhone: req.body.policeMobilePhone,
    CandidateNname: req.body.CandidateNname,
    CandidateNnameInit: req.body.CandidateNnameInit,
    gender: req.body.gender,
    dobDate: req.body.dobDate,
    email1: req.body.email1,
    phone1: req.body.phone1,
    address1: req.body.address1,
    address2: req.body.address2,
    address3: req.body.address3,
    CityDistrict: req.body.CityDistrict,
    state1: req.body.state1,
    pincode: req.body.pincode,
    aadharNumber: req.body.aadharNumber,
    myCheckboxes: req.body["myCheckboxes[]"]?.toString(),
    perference1: req.body.perference1,
    preference2: req.body.preference2,
    preference3: req.body.preference3,
    otherPreferred: req.body.otherPreferred,
    workPreference1: req.body.workPreference1,
    workPreference2: req.body.workPreference2,
    workPreference3: req.body.workPreference3,
    skills: req.body.skills,
    // candPhoto: req.files.candPhoto[0].path,
    // resume: req.files.resume[0].path,
    Qualification: req.body.Qualification,
    studied: req.body.studied,
    Board: req.body.Board,
    pass10: req.body.pass10,
    Percentage: req.body.Percentage,
    Board12: req.body.Board12,
    Passing: req.body.Passing,
    Percentage12: req.body.Percentage12,
    course: req.body.course,
    Passingiti: req.body.Passingiti,
    Percentageiti: req.body.Percentageiti,
    courseDip: req.body.courseDip,
    PassingDip: req.body.PassingDip,
    PercentageDip: req.body.PercentageDip,
    GraduationDg: req.body.GraduationDg,
    Institute: req.body.Institute,
    Subject: req.body.Subject,
    Passinghigi: req.body.Passinghigi,
    Percentagehigi: req.body.Percentagehigi,
    Degreename: req.body.Degreename,
    University: req.body.University,
    MajorSubject: req.body.MajorSubject,
    passedYear: req.body.passedYear,
    Percentageunder: req.body.Percentageunder,
    Universityphd: req.body.Universityphd,
    Subjectphd: req.body.Subjectphd,
    Passingphd: req.body.Passingphd,
    Percentagephd: req.body.Percentagephd,
    BoardBelow: req.body.BoardBelow,
    below10thpass: req.body.below10thpass,
    belowPercentage: req.body.belowPercentage,
    Pursuing: req.body.Pursuing,
    UniversityOther: req.body.UniversityOther,
    SubjectOther: req.body.SubjectOther,
    detailsdeg: req.body.detailsdeg,
    Employment: req.body.Employment,
    experience: req.body.experience,
    CompanyName: req.body.CompanyName,
    Designation: req.body.Designation,
    Workingplz: req.body.Workingplz,
    fromDate: req.body.fromDate,
    toDate: req.body.toDate,
    companyDet: req.body.companyDet,
    userName: req.body.userName,
  };
  employmentService
    .update(req.params.id, reqData)
    .then((data) => res.json(data))
    .catch(next);
}

function _delete(req, res, next) {
  employmentService
    .delete(req.body.id)
    .then(() => res.json({ message: "job_fair deleted successfully" }))
    .catch(next);
}


function importEmpolyee (req, res, nex) {
  console.log(req.files.CSV[0].path, "req.filereq.filereq.file");
  employmentService.importData(req.files.CSV[0].path)
}