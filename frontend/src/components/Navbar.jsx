import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { FaFileMedicalAlt } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { token, setToken, userData } = useContext(AppContext);

  const [showMenu, setShowMenu] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-zinc-200 bg-white sticky top-0 z-1">
      <h1
        onClick={() => navigate("/")}
        className="text-2xl font-bold text-[#000b6d] flex items-center gap-1 cursor-pointer"
      >
        Vytal
        <FaFileMedicalAlt className="text-[#5f6FFF]" />
      </h1>
      <ul className="hidden md:flex items-center gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink
          to="http://localhost:5174"
          target="_blank"
          className="py-2 text-xs border px-4 rounded-full border-stone-200"
        >
          Admin Panel
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token ? (
          <div
            onClick={() => setShowDropDown((prev) => !prev)}
            className="flex items-center gap-2 cursor-pointer group relative"
          >
            <img className="w-8 rounded-full" src={userData.image} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div
              className={`absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20  ${
                showDropDown ? "block" : "hidden"
              }`}
            >
              <div className="min-w-48 bg-stone-100 flex rounded flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-[#5f6FFF] text-white px-8 py-3 rounded-full font-light hidden md:block cursor-pointer"
          >
            Create account
          </button>
        )}

        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt=""
        />

        <div
          className={`md:hidden fixed top-0 right-0 w-full h-full bg-white z-30 shadow-lg transition-transform duration-300 ${
            showMenu ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4">
            <h1
              onClick={() => {
                navigate("/");
                scrollTo(0, 0);
              }}
              className="text-2xl font-bold text-[#000b6d] flex items-center gap-1 cursor-pointer"
            >
              Vytal
              <FaFileMedicalAlt className="text-[#5f6FFF]" />
            </h1>
            <img
              className="w-7"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <ul className="flex flex-col items-center gap-5 text-lg font-medium p-4 border-t border-zinc-200">
            <NavLink onClick={() => setShowMenu(false)} to="/">
              <p className="px-4 py-2 rounded inline-block">HOME</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">
              <p className="px-4 py-2 rounded inline-block">ALL DOCTORS</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">
              <p className="px-4 py-2 rounded inline-block">ABOUT</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">
              <p className="px-4 py-2 rounded inline-block">CONTACT</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="" target="_blank">
              <p className="py-2 border px-4 rounded-full border-stone-200">
                Admin Panel
              </p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
