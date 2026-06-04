import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext.jsx";
import { assets } from "../../assets/assets.js";

const Appointments = () => {
    const { aToken, appointments, getAllAppointments, cancelAppointment, completeAppointment } = useContext(AdminContext)

    useEffect(() => {
        if (aToken) {
            getAllAppointments()
        }
    }, [aToken])

    return appointments && appointments.length > 0 ? (
        <div className="m-5 max-h-[90vh] overflow-y-scroll">
            <p className="text-lg font-medium">Appointments</p>
            <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm bg-white rounded-lg border border-gray-200">
                    <thead>
                        <tr className="text-gray-500 border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-medium">#</th>
                            <th className="text-left py-3 px-4 font-medium">Patient</th>
                            <th className="text-left py-3 px-4 font-medium">Doctor</th>
                            <th className="text-left py-3 px-4 font-medium">Date</th>
                            <th className="text-left py-3 px-4 font-medium">Time</th>
                            <th className="text-left py-3 px-4 font-medium">Amount</th>
                            <th className="text-left py-3 px-4 font-medium">Status</th>
                            <th className="text-left py-3 px-4 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((item, index) => (
                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4">{index + 1}</td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-medium">
                                            {item.userData?.name ? item.userData.name.charAt(0).toUpperCase() : "?"}
                                        </div>
                                        <span className="font-medium text-gray-700">{item.userData?.name || "N/A"}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs font-medium">
                                            {item.docData?.name ? item.docData.name.charAt(0).toUpperCase() : "?"}
                                        </div>
                                        <span className="font-medium text-gray-700">{item.docData?.name || "N/A"}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-gray-600">{item.slotDate}</td>
                                <td className="py-3 px-4 text-gray-600">{item.slotTime}</td>
                                <td className="py-3 px-4 text-gray-600">${item.amount || 0}</td>
                                <td className="py-3 px-4">
                                    {item.cancelled
                                        ? <span className="text-red-500 bg-red-50 px-3 py-1 rounded-full text-xs font-medium">Cancelled</span>
                                        : item.isCompleted
                                        ? <span className="text-green-500 bg-green-50 px-3 py-1 rounded-full text-xs font-medium">Completed</span>
                                        : <span className="text-yellow-500 bg-yellow-50 px-3 py-1 rounded-full text-xs font-medium">Pending</span>
                                    }
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                        {!item.cancelled && !item.isCompleted && (
                                            <>
                                                <button
                                                    onClick={() => completeAppointment(item._id)}
                                                    className="p-2 bg-green-50 border border-green-200 rounded-md hover:bg-green-100 transition-colors"
                                                    title="Mark Completed"
                                                >
                                                    <img className="w-4 h-4" src={assets.tick_icon} alt="complete"/>
                                                </button>
                                                <button
                                                    onClick={() => cancelAppointment(item._id)}
                                                    className="p-2 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors"
                                                    title="Cancel Appointment"
                                                >
                                                    <img className="w-4 h-4" src={assets.cancel_icon} alt="cancel"/>
                                                </button>
                                            </>
                                        )}
                                        {item.cancelled && (
                                            <span className="text-xs text-gray-400">Cancelled</span>
                                        )}
                                        {item.isCompleted && (
                                            <span className="text-xs text-gray-400">Completed</span>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    ) : (
        <div className="m-5">
            <p className="text-lg font-medium">Appointments</p>
            <div className="mt-10 text-center text-gray-400">
                <img className="w-16 h-16 mx-auto opacity-50 mb-4" src={assets.appointments_icon} alt=""/>
                <p className="text-lg">No appointments found</p>
            </div>
        </div>
    )
}

export default Appointments;