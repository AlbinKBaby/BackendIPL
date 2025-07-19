const users = require('../Models/userSchema');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');

// Common register logic
const registerCommon = async (req, res, userData) => {
        try {
                const { email, password } = req.body;

                const existingUser = await users.findOne({ email });
                if (existingUser) {
                        return res.status(409).json({ message: "Account already exists" });
                }

                const hashedPassword = await bcrypt.hash(password, 10);

                const newUser = new users({
                        ...userData,
                        email,
                        password: hashedPassword,
                });

                await newUser.save();

                const token = jwt.sign(
                        { userId: newUser._id, role: newUser.role },
                        process.env.JWTSECRET || "defaultsecret",
                        { expiresIn: "1d" }
                );

                return res.status(201).json({
                        message: `${userData.role} registered successfully`,
                        token,
                        user: {
                                _id: newUser._id,
                                name: newUser.name,
                                email: newUser.email,
                                role: newUser.role,
                        }
                });

        } catch (error) {
                console.error("Register error:", error);
                return res.status(500).json({ message: "Registration failed" });
        }
};

// ✅ Team Register
exports.registerUser = async (req, res) => {
        try {
                console.log("REGISTER BODY:", req.body);
                console.log("REGISTER FILE:", req.file);

                const { name, captianName, email, password, coachName } = req.body;

                if (!name || !captianName || !email || !password || !coachName) {
                        return res.status(400).json({ message: "Missing required fields" });
                }

                const logoPath = req.file ? req.file.filename : '';

                return registerCommon(req, res, {
                        name,
                        captianName,
                        coachName,

                        role: 'team',
                        logo: logoPath,
                });
        } catch (err) {
                console.error(err);
                return res.status(500).json({ message: "Internal server error" });
        }
};

// ✅ Association Register
exports.registerAsso = async (req, res) => {
        try {
                const { name, email, password, state } = req.body;

                if (!name || !email || !password || !state) {
                        return res.status(400).json({ message: "Missing required fields" });
                }

                return registerCommon(req, res, {
                        name,
                        state,
                        role: 'association',
                });
        } catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Internal server error" });
        }
};

//  Admin Register
exports.registerAdmin = async (req, res) => {
        try {
                const { name, email, password } = req.body;

                if (!name || !email || !password) {
                        return res.status(400).json({ message: "Missing required fields" });
                }

                return registerCommon(req, res, {
                        name,
                        role: 'admin',
                });
        } catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Internal server error" });
        }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Email not registered" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { password: pwd, ...userData } = user._doc; // remove password before sending

    res.status(200).json({
      message: "Login successful",
      user_data: userData,
      jwt_Token: token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error during login" });
  }
};
