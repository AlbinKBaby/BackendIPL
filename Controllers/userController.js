const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const bcrypt = require('bcrypt')


// user registration
exports.registerUser = async (req, res) => {
        // here we write logic to resolve
        console.log("inside the user controller")
        // sending back to fe
        res.status(201).json("Register req recieved")

        const { name, captianName, email, password, coachName, role } = req.body;
        try {
                const existingUser = await users.findOne({ email: email });
                if (existingUser) {
                        return res.status(409).json("Account is already exist")
                }
                const hashedPassword = await bcrypt.hash(password, 10);

                const newUser = new users({
                        name,
                        captianName,
                        email,
                        password:hashedPassword,
                        coachName,
                        role,
                        logo: ""
                });
                await newUser.save()
                return res(201).json("Register requested Successfully")

        }
        catch (error) {
                console.error("Register error : ", error)
                return res.status(500).json("Register req failed")
        }

}


// user login
exports.loginUser = async (req, res) => {
        console.log("Inside login controller function");

        try {
                const { email, password } = req.body;

                console.log("Email received:", email);
                console.log("Password received:", password);

                if (!email || !password) {
                        return res.status(400).json({ error: "Email and password required" });
                }

                const existingUser = await users.findOne({ email: email });
                if (!existingUser) {
                        return res.status(406).json({ error: "Invalid credentials" });
                }

                const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
                console.log(isPasswordCorrect);

                if (!isPasswordCorrect) {
                        return res.status(406).json({ error: "Invalid credentials poppo" });



                }

                const token = jwt.sign(
                        { userId: existingUser._id, role: existingUser.role },
                        process.env.JWTSECRET || "supersecretkey",
                        { expiresIn: "1d" }
                );

                const safeUser = {
                        _id: existingUser._id,
                        name: existingUser.name,
                        email: existingUser.email,
                        role: existingUser.role,
                };

                return res.status(200).json({
                        user_data: safeUser,
                        jwt_Token: token,
                        message: "Login successful",
                });

        } catch (error) {
                console.error("Login error:", error);
                if (!res.headersSent) {
                        return res.status(500).json({ error: "Login request failed" });
                }
        }
};
exports.registerAsso = async (req, res) => {
    console.log("Inside the Asso controller");

    const { name, state, email, password } = req.body;

    try {
        const existingUser = await users.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json({ message: "Account already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAsso = new users({
            name,
            state,
            password: hashedPassword,
            role: "association", // ✅ hardcode role here
        });
            email,

        await newAsso.save();

        return res.status(201).json({ message: "Association registered successfully" });

    } catch (error) {
        console.error("Register error : ", error);
        return res.status(500).json({ message: "Registration failed" });
    }
};

exports.registerAdmin = async (req, res) => {
    console.log("Inside the Asso controller");

    const { name, email, password } = req.body;

    try {
        const existingUser = await users.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json({ message: "Admin Account already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new users({
            name,
            email,
            password: hashedPassword,
            role: "admin", // ✅ hardcode role here
        });
            

        await newAdmin.save();

        return res.status(201).json({ message: "Admin registered successfully" });

    } catch (error) {
        console.error("Register error : ", error);
        return res.status(500).json({ message: "Registration failed" });
    }
};
