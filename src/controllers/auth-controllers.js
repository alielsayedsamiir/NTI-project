const User = require("../models/user-model");
const generateToken = require("../utils/get-jwt");
const deleteUploadedFile = require("../utils/delete-uploaded-file");

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, phone } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (req.file) await deleteUploadedFile("users", req.file.filename);
      return res.status(400).json({ status: "fail", message: "Email already registered" });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role: role || "student",
      phone,
      imageUrl: req.file ? req.file.filename : "default-user.webp",
    });

    user.password = undefined;
    const token = generateToken(user);

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      token,
      data: { user },
    });
  } catch (error) {
    if (req.file) await deleteUploadedFile("users", req.file.filename);
    res.status(400).json({ status: "error", message: error.message });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ status: "fail", message: "Provide email and password" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ status: "fail", message: "Invalid email or password" });
    }

    user.password = undefined;
    const token = generateToken(user);

    res.status(200).json({ status: "success", token, data: { user } });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

module.exports = { signup, signin };