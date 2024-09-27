const User = require("../Models/Agency");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.agencyVerification = (req, res) => {
  const token = req.cookies.token
  if (!token) {
    console.log("token == null at middleware")
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
    console.log("cannot verify jwt")
     return res.json({ status: false })
    } else {
      console.log("jwt has been verified")
      const user = await User.findById(data.id)
      if (user) return res.json({ status: true, user: user.username })
      else return res.json({ status: false })
    }
  })
}
