const jwt = require("jsonwebtoken");
const { randomUUID } = require("crypto");
require("dotenv").config({ path: "./.env" });
const User = require("../models/User");

const getUserDetails = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Extract token from the 'Authorization' header

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the JWT token
    const foundUser = await User.findById(decoded.userId); // Find the user using the userId from the decoded JWT payload
    console.log("user..from token", foundUser);
    if (foundUser) {
      res.status(200);
      res.send({
        Status: 200,
        Message: "User details retrieved successfully.",
        name: foundUser.name,
        email: foundUser.email,
        userId: foundUser._id,
      });
    } else {
      res.status(404);
      res.send({ Status: 404, Message: "User not found." });
    }
  } catch (error) {
    res.status(401);
    res.send({ Status: 401, Message: "Unauthorized request." });
  }
};

module.exports = {
  getUserDetails,
};
