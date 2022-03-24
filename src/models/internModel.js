const mongoose = require("mongoose");

const internModel = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  email: {
    type: String,
    required: [true, "Enter the Email id"],
    unique: true,
  },
  mobile: {
    type: String,
    unique : [true,"Mobile number already exist"],
    required: [true, "User phone number required"], },

  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CollegeData",
    required: true,
  },
  isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("internData", internModel);




//required: true, match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/
// , unique: true },

// validate: {
//   validator: function (email) {
//     return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
//   },
//   message: "Please enter a valid email",
// },

//   
