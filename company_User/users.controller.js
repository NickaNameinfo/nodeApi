const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const authorize = require("_middleware/authorize");
const userService = require("./user.service");
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
}).single("file");

const upload = multer({ storage });

router.post("/authenticate", authenticateSchema, authenticate);
router.post("/register", uploads, registerSchema);
router.post("/fileUpload", upload.single('file'), fileUploadSchema);
router.get("/getAllUser", getAll);
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

function getByUserName(req, res, next) {
  userService
    .getByUserName(req.params.userName)
    .then((data) => res.json(data))
    .catch(next);
}

function registerSchema(req, res, next) {
  console.log(req.body, "reqreqreq", req.file);
  const schema = {
    companyName: req.body.companyName,
    contractName: req.body.contractName,
    phoneNo: req.body.phoneNo,
    EmailId: req.body.EmailId,
    panNo: req.body.panNo,
    gstDoc: req.file.path,
    userName: req.body.userName,
    password: req.body.password,
  };
  // validateRequest(req, next, schema);
  userService
    .create(schema)
    .then(() => res.json({ message: "Registration successful" }))
    .catch(next);
}

function fileUploadSchema(req, res, next) {
  console.log(req.body, "reqreqreq", req.file);
  const schema = {
    gstDoc: req.file.path,
  };
  // validateRequest(req, next, schema);
  userService
    .upload(schema)
    .then(() => res.json({ message: "Registration successful" }))
    .catch(next);
}

function getAll(req, res, next) {
  userService
    .getAll()
    .then((users) => res.json(users))
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
    companyName: Joi.string().empty(""),
    contractName: Joi.string().empty(""),
    phoneNo: Joi.string().empty(""),
    EmailId: Joi.string().empty(""),
    panNo: Joi.string().empty(""),
    gstDoc: Joi.string().empty(""),
    userName: Joi.string().empty(""),
    password: Joi.string().empty(""),
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
