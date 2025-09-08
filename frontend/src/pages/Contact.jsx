import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          CONTACT <span className="font-semibold text-gray-700">US</span>
        </p>
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img
          className="w-full md:max-w-[360px] rounded"
          src={assets.contact_image}
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-gray-600">OUR OFFICE</p>
          <p className="text-gray-500">
            54709 Willms Station <br />
            Suite 350, Washington, USA
          </p>
          <p className="text-gray-500">
            Tel: (000) 000-0000 <br />
            Email: greatstackdev@gmail.com
          </p>
          <p className="font-semibold text-lg text-gray-600">
            CAREERS AT VYTAL
          </p>
          <p className="text-gray-500">
            Learn more about our teams and job openings.
          </p>
          <button className="border border-black text-sm px-8 py-4 hover:text-white transition-all duration-500 cursor-pointer hover:bg-black">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
