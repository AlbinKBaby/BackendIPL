const players = require("../Models/playerSchema");

exports.addPlayer = async (req, res) => {
    try {
        const { name, date, nationality, email,
            specialization, style,wk, home, baseprice,
            matches, runs, wickets, photo
        } = req.body;

        const existingUser = await players.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Account already exists" });
        }

        const newPlayer = new players({
            name, date, nationality, email,
            specialization, style, wk,  home, baseprice,
            matches, runs, wickets, photo
        });

        await newPlayer.save();
        res.status(201).json({ message: `${name} Registered Successfully` });
    } catch (err) {
        res.status(401).json({ message: "Register request failed", error: err.message });
    }
};
