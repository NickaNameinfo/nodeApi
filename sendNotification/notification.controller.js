const express = require("express");
const router = express.Router();
const Joi = require("joi");
const nodemailer = require("nodemailer");
const validateRequest = require("_middleware/validate-request");
const Service = require("./notification.service");

// routes
router.post("/authenticate", authenticateSchema, authenticate);
router.post("/register", registerSchema);
router.get("/getAllUser", getAll);
router.get("/current", getCurrent);
router.get("/emailId", getByEmailIds);
router.get("/:id", getById);
router.put("/:id", updateSchema, update);
router.delete("/deleteUser", _delete);

module.exports = router;

function authenticateSchema(req, res, next) {
  const schema = Joi.object({
    mobileNo: Joi.string().required(),
    password: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
  Service.authenticate(req.body)
    .then((user) => res.json(user))
    .catch(next);
}

async function registerSchema(req, res, next) {
  const schema = Joi.object({
    emailId: req.body["emailId[]"]?.toString(),
    message: Joi.string().required(),
  });
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "ibsshrsolutions.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: `support@ibsshrsolutions.com`, // generated ethereal user
        pass: `support@2023`, // generated ethereal password
      },
    });
    // send mail with defined transport object
    console.log(req.body, "popkpkpkpk")
    let mailId = req.body["emailId[]"]?.toString();
    let info = await transporter
      .sendMail({
        from: "support@ibsshrsolutions.com", // sender address
        to: mailId, // list of receivers
        subject: "Hai from Ibss ✔", // Subject line
        text: "Verify your account with otp", // plain text body
        html: `<b>${req.body.message}</b>`, // html body
      })
      .then(() => {
        return req.body["emailId[]"]?.map((email) => {
          let messageData = {
            emailId: email,
            message: req.body.message,
          };
          Service.create(messageData)
            .then(() => res.json({ message: "Registration successful" }))
            .catch(next);
        });
      });
  } catch (error) {
    console.log("Nick Error", error);
  }
  validateRequest(req, next, schema);
}

// async function register(req, res, next) {
//   console.log(req.body, "tesingsin", req.body["emailId[]"], req.body.emailId);
// }

function getAll(req, res, next) {
  Service.getAll()
    .then((users) => res.json(users))
    .catch(next);
}

function getCurrent(req, res, next) {
  res.json(req.user);
}

function getById(req, res, next) {
  Service.getById(req.params.id)
    .then((user) => res.json(user))
    .catch(next);
}
function getByEmailIds(req, res, next) {
  console.log(req.body,"getByEmailIds")
  Service
    .getByEmailId(req.body.emailId)
    .then((data) => res.json(data))
    .catch(next);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    emailId: Joi.array().empty(""),
    message: Joi.string().empty(""),
  });
  validateRequest(req, next, schema);
}

function update(req, res, next) {
  Service.update(req.params.id, req.body)
    .then((user) => res.json(user))
    .catch(next);
}

function _delete(req, res, next) {
  Service.delete(req.body.id)
    .then(() => res.json({ message: "User deleted successfully" }))
    .catch(next);
}
