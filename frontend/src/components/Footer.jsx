import { FaFileMedicalAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm">
        <div>
          <h1
            onClick={() => {
              navigate("/");
              scrollTo(0, 0);
            }}
            className="text-2xl font-bold text-[#000b6d] flex items-center gap-1 cursor-pointer"
          >
            Vytal
            <FaFileMedicalAlt className='text-[#5f6FFF]' />
          </h1>
          <p className="w-full wd:w-2/3 text-gray-600 leading-6">
            Imply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col text-gray-600">
            <li>+91-232-223-5344</li>
            <li>vytal@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright {new Date().getFullYear().toString()} @vytal - All Right
          Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
