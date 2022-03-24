const collegeModel = require("../models/collegeModel")
const mongoose = require("mongoose")
const internModel = require("../models/internModel")



const isValid = function (value) {
    if (typeof (value) === undefined || typeof (value) === null) { return false }
    if (typeof (value) === "string" && (value).trim().length > 0) { return true }
    }

    
const createCollege = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data) == 0) return res.status(400).send({ status: false, msg: "BAD REQUEST NO DATA PROVIDED" })
       
        const { name, fullname, logolink  } = data
        //if(name === collegeModel.name){ return res.status(400).send({ status: false, msg: " name is already exist" }) }
        if (!isValid(name)) { return res.status(400).send({ status: false, msg: " Enter college name" }) }
        if (!isValid(fullname)) { return res.status(400).send({ status: false, msg: "full name is required" }) }
        if (!isValid(logolink)) { return res.status(400).send({ status: false, msg: "logolink is required" }) }
       
       
        const ExistName = await collegeModel.findOne({name : data.name})
        if( ExistName){ return res.status(400).send({ status: false, msg: " College name is already exist" }) }
       
        const ExistFullName = await collegeModel.findOne({fullname : data.fullname})
        if( ExistFullName){ return res.status(400).send({ status: false, msg: " College Fullname is already exist" }) }

       let savedData = await collegeModel.create(data)
       return res.status(201).send({ msg: savedData })
    }
    catch (error) {
        console.log(error)
      return  res.status(500).send({ msg: error.message })


    }
}

const getData = async (req,res)=>{
 try{ const college = req.query.CollegeName
 
  if(!college){return res.status(400).send({status :false,msg:"Enter college name"})}
  const savedata = await collegeModel.findOne({name :college, isDeleted :false})
  if(!savedata){ return res.status(404).send({msg :"Enter valid College name"}) }


  const saveData = await collegeModel.findOne({name :college, isDeleted :false}).select({collegeId :1,name:1,fullname:1,logolink:1})
  const {name ,fullname,logolink } = saveData
  const interests = [];


  const Intdata = await internModel.find({collegeId:saveData, isDeleted: false}).select({_id :1,name:1,email:1,mobile:1})
   interests.push( ...Intdata )
    const AllData = {name, fullname, logolink,interests }
    return res.status(200).send({status:true , Data :AllData})
}
catch(error){
  return res.status(500).send({status:false,msg :error})
}}
module.exports.getData = getData
module.exports.createCollege = createCollege 



// try{ const college = req.query.CollegeId
//   if(!college){return res.status(400).send({status :false,msg:"Enter college Id"})}
//  const savedata = await collegeModel.findOne({_id :college, isDeleted :false})
//   if(!savedata){ return res.status(400).send({msg :"Enter valid College Id"}) }
//  const saveData = await collegeModel.findOne({_id:college, isDeleted :false}).select({collegeId :1,name:1,fullname:1,logolink:1})