import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormate, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    appointments && (
      <div className="w-full max-w-6xl m-5">
        <p className="mb-3 text-lg font-medium">All Appointments</p>
        <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll border-[#e7e3e4]">
          <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-[#e7e3e4]">
            <p>#</p>
            <p>Paitent</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Doctor</p>
            <p>Fees</p>
            <p>Action</p>
          </div>
          {appointments.length == 0 ? (
            <div className="flex flex-col items-center justify-center min-h-80">
              <p className="font-medium text-2xl">No Appointments to show</p>
              <NavLink
                target="_blank"
                to="https://vytal-ten.vercel.app/doctors"
                className="bg-[#5f6fff] text-white px-3 py-2 rounded-lg cursor-pointer mt-3"
              >
                Book Appointment
              </NavLink>
            </div>
          ) : (
            <>
              {appointments.reverse().map((item, index) => (
                <div
                  className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50 border-[#e7e3e4]"
                  key={index}
                >
                  <p className="max-sm:hidden">{index + 1}</p>
                  <div className="flex items-center gap-2">
                    <img
                      className="w-8 rounded-full"
                      src={item.userData.image}
                      alt=""
                    />
                    <p>{item.userData.name}</p>
                  </div>
                  <p className="max-sm:hidden">
                    {calculateAge(item.userData.dob)}
                  </p>
                  <p>
                    {slotDateFormate(item.slotDate)}, {item.slotTime}
                  </p>
                  <div className="flex items-center gap-2">
                    <img
                      className="w-8 rounded-full bg-gray-200"
                      src={item.docData.image}
                      alt=""
                    />
                    <p>{item.docData.name}</p>
                  </div>
                  <p>
                    {currency}
                    {item.amount}
                  </p>
                  {item.cancelled ? (
                    <p className="text-red-400 text-xs font-medium">
                      Cancelled
                    </p>
                  ) : item.isCompleted ? (
                    <p className="text-green-500 text-xs font-medium">
                      Completed
                    </p>
                  ) : (
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      src={assets.cancel_icon}
                      className="w-10 cursor-pointer"
                      alt=""
                    />
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    )
  );
};

export default AllAppointments;
