const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const authorize = require("_middleware/authorize");
const userService = require("./user.service");
// routes
router.post("/authenticate", authenticateSchema, authenticate);
router.post("/register", registerSchema, register);
router.get("/getAllUser", getAll);
router.post("/generateOtp", getOtp);
router.get("/current", getCurrent);
router.get("/:userName", getByUserName);
router.get("/:id", getById);
router.put("/:id", updateSchema, update);
router.delete("/deleteUser", _delete);

module.exports = router;

function authenticateSchema(req, res, next) {
  const schema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
  userService
    .authenticate(req.body)
    .then((user) => res.json(user))
    .catch(next);
}

function registerSchema(req, res, next) {
  const reqData = {
    empName: req.body.empName,
    empStatus: req.body.empStatus,
    gpfcpd: req.body.gpfcpd,
    ppocps: req.body.ppocps,
    rand: req.body.rand,
    department: req.body.department,
    District: req.body.District,
    dob: req.body.dob,
    doe: req.body.doe,
    dopr: req.body.dopr,
    dod: req.body.dod,
    gender: req.body.gender,
    mobileNo: req.body.mobileNo,
    gno: req.body.gno,
    policePersonnel: req.body.policePersonnel,
    unitName: req.body.unitName,
    familyMember: req.body["familyMember[]"]?.toString(),
    familystatusList: req.body["familystatusList[]"]?.toString(),
    userName: req.body.userName,
    password: req.body.password,
    CandidateName: req.body.CandidateName,
  };
  userService
    .create(reqData)
    .then(() => res.json({ message: "Candidate added successful" }))
    .catch(next);
}

function register(req, res, next) {
  userService
    .create(req.body)
    .then(() => res.json({ message: "Registration successful" }))
    .catch(next);
}

function getAll(req, res, next) {
  userService
    .getAll()
    .then((users) => res.json(users))
    .catch(next);
}

function getOtp(req, res, next) {
  userService
    .generationOtp(req.body?.number)
    .then((opt) => res.json(opt))
    .catch(next);
}

function getCurrent(req, res, next) {
  res.json(req.user);
}

function getById(req, res, next) {
  userService
    .getById(req.params.id)
    .then((user) => res.json(user))
    .catch(next);
}

function getByUserName(req, res, next) {
  userService
    .getByUserName(req.params.userName)
    .then((data) => res.json(data))
    .catch(next);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    fullName: Joi.string().empty(""),
    empName: Joi.string().empty(""),
    empStatus: Joi.string().empty(""),
    gpfcpd: Joi.string().empty(""),
    ppocps: Joi.string().empty(""),
    rand: Joi.string().empty(""),
    department: Joi.string().empty(""),
    District: Joi.string().empty(""),
    dob: Joi.string().empty(""),
    doe: Joi.string().empty(""),
    dopr: Joi.string().empty(""),
    dod: Joi.string().empty(""),
    gender: Joi.string().empty(""),
    mobileNo: Joi.string().empty(""),
    gno: Joi.string().empty(""),
    policePersonnel: Joi.string().empty(""),
    familyMember: Joi.string().empty(""),
    familystatusList: Joi.string().empty(""),
    unitName: Joi.string().empty(""),
    userName: Joi.string().empty(""),
    password: Joi.string().empty(""),
    CandidateName: Joi.string().empty(""),
  });
  validateRequest(req, next, schema);
}

function update(req, res, next) {
  userService
    .update(req.params.id, req.body)
    .then((user) => res.json(user))
    .catch(next);
}

function _delete(req, res, next) {
  userService
    .delete(req.body.id)
    .then(() => res.json({ message: "User deleted successfully" }))
    .catch(next);
}

function _delete(req, res, next) {
  userService
    .delete(req.body.id)
    .then(() => res.json({ message: "User deleted successfully" }))
    .catch(next);
}
