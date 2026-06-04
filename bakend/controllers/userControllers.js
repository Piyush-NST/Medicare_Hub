import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/usermodel.js";
import jwt from "jsonwebtoken";
import {v2 as cloudinary} from 'cloudinary'
import {doctorModel} from "../models/doctormodel.js";
import appointmentModel from "../models/appointmentModel.js";
import razorpay from 'razorpay'
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Missing Details" });
        }

        // Validating email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Enter a valid email" });
        }

        // Validating strong password
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Enter a strong password" });
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword,
        };

        const newUser = new userModel(userData);
        const user = await newUser.save();

        console.log("User created:", user); // Check if user is saved

        // Generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        console.log(token);
        console.log("Token generated:", token); // Check if token is generated

        res.json({ success: true,message:"Account created Successfully", token });

    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
}

//api for user login


const loginUser=async (req, res)=>{
    try{
        const {email, password} = req.body
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false, message:"User does not exist"})

        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch){
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            res.json({success:true, token})
        }else{
            res.json({success:false,message:"Invalid credentials"})
        }
    }catch (err){
        console.log("Error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
}

// api to get user profile data

const getProfile = async (req, res)=>{
    console.log(req.body);
    try{
        const {userId} = req.body
        const userData = await userModel.findById(userId).select('-password')
        res.json({success:true, userData})
    }catch(err){
        console.log(err)
        res.json({success:false, message:err.message})
    }
}

// api to update user profile

const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;
        console.log(req.body)

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" });
        }

        let parsedAddress;
        try {
            parsedAddress = JSON.parse(address);
        } catch (jsonError) {
            return res.status(400).json({ success: false, message: "Invalid address format" });
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: parsedAddress, dob, gender });

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            const imageUrl = imageUpload.secure_url;

            await userModel.findByIdAndUpdate(userId, { image: imageUrl });
        }

        res.json({ success: true, message: "Profile Updated" });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message });
    }
};

// api to book appointment

const bookAppointment = async (req, res)=>{
    try{
        const {userId, docId, slotDate, slotTime} = req.body

        const docData = await doctorModel.findById(docId).select('-password')

        if(!docData.available){
            return res.json({success:false, message:"Doctor not available"})
        }

        let slots_booked = docData.slots_booked

        //check slots availability

        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success:false, message:"Slot not available"})
            }else{
                slots_booked[slotDate].push(slotTime)
            }
        }else{
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')

        delete docData.slots_booked //we don't want history of doctor booked that's why we deleting
        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount:docData.fees,
            slotTime,
            slotDate,
            date:Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        await doctorModel.findByIdAndUpdate(docId, {slots_booked})
        res.json({success:true, message:"Appointment Booked"})
    }catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message });
    }

}

//api to user appointment for frontend my appointment page

const listAppointment = async (req, res)=>{
    try{
        const {userId} = req.body;

        const appointments = await appointmentModel.find({userId})
        res.json({success:true, appointments})
    }catch (e) {
        console.log(e)
        res.json({success:false, message:e.message})
    }
}


//Api to cancel appointments

const cancelAppointments = async (req, res)=>{
    try{
        const {userId, appointmentId} = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId)
        // console.log(appointmentId)
        // console.log(appointmentData)
        // verify appointment user

        if(appointmentData.userId!==userId ){
            return res.json({success:false, message:"Appointment not found"})
        }
        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})
        //releasing doctors slot

        const {docId, slotDate, slotTime} = appointmentData
        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked
        slots_booked[slotDate]=slots_booked[slotDate].filter(e=>e!==slotTime)

        await doctorModel.findByIdAndUpdate(docId, {slots_booked})

        res.json({success:true, message:"Appointment Canceled"})

    }catch (e) {
        console.log(e)
        res.json({success:false, message:e.message})

    }
}

// const razorpayInstance = new razorpay({
//     key_id:'',
//     key_secret:''
// })

// api to make payment off appointment using razorpay

// const paymentRazorpay = async (req, res)=>{
//     const
// }
const deleteUser = async (req, res) => {
    try {
        const userId = req.body.userId;

        // Find and delete the user by their ID
        const deletedUser = await userModel.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: "User account has been deleted successfully" });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message });
    }
};


export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment,cancelAppointments,deleteUser };
