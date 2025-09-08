import React, { useContext } from "react";
import { FaFileMedicalAlt } from "react-icons/fa";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);

  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
    dToken && setDToken("");
    dToken && localStorage.removeItem("dToken");
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b border-[#e7e3e4] bg-white sticky top-0 z-1">
      <div className="flex items-center gap-2 text-xs">
        <h1
          onClick={() => navigate("/doctor-dashboard")}
          className="text-2xl font-bold text-[#000b6d] flex flex-col items-center gap-1 cursor-pointer"
        >
          <span className="flex items-center gap-1">
            Vytal
            <FaFileMedicalAlt className="text-[#5f6fff]" />
          </span>

          <p className="text-xs text-[#5f5f5f] pl-2">Dashboard panel</p>
        </h1>
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={logout}
        className="bg-[#5f6fff] text-white text-sm px-10 py-2 rounded-full cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
