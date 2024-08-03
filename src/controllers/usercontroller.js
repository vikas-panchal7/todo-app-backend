const User = require("../models/user");
const e = require("express");

const register = async (req, res) => {
  const user = new User(req.body);
  try {
    const emails = await User.findOne({ email: req.body.email });

    if (emails) {
      throw new Error("Email Id Already Exists");
    }

    await user.save();

    const token = await user.generateAuthToken();

    res.status(201).send({
      user,
      token,
      message: "Register Successful",
    });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.checkCredential(req.body.email, req.body.password);

    if (!user) throw new Error("Invalid Email or Password");

    const token = await user.generateAuthToken();

    res.send({ user, token, message: "Login Successful" });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

module.exports = {
  register,
  login,
};
