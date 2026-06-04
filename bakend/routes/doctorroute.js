import express from "express";
import {doctorLogin, doctorList} from "../controllers/doctorcontroller.js";
const doctorRouter = express.Router()
doctorRouter.post('/login', doctorLogin)
doctorRouter.get('/list', doctorList)

export default doctorRouter