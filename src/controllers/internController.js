const internModel = require("../models/internModel");
const mongoose = require("mongoose");
const collegeModel = require("../models/collegeModel");

const validation = function (value) {
  if (typeof value === undefined || typeof value === null) {return false;}
  if (typeof value === "string" && value.trim().length > 0) {return true;}};


  const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
  }



const createIntern = async (req, res) => {
  try {
    const data = req.body;
    if (Object.keys(data) == 0) {
      return res.status(400).send({ staus: false, msg: "Input the data " });   }
      const { name, email, mobile, collegeId } = data;

      if (!validation(name)) {return res.status(400).send({ status: false, msg: "Name is required" });}

    if (!validation(email)) { return res.status(400).send({ status: false, msg: "Email is required" });}
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return res.status(404).send({ status: false, message: "Enter  valid email address " });}

      const Email = await internModel.findOne({email : data.email})
      if( Email){ return res.status(400).send({ status: false, msg: " Email is already exist" }) }


    if (!validation(mobile)) {return res.status(400).send({ status: false, msg: "Mobile number is required" });}
    if (!/^(\()?\d{3}(\))?(|\s)?\d{3}(|\s)\d{4}$/.test(mobile)) {
      return res.status(404).send({ status: false, message: "Enter  valid mobile number " });}


      const Mobile = await internModel.findOne({mobile : data.mobile})
        if( Mobile){ return res.status(400).send({ status: false, msg: " Mobile is already exist" }) }


    if (!validation(collegeId)) {return res.status(400).send({ status: false, msg: "CollegeId is required" });}

    if (!isValidObjectId(collegeId)) {
      return res.status(400).send({ status: false, message: "Enter valid collageId" })} 
      const Id = await collegeModel.findOne({_id : collegeId })//.populate("CollegeData")
      if (!Id) {return res.status(404).send({ status: false, msg: "This CollegeId is invalid "})}
      //if (Id ==undefined || Id ==null) {return res.status(400).send({ status: false, msg: "invalid id present" });}


    const SavedData = await internModel.create(data);
    return res.status(201).send({ status: true, msg: SavedData });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error });
  }
};
module.exports.createIntern = createIntern;
