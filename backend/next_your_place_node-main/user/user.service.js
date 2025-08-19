const _ = require("lodash");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../_helpers/db");
const config = require("../config.json");
const { decrypt, encrypt } = require("../utils/globals");
const User = db.User;

const jwtConfig = {
  secret: process.env.SECRET_KEY || config.SECRET_KEY,
  expiresIn: process.env.EXPIRES_IN || config.EXPIRES_IN,
  // expiresIn: process.env.EXPIRES_IN // doesn't work on production
};

module.exports = {
  authenticate,
  authenticatewithtoken,
  getAll,
  getById,
  create,
  update,
  updateByEmail,
  delete: _delete,
  deleteByIds: deleteByIds,
};

async function authenticate({ email, password }) {
  try {
    const user = await User.findOne({ email: email });

    if (user && bcrypt.compareSync(password, user.password)) {
      const access_token = jwt.sign({ email }, jwtConfig.secret, {
        expiresIn: jwtConfig.expiresIn,
      });

      update(user.id, { lastSignedInDate: new Date() });

      return { user, access_token };
    }
  } catch (e) {
    console.error(e);
    const error = "Invalid access token detected";
    return [401, { error }];
  }
}

async function authenticatewithtoken({ access_token }) {
  try {
    const { email } = jwt.verify(access_token, jwtConfig.secret);

    const user = await User.findOne({ email });

    const updatedAccessToken = jwt.sign(
      { email: user.email },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    update(user.id, { lastSignedInDate: new Date() });

    return { user, access_token: updatedAccessToken };
  } catch (e) {
    console.error(e);
    const error = "Invalid access token detected";
    return [401, { error }];
  }
}

async function getAll() {
  // return await User.find();

  return await User.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "customerId",
        foreignField: "_id",
        as: "customer",
      },
    },
    {
      $addFields: {
        id: "$_id",
      },
    },
  ]);
}

async function getById(id) {
  return await User.findById(id);
}

async function create(userParam) {
  // validate
  if (await User.findOne({ email: userParam.email })) {
    throw 'Email "' + userParam.email + '" is already taken';
  }

  const user = new User(userParam);

  // hash password
  if (userParam.password) {
    user.password = bcrypt.hashSync(userParam.password, 10);
  }

  const access_token = jwt.sign({ email: userParam.email }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });

  // save user
  await user.save();

  return { user, access_token };
}

async function update(id, userParam) {
  const user = await User.findById(id);

  const access_token = jwt.sign({ id: user.email }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });

  // validate
  if (!user) throw "User not found";
  if (
    user.username !== userParam.username &&
    (await User.findOne({ username: userParam.username }))
  ) {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  // hash password if it was entered
  if (userParam.password) {
    userParam.password = bcrypt.hashSync(userParam.password, 10);
  }

  // copy userParam properties to user
  Object.assign(user, userParam);

  await user.save();

  return { user, access_token };
}

async function updateByEmail(encryptedEmail, userParam) {
  try {
    const email = decrypt(encryptedEmail);

    const user = await User.findOne({ email });

    const access_token = jwt.sign({ id: user.email }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });

    // validate
    if (!user) throw "User not found";

    await update(user.id, {
      ...userParam,
      email,
      lastSignedInDate: new Date(),
    });

    return { user, access_token };
  } catch (e) {
    const error = e.message;
    return [401, { error }];
  }
}

async function _delete(id) {
  return await User.findByIdAndRemove(id);
}

async function deleteByIds(ids) {
  return await User.deleteMany({ _id: { $in: ids } });
}