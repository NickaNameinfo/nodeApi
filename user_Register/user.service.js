const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const axios = require("axios");
module.exports = {
  authenticate,
  getAll,
  getById,
  getByUserName,
  create,
  update,
  delete: _delete,
  generationOtp
};

async function authenticate(data) {
  let userName = data.userName;
  const user = await db.User_Register.scope("withHash").findOne({
    where: { userName },
  });
  if (data.password !== user.password)
    throw "userName or password is incorrect";
  // authentication successful
  const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: "1d" });
  return { ...omitHash(user.get()), token };
}

async function getAll() {
  return await db.User_Register.findAll();
}

async function getById(id) {
  return await getUser(id);
}

async function create(params) {
  // validate
  if (
    await db.User_Register.findOne({ where: { userName: params.userName } })
  ) {
    throw 'Username "' + params.userName + '" is already taken';
  } else if (
    await db.User_Register.findOne({ where: { gpfcpd: params.gpfcpd } })
  ) {
    throw 'GPF / CPS / PPO No "' + params.gpfcpd + '" is already exist';
  }

  // hash password
  if (params.password) {
    params.hash = await bcrypt.hash(params.password, 10);
  }

  // save user
  await db.User_Register.create(params);
}

async function update(id, params) {
  const user = await getUser(id);
  // validate
  const mobileNoChanged = params.userName && user.userName !== params.userName;
  if (
    mobileNoChanged &&
    (await db.User_Register.findOne({ where: { userName: params.userName } }))
  ) {
    throw 'Username "' + params.userName + '" is already taken';
  }

  // hash password if it was entered
  if (params.password) {
    params.hash = await bcrypt.hash(params.password, 10);
  }

  // copy params to user and save
  Object.assign(user, params);
  await user.save();

  return omitHash(user.get());
}

async function _delete(id) {
  const user = await getUser(id);
  await user.destroy();
}

// helper functions

async function getUser(id) {
  const user = await db.User_Register.findByPk(id);
  if (!user) throw "User not found";
  return user;
}

function omitHash(user) {
  const { hash, ...userWithoutHash } = user;
  return userWithoutHash;
}

async function getByUserName(name) {
  const user = await db.User_Register.findOne({ where: { userName: name } });
  if (!user) throw "User not found";
  return user;
}

async function generationOtp(number) {
  console.log(number, "numbernumber")
  try {
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit random OTP
    const smsApiUrl = `http://site.ping4sms.com/api/smsapi?key=e741867a2aae3c35f6a835cff40432a9&route=2&sender=TNPWEL&number=${Number(number)}&sms=Dear%20User,%20Your%${otp}%20is%209025.%20This%20OTP%20is%20valid%20for%2010%20minutes%20-%20TNPWEL&templateid=1207168620790375475`;

    // Send the OTP via the API
    const response = await axios.get(smsApiUrl);

    console.log(response.status, "responseresponse");
    // Handle the response from the API if necessary

    console.log(otp, "sdfasdf")

    return otp; // Return the generated OTP in the response
  } catch (error) {
    console.error("Error generating OTP:", error);
    res.status(500).json({ error: "Failed to generate OTP" });
  }
}
