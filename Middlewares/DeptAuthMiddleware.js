const User = require("../Models/Department");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.deptVerification = (req, res) => {
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
      if (user) return res.json({ status: true, user: user.name })
      else return res.json({ status: false })
    }
  })
}
