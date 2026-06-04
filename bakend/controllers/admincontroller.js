import validator from 'validator';
import bcrypt from "bcrypt";
import { v2 as cloudinary } from 'cloudinary';
import {doctorModel} from "../models/doctormodel.js";
import jwt from 'jsonwebtoken';
import userModel from "../models/usermodel.js";
import appointmentModel from "../models/appointmentModel.js";
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degrees, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        // Check for missing required fields
        if (!name || !email || !password || !speciality || !degrees || !experience || !about || !fees || !address) {
            return res.status(400).json({ success: false, message: "Missing details" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please enter a strong password" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Upload image if provided
        let imageUrl = "";
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            imageUrl = imageUpload.secure_url;
        }

        // Prepare doctor data
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degrees,
            experience,
            about,
            fees,

            date: Date.now(),
        };

        let parsedAddress;
        try {
            parsedAddress = JSON.parse(req.body.address);
        } catch (jsonError) {
            return res.status(400).json({ success: false, message: "Invalid address format" });
        }
        doctorData.address = parsedAddress;

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.json({ success: true, message: "Doctor Added" });
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: "Error creating doctor" });
    }
}

//api for admin login

const loginAdmin = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(email === process.env.ADMIN_EMAIL  && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success: true, token});
        }else{
            res.status(401).json({success:false, message: "Invalid credentials"});
        }

    }catch (err){
        console.log(err)
        res.status(500).json({ success: false, message: err.message });
    }
}

const allDoctors = async (req, res) => {
    try{
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true, doctors})
    }catch (error){
        console.log(error)
        res.status(500).json({success:false, message:error.message})
    }
}

const appointmentsAdmin = async (req, res) => {
    try{
        const appointments = await appointmentModel.find({})
        res.json({success:true, appointments})
    }catch (error){
        console.log(error)
        res.status(500).json({success:false, message:error.message})
    }
}

const appointmentCancel = async (req, res) => {
    try{
        const {appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if(!appointmentData){
            return res.status(404).json({success:false, message:"Appointment not found"})
        }
        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})

        const {docId, slotDate, slotTime} = appointmentData
        const doctorData = await doctorModel.findById(docId)
        if(doctorData && doctorData.slots_booked && doctorData.slots_booked[slotDate]){
            let slots_booked = doctorData.slots_booked
            slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
            await doctorModel.findByIdAndUpdate(docId, {slots_booked})
        }

        res.json({success:true, message:"Appointment Cancelled"})
    }catch (error){
        console.log(error)
        res.status(500).json({success:false, message:error.message})
    }
}

const appointmentComplete = async (req, res) => {
    try{
        const {appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if(!appointmentData){
            return res.status(404).json({success:false, message:"Appointment not found"})
        }
        if(appointmentData.cancelled){
            return res.status(400).json({success:false, message:"Cannot complete a cancelled appointment"})
        }
        await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted:true})
        res.json({success:true, message:"Appointment Completed"})
    }catch (error){
        console.log(error)
        res.status(500).json({success:false, message:error.message})
    }
}

const adminDashboard = async (req, res) => {
    try{
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctorsCount: doctors.length,
            patientsCount: users.length,
            appointmentsCount: appointments.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }

        res.json({success:true, dashData})
    }catch (error){
        console.log(error)
        res.status(500).json({success:false, message:error.message})
    }
}

export { addDoctor, allDoctors, loginAdmin, appointmentsAdmin, appointmentCancel, appointmentComplete, adminDashboard };
