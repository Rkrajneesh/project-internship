const mongoose = require("mongoose");
 require('mongoose-type-url');

const collegeModel = new mongoose.Schema({
  name: { type: String,
      required:[true , "Enter the college name"],
      unique:true,
      lowercase: true, 
      trim : true
     },
  fullname: { type: String, required:[true, "Enter the full name" ],trim : true},
  logolink: { type: mongoose.SchemaTypes.Url, required: true},
  isDeleted: { type: Boolean, default: false }
});
module.exports = mongoose.model("CollegeData", collegeModel);


