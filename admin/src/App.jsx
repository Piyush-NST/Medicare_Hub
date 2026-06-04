import React, {useContext, useEffect} from 'react';
import Login from "./pages/Login.jsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar.jsx";
import {AdminContext} from "./context/AdminContext.jsx";
import SideBar from "./components/SideBar.jsx";
import {Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import Appointments from "./pages/Admin/Appoitments.jsx";
import AddDoctor from "./pages/Admin/AddDoctor.jsx";
import DoctorsList from "./pages/Admin/DoctorsList.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import axios from "axios";

const App = () => {
    const {aToken} = useContext(AdminContext)

    useEffect(() => {
        axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response) {
                    const msg = error.response.data?.message || error.message
                    if (error.response.status === 401) {
                        localStorage.removeItem('aToken')
                        window.location.reload()
                    }
                }
                return Promise.reject(error)
            }
        )
    }, [])

    return aToken? (
        <ErrorBoundary>
            <div className="bg-[#F8F9FD]">
                <ToastContainer/>
                <Navbar/>
                <div className="flex items-start">
                    <SideBar/>
                    <Routes>
                        <Route path="/" element={<></>}/>
                        <Route path="/admin-dashboard" element={<Dashboard/>}/>
                        <Route path="/all-appointments" element={<Appointments/>}/>
                        <Route path="/add-doctor" element={<AddDoctor/>}/>
                        <Route path="/DoctorList" element={<DoctorsList/>}/>
                    </Routes>
                </div>
            </div>
        </ErrorBoundary>
    ):(
        <>
            <Login/>
            <ToastContainer/>
        </>
    )
}

export default App;