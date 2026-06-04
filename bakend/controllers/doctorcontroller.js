import {doctorModel} from "../models/doctormodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const doctorLogin = async (req, res) => {
    try {
        const {email, password} = req.body
        const doctor = await doctorModel.findOne({email})
        if (!doctor) {
            return res.status(401).json({success: false, message: "Invalid credentials"})
        }
        const isMatch = await bcrypt.compare(password, doctor.password)
        if (!isMatch) {
            return res.status(401).json({success: false, message: "Invalid credentials"})
        }
        const token = jwt.sign({id: doctor._id}, process.env.JWT_SECRET)
        res.json({success: true, token, doctor: {name: doctor.name, email: doctor.email}})
    } catch (err) {
        console.log(err)
        res.status(500).json({success: false, message: err.message})
    }
}

const changeAvailability = async(req, res)=>{
    try{
        const {docId} = req.body

        const docData = await doctorModel.findById(docId)
        if (!docData) {
            return res.status(404).json({success: false, message: "Doctor not found"})
        }

        await doctorModel.findByIdAndUpdate(docId, {available: !docData.available})
        res.json({success:true, message:'Availability Changed'})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false, message:error.message})
    }
}

const doctorList = async(req, res)=>{
    try{
        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        res.json({success:true, doctors})
    }catch (e) {
        console.log(e)
        res.status(500).json({success:false, message:e.message})

    }
}
export  {doctorLogin, changeAvailability, doctorList}