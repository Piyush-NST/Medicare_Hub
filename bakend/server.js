import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectCloudinary from "./config/cloudinary.js";
import connectDB from "./config/mongoBD.js";
import adminRouter from "./routes/adminroute.js";
import doctorRouter from "./routes/doctorroute.js";

import userRouter from "./routes/userRoute.js";

import job from "./config/cron.js";

if(process.env.NODE_ENV === "production") job.start();

const app = express();
const port = process.env.PORT || 4000;
connectDB()
connectCloudinary()

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
    res.send("API WORKING Done")
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    })
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})

