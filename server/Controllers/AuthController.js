const Employee = require('../Models/Employee');
const { createSecretToken } = require('../util/SecretToken');
const bcrypt = require('bcrypt');

module.exports.SignUp = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await Employee.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Employee.create({ email, password: hashedPassword, username, createdAt });
    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res.status(201).json({ message: "User signed up successfully", success: true, user });
    next();

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

module.exports.LogIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email });

    if (!employee) {
      return res.status(400).json({ message: 'Incorrect email or password' });
    }

    const auth = await bcrypt.compare(password, employee.password);

    if (!auth) {
      return res.status(400).json({ message: 'Incorrect email or password' });
    }

    const token = createSecretToken(employee._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
    });

    res.status(200).json({ message: "Employee logged in successfully", success: true });
    next();

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};
