const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const bcrypt = require('bcrypt')



exports.loginAdmin = async (req, res) => {
        console.log("Inside admin login controller function");

        try {
                const { email, password } = req.body;

                if (!email || !password) {
                        return res.status(400).json({ error: "Email and password required" });
                }

                const admin = await users.findOne({ email, role: 'admin' });

                if (!admin) {
                        return res.status(406).json({ error: "Invalid admin credentials" });
                }

                const isPasswordCorrect = await bcrypt.compare(password, admin.password);
                if (!isPasswordCorrect) {
                        return res.status(406).json({ error: "Invalid sasi credentials" });
                }

                const token = jwt.sign(
                        { userId: admin._id, role: admin.role },
                        process.env.JWTSECRET || "supersecretkey",
                        { expiresIn: "1d" }
                );

                return res.status(200).json({
                        token,
                        message: "Admin login successful",
                        admin: {
                                id: admin._id,
                                email: admin.email,
                                role: admin.role,
                        }
                });

        } catch (error) {
                console.error("Admin login error:", error);
                if (!res.headersSent) {
                        return res.status(500).json({ error: "Internal server error" });
                }
        }
};