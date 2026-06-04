import express from 'express'
import authAdmin from "../middleware/authAdmin.js";

import {addDoctor, allDoctors, loginAdmin, appointmentsAdmin, appointmentCancel, appointmentComplete, adminDashboard} from "../controllers/admincontroller.js";
import upload from "../middleware/multer.js";
import {changeAvailability} from "../controllers/doctorcontroller.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor)
adminRouter.post("/login", loginAdmin)
adminRouter.post("/all-doctors", authAdmin, allDoctors)
adminRouter.post("/change-availability", authAdmin, changeAvailability)
adminRouter.get("/appointments", authAdmin, appointmentsAdmin)
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel)
adminRouter.post("/complete-appointment", authAdmin, appointmentComplete)
adminRouter.get("/dashboard", authAdmin, adminDashboard)


export default adminRouter;