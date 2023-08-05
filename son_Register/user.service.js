const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");

module.exports = {
  authenticate,
  getAll,
  getById,
  getByUserName,
  create,
  update,
  delete: _delete,
};

async function authenticate(data) {
  let userName = data.userName;
  const user = await db.Son_Register.scope("withHash").findOne({
    where: { userName },
  });
  console.log(user, "useruser");
  if (data.password !== user.password)
    throw "userName or password is incorrect";
  // authentication successful
  const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: "1d" });
  return { ...omitHash(user.get()), token };
}

async function getAll() {
  return await db.Son_Register.findAll();
}

async function getById(id) {
  return await getUser(id);
}

async function create(params) {
  // validate
  if (await db.Son_Register.findOne({ where: { userName: params.userName } })) {
    throw 'Username "' + params.userName + '" is already taken';
  }

  // hash password
  if (params.password) {
    params.hash = await bcrypt.hash(params.password, 10);
  }

  // save user
  await db.Son_Register.create(params);
}

async function update(id, params) {
  const user = await getUser(id);
  // validate
  const mobileNoChanged = params.userName && user.userName !== params.userName;
  if (
    mobileNoChanged &&
    (await db.Son_Register.findOne({ where: { userName: params.userName } }))
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
  const user = await db.Son_Register.findByPk(id);
  if (!user) throw "User not found";
  return user;
}

function omitHash(user) {
  const { hash, ...userWithoutHash } = user;
  return userWithoutHash;
}

async function getByUserName(name) {
  const user = await db.Son_Register.findOne({ where: { userName: name } });
  if (!user) throw "User not found";
  return user;
}
