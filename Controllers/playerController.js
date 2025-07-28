const players = require("../Models/playerSchema");

exports.addPlayer = async (req, res) => {
    try {
        const { pname, date, nationality, email,
            specialization, style,wk, home, baseprice,
            matches, runs, wickets, photo
        } = req.body;

        // console.log(req.body);
        const existingUser = await players.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Account already exists" });
        }

        const newPlayer = new players({
            pname, date, nationality, email,
            specialization, style, wk,  home, baseprice,
            matches, runs, wickets, photo
        });

        await newPlayer.save();
        res.status(201).json({ message: `${pname} Registered Successfully` });
    } catch (err) {
        console.error("Add Player Error:", err);
        res.status(401).json({ message: "Register request failed BE", error: err.message });
    }
};
