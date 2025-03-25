const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/userModel');
require('dotenv').config();


exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (user.length > 0) {
      return res.status(400).json({ message: 'User already registered', success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser({ firstName, lastName, email, password: hashedPassword, role });

    return res.status(200).json({ message: 'Registration successful!', success: true });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', success: false });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await findUserByEmail(email);

    if (result.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = result[0];

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid credentials', success: false });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'You are not allowed to log in from here', success: false });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Admin login successful', token, success: true });

  } catch (error) {
    res.status(500).json({ message: 'Server error', success: false });
  }
};
