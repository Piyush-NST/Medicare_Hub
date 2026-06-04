import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Doctors from "./pages/Doctors.jsx";
import Contact from "./pages/Contact.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import MyAppointment from "./pages/MyAppointment.jsx";
import Appointment from "./pages/Appointment.jsx";
import Login from "./pages/Login.jsx";
import './index.css';
import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import Loader from "./Components/Loader.jsx";

function App() {
    const { loading } = useContext(AppContext);
    return (
        <div className="mx-4 sm:mx-[10%]">
            {false && <Loader />}
            <Navbar />

            {/* ToastContainer added here */}
            <ToastContainer />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/doctors/:speciality" element={<Doctors />} />
                <Route path="/my-profile" element={<MyProfile />} />
                <Route path="/my-appointment" element={<MyAppointment />} />
                <Route path="/appointment/:docId" element={<Appointment />} />
            </Routes>

            <Footer />
        </div>
    );
}

export default App;
