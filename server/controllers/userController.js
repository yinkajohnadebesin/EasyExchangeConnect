const { getUserProfileById } = require("../models/userModel");

const getUserProfile = async (req, res) => {
    try {
        const user = await getUserProfileById(req.user.Student_ID);
        res.json(user);
    } catch (error) {
        res.status(404).json({ message: "User not found", error });
    }
};

module.exports = { getUserProfile };
