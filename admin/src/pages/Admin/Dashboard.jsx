import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext.jsx";
import { assets } from "../../assets/assets.js";

const Dashboard = () => {
    const { dashData, getDashboardData, aToken } = useContext(AdminContext)

    useEffect(() => {
        if (aToken) {
            getDashboardData()
        }
    }, [aToken])

    return dashData && dashData.doctorsCount !== undefined ? (
        <div className="m-5">
            <p className="text-lg font-medium">Dashboard</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                <div className="flex items-center gap-4 bg-white p-6 rounded-lg border border-gray-200">
                    <img className="w-12 h-12" src={assets.doctor_icon} alt=""/>
                    <div>
                        <p className="text-2xl font-semibold text-gray-800">{dashData.doctorsCount}</p>
                        <p className="text-gray-500">Doctors</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-white p-6 rounded-lg border border-gray-200">
                    <img className="w-12 h-12" src={assets.patients_icon} alt=""/>
                    <div>
                        <p className="text-2xl font-semibold text-gray-800">{dashData.patientsCount}</p>
                        <p className="text-gray-500">Patients</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-white p-6 rounded-lg border border-gray-200">
                    <img className="w-12 h-12" src={assets.appointments_icon} alt=""/>
                    <div>
                        <p className="text-2xl font-semibold text-gray-800">{dashData.appointmentsCount}</p>
                        <p className="text-gray-500">Appointments</p>
                    </div>
                </div>
            </div>

            <div className="bg-white mt-6 rounded-lg border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                    <p className="text-lg font-medium text-gray-800">Latest Appointments</p>
                </div>
                {dashData.latestAppointments && dashData.latestAppointments.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-gray-500 border-b border-gray-100">
                                    <th className="text-left py-3 px-6 font-medium">#</th>
                                    <th className="text-left py-3 px-6 font-medium">Patient</th>
                                    <th className="text-left py-3 px-6 font-medium">Doctor</th>
                                    <th className="text-left py-3 px-6 font-medium">Date</th>
                                    <th className="text-left py-3 px-6 font-medium">Time</th>
                                    <th className="text-left py-3 px-6 font-medium">Amount</th>
                                    <th className="text-left py-3 px-6 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dashData.latestAppointments.map((item, index) => (
                                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-3 px-6">{index + 1}</td>
                                        <td className="py-3 px-6">{item.userData?.name || "N/A"}</td>
                                        <td className="py-3 px-6">{item.docData?.name || "N/A"}</td>
                                        <td className="py-3 px-6">{item.slotDate}</td>
                                        <td className="py-3 px-6">{item.slotTime}</td>
                                        <td className="py-3 px-6">${item.amount || 0}</td>
                                        <td className="py-3 px-6">
                                            {item.cancelled
                                                ? <span className="text-red-500 bg-red-50 px-3 py-1 rounded-full text-xs font-medium">Cancelled</span>
                                                : item.isCompleted
                                                ? <span className="text-green-500 bg-green-50 px-3 py-1 rounded-full text-xs font-medium">Completed</span>
                                                : <span className="text-yellow-500 bg-yellow-50 px-3 py-1 rounded-full text-xs font-medium">Pending</span>
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="py-10 text-center text-gray-400">
                        <p>No appointments yet</p>
                    </div>
                )}
            </div>
        </div>
    ) : (
        <div className="m-5">
            <p className="text-lg font-medium">Dashboard</p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1,2,3].map((i) => (
                    <div key={i} className="bg-white p-6 rounded-lg border border-gray-200 animate-pulse">
                        <div className="h-10 w-24 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard;