const mongoose = require('mongoose');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge
  });
}

// register
const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = await User.create({ email, password });
    const token = createToken(newUser._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    return res.status(201).json(newUser);
  } catch (error) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
      return res.status(400).json({ error: 'email must be unique' });
    }
    return res.status(400).json({ error: error.message });
  }
};

// login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    if(user){
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      return res.status(200).json({ user: user._id });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// logout
const logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  return res.status(200).json({ message: 'logged out' });
};

module.exports = {
  register,
  login,
  logout
};
