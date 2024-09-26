const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const employeeSchema = new mongoose.Schema({
    email: {
      type: String,
      required: [true, "Your email address is required"],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Your username is required"],
    },
    password: {
      type: String,
      required: [true, "Your password is required"],
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
});

employeeSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12)
})

module.exports = mongoose.model("Employee", employeeSchema)