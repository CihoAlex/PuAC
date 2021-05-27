const { generateResponse } = require('../../helpers');
const User = require('../../models/User');
const {
  validateUserRegister,
  validateUserLogin,
} = require('../../validations');
const bcrypt = require('bcryptjs');

// GET ALL
const getUsers = async (res, body) => {
  try {
    const query = await User.find({});
    return generateResponse(res, query, 200);
  } catch (error) {
    return generateResponse(res, null, 400, error.message);
  }
};

// GET by ID
const getUserByID = async (res, _, id) => {
  try {
    if (id) {
      console.log('err');
      const query = await User.findById(id);
      if (query) {
        return generateResponse(res, query, 200);
      }
      return generateResponse(res, null, 400, 'Bad Request! Bad ID');
    }
    return generateResponse(res, null, 400, 'Bad Request! ID not provided!');
  } catch (error) {
    return generateResponse(res, null, 400, error.message);
  }
};

// DELETE by ID
const deleteUserByID = async (res, _, id) => {
  try {
    if (id) {
      const user = await User.findById(id);
      if (user) {
        const query = await User.findByIdAndRemove(id);
        return generateResponse(res, [], 200);
      }
      return generateResponse(res, null, 400, 'Bad Request! ID not found!');
    }
    return generateResponse(res, null, 400, 'Bad Request! ID not provided!');
  } catch (error) {
    return generateResponse(res, null, 400, error.message);
  }
};

// POST Add New User / Register
const registerUser = async (res, body) => {
  try {
    body = JSON.parse(body);
    const { errors, valid } = validateUserRegister(body);
    if (valid) {
      await User.init();
      body.password = await bcrypt.hash(body.password, 10);
      // const isEqual = await bcrypt.compare('asd', newPassword);
      await User.create({
        username: body.username,
        password: body.password,
      });
      return generateResponse(res, 'Successfully Register!', 201);
    }
    return generateResponse(res, null, 400, errors);
  } catch (error) {
    return generateResponse(res, null, 400, error.message);
  }
};

// PATCH on USER
const patchUser = async (res, body, id) => {
  try {
    body = JSON.parse(body);
    if (body && id) {
      await User.findByIdAndUpdate(id, body);
      return generateResponse(res, 'Updated Successfully', 200);
    }
  } catch (error) {
    return generateResponse(res, null, 400, error.message);
  }
};

const login = async (res, body) => {
  try {
    body = JSON.parse(body);
    const { errors, valid } = validateUserLogin(body);
    if (valid) {
      const user = await User.find({
        username: body.username,
      });
      if (user && user.length > 0) {
        const { id, username, password } = user[0];
        const passwordMatch = await bcrypt.compare(body.password, password);
        if (passwordMatch) {
          return generateResponse(res, { id, username }, 200);
        }
        return generateResponse(res, null, 400, 'Bad Credentials');
      }
      return generateResponse(res, null, 400, 'Bad Credentials');
    }
    return generateResponse(res, null, 400, errors);
  } catch (error) {
    return generateResponse(res, null, 400, error.message);
  }
};

module.exports = {
  getUsers,
  getUserByID,
  deleteUserByID,
  registerUser,
  patchUser,
  login,
};
