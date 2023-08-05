const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const employmentService = require("./employment.service");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads");
  },
  filename: function (req, file, cb) {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// routes
router.post(
  "/createEmployeement",
  upload.single("gstDoc"),
  createEmployeement
);
router.get("/getjobPosts", getAll);
router.get("/:id", getById);
router.put("/:id", updateSchema, update);
router.delete("/deletejobPosts", _delete);

module.exports = router;

function createEmployeement(req, res, next) {
  const reqData = {
    jobPost: req.body.jobPost,
    jobTitle: req.body.jobTitle,
    jobLocation: req.body.jobLocation,
    fromSalary: req.body.fromSalary,
    toSalary: req.body.toSalary,
    description: req.body.description,
    timings: req.body.timings,
    inteview: req.body.inteview,
    companyName: req.body.companyName,
    contractName: req.body.contractName,
    phoneNo: req.body.phoneNo,
    EmailId: req.body.EmailId,
    panNo: req.body.panNo,
    // gstDoc: req.body.gstDoc,
  };
  employmentService
    .create(reqData)
    .then(() => res.json({ message: "job post added successful" }))
    .catch(next);
}

function getAll(req, res, next) {
  employmentService
    .getAll()
    .then((blogs) => res.json(blogs))
    .catch(next);
}

function getById(req, res, next) {
  employmentService
    .getById(req.params.id)
    .then((blog) => res.json(blog))
    .catch(next);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    jobPost: Joi.string().empty(""),
    jobTitle: Joi.string().empty(""),
    jobLocation: Joi.string().empty(""),
    fromSalary: Joi.string().empty(""),
    toSalary: Joi.string().empty(""),
    description: Joi.string().empty(""),
    timings: Joi.string().empty(""),
    inteview: Joi.string().empty(""),
    companyName: Joi.string().empty(""),
    contractName: Joi.string().empty(""),
    phoneNo: Joi.string().empty(""),
    EmailId: Joi.string().empty(""),
    panNo: Joi.string().empty(""),
    gstDoc: Joi.string().empty(""),
  });
  validateRequest(req, next, schema);
}

function update(req, res, next) {
  employmentService
    .update(req.params.id, req.body)
    .then((blog) => res.json(blog))
    .catch(next);
}

function _delete(req, res, next) {
  employmentService
    .delete(req.body.id)
    .then(() => res.json({ message: "job_post deleted successfully" }))
    .catch(next);
}
