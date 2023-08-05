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
router.get("/:userName", getByUserName);
router.get("/current", getCurrent);
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
  const schema = Joi.object({
    fullName: Joi.string().required(),
    mobileNo: Joi.string().required(),
    emailId: Joi.string().required(),
    aadhaarNo: Joi.string().required(),
    userName: Joi.string().required(),
    password: Joi.string().required(),
    conPassword: Joi.string().required(),
    CandidateName: Joi.string().required(),
    canNameInit: Joi.string().required(),
  });
  validateRequest(req, next, schema);
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

function getByUserName(req, res, next) {
  userService
    .getByUserName(req.params.userName)
    .then((data) => res.json(data))
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

function updateSchema(req, res, next) {
  const schema = Joi.object({
    fullName: Joi.string().empty(""),
    mobileNo: Joi.string().empty(""),
    emailId: Joi.string().empty(""),
    aadhaarNo: Joi.string().empty(""),
    userName: Joi.string().empty(""),
    password: Joi.string().empty(""),
    conPassword: Joi.string().empty(""),
    CandidateName: Joi.string().empty(""),
    canNameInit: Joi.string().empty(""),
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
