import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ENDPOINT from "../constants.js";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currencySymbol = '$';
    const backendUrl = ENDPOINT;

    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token") || false);
    const [userData, setUserData] = useState(false);

    // 🔥 GLOBAL LOADING STATE
    const [loading, setLoading] = useState(false);

    console.log("run till here");

    // -------------------------
    // ⭐ FETCH DOCTORS
    // -------------------------
    const getDoctorsData = async () => {
        try {
            setLoading(true);   // 🔥 START LOADING

            console.log("come inside");
            const { data } = await axios.get(backendUrl + "/api/doctor/list", {
                headers: { token },
            });

            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        } finally {
            setLoading(false);  // 🔥 STOP LOADING
        }
    };

    // -------------------------
    // ⭐ LOAD USER PROFILE
    // -------------------------
    const loadUserProfileData = async () => {
        try {
            setLoading(true);   // 🔥 START LOADING

            const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
                headers: { token },
            });

            if (data.success) {
                setUserData(data.userData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        } finally {
            setLoading(false);  // 🔥 STOP LOADING
        }
    };

    // AUTO RUN DOCTORS FETCH
    useEffect(() => {
        getDoctorsData();
    }, []);

    // AUTO RUN PROFILE FETCH WHEN TOKEN CHANGES
    useEffect(() => {
        if (token) {
            loadUserProfileData();
        } else {
            setUserData(false);
        }
    }, [token]);

    // -------------------------
    // CONTEXT VALUE
    // -------------------------
    const value = {
        doctors,
        getDoctorsData,
        currencySymbol,
        token,
        setToken,
        backendUrl,
        userData,
        setUserData,
        loadUserProfileData,

        // 🔥 ADD THESE
        loading,
        setLoading,
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
