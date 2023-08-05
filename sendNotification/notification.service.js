const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");

module.exports = {
  authenticate,
  getAll,
  getById,
  getByEmailId,
  create,
  update,
  delete: _delete,
};

async function authenticate({ emailId }) {
  const user = await db.Notification.scope("withHash").findOne({
    where: { emailId },
  });
  // authentication successful
  const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: "7d" });
  return { ...omitHash(user.get()), token };
}

async function getAll() {
  return await db.Notification.findAll();
}

async function getById(id) {
  return await getUser(id);
}

async function create(params) {
  // save user
  await db.Notification.create(params);
}

async function update(id, params) {
  const user = await getUser(id);
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
  const user = await db.Notification.findByPk(id);
  if (!user) throw "User not found";
  return user;
}

function omitHash(user) {
  const { hash, ...userWithoutHash } = user;
  return userWithoutHash;
}

async function getByEmailId(emailId) {
  const user = await db.Notification.findAll({ where: { emailId: emailId } });
  if (!user) throw "User not found";
  return user;
}
