import {createContext} from 'react'
import {useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

export const AdminContext = createContext()
const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState(localStorage.getItem("aToken") ? localStorage.getItem('aToken'):'')
    const [doctors, setDoctors]=useState([])
    const [appointments, setAppointments]=useState([])
    const [dashData, setDashData]=useState({})
    const [loading, setLoading] = useState(false)
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

    const getAllDoctors = async ()=>{
        setLoading(true)
        try{
            const {data} = await axios.post(backendUrl + '/api/admin/all-doctors', {}, {headers:{aToken}} )
            if (data.success){
                setDoctors(data.doctors)
            }else{
                toast.error(data.message)
            }
        }catch(e){
            toast.error(e.message)
        }finally{
            setLoading(false)
        }
    }

    const changeAvailability = async(docId)=>{
        try{
            const {data}=await  axios.post(backendUrl + '/api/admin/change-availability', {docId}, {headers:{aToken}})
            if(data.success){
                toast.success(data.message)
                getAllDoctors()
            }else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(error.message)
            console.log(error)
        }
    }

    const getAllAppointments = async ()=>{
        setLoading(true)
        try{
            const {data} = await axios.get(backendUrl + '/api/admin/appointments', {headers:{aToken}})
            if(data.success){
                setAppointments(data.appointments)
            }else{
                toast.error(data.message)
            }
        }catch(e){
            toast.error(e.message)
        }finally{
            setLoading(false)
        }
    }

    const cancelAppointment = async (appointmentId)=>{
        try{
            const {data} = await axios.post(backendUrl + '/api/admin/cancel-appointment', {appointmentId}, {headers:{aToken}})
            if(data.success){
                toast.success(data.message)
                getAllAppointments()
            }else{
                toast.error(data.message)
            }
        }catch(e){
            toast.error(e.message)
        }
    }

    const completeAppointment = async (appointmentId)=>{
        try{
            const {data} = await axios.post(backendUrl + '/api/admin/complete-appointment', {appointmentId}, {headers:{aToken}})
            if(data.success){
                toast.success(data.message)
                getAllAppointments()
            }else{
                toast.error(data.message)
            }
        }catch(e){
            toast.error(e.message)
        }
    }

    const getDashboardData = async ()=>{
        setLoading(true)
        try{
            const {data} = await axios.get(backendUrl + '/api/admin/dashboard', {headers:{aToken}})
            if(data.success){
                setDashData(data.dashData)
            }else{
                toast.error(data.message)
            }
        }catch(e){
            toast.error(e.message)
        }finally{
            setLoading(false)
        }
    }

    const value = {
        aToken, setAToken,
        backendUrl, doctors,
        appointments, dashData, loading,
        getAllDoctors, changeAvailability,
        getAllAppointments, cancelAppointment,
        completeAppointment, getDashboardData,
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider