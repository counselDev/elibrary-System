import { Link } from "react-router-dom";
import dataImg from "../assets/images/knowlodge.svg";
import Logo from "../assets/images/FUTO_logo_main.png";

export default function Landing() {
  return (
    <div className="bg-white px-20 py-5">
      <div className="text-center flex items-center justify-center gap-4 text-indigo-600 font-bold text-xl">
        <img src={Logo} alt="Logo" className="h-12 w-12" /> Federal University Of
        Technology, Owerri
      </div>
      <div className="flex items-center justify-between">
        <div className="pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
          <main className=" mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Request the Book</span> <br />
                <span className="block text-indigo-600 xl:inline">
                 Reading Alive
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                An application to enable users book busses before time and
                lay complaints where neccesary
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    to="/login"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-2 text-base font-medium text-white hover:bg-indigo-700 md:py-2 md:px-10 md:text-lg"
                  >
                    Login
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    to="/register"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-100 px-8 py-2 text-base font-medium text-indigo-700 hover:bg-indigo-200 md:py-2 md:px-10 md:text-lg"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>

        <div className=" lg:w-1/2 lg:p-10">
          <img
            className=" rounded-md w-full object-contain sm:h-72 md:h-96 lg:h-full lg:w-full"
            src={dataImg}
            alt="Data"
          />
        </div>
      </div>
    </div>
  );
}
