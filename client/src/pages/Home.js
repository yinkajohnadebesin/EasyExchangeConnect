import React from 'react';
import { MouseEnterProvider, CardContainer, CardBody, CardItem } from '../components/ui/3d-card';
import { useNavigate } from 'react-router-dom';
import { Boxes } from "../components/ui/background-boxes";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <MouseEnterProvider>
      <div className="relative w-full min-h-screen overflow-hidden bg-black text-white">
        {/* Background Animation */}
        <Boxes className="z-0" />

        {/* Foreground */}
        <div className="relative z-10 px-6 py-20 max-w-7xl mx-auto space-y-32">

          {/* Hero Section */}
          <section className="flex flex-col gap-4 max-w-3xl">
            <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight tracking-tight">
              Your Gateway to International Exchange Opportunities
            </h1>
            <p className="text-lg text-neutral-300 leading-relaxed">
              Discover academically brilliant universities ona global scale, apply seamlessly, and join a thriving community of exchange students and academic institutions abroad. With over 40+ universities and 200+ programs, Technological University of Dublin's EasyExchangeConnect is your one-stop platform for all things exchange.
            </p>
          </section>

          {/* Cards Section */}
          <section className="flex flex-col sm:flex-row justify-center items-start sm:items-stretch gap-10">
            {/* Student Card */}
            <CardContainer className="inter-var">
              <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full sm:w-[28rem] h-auto rounded-xl p-6 border">
                <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white text-center w-full">
                  For Students
                </CardItem>
                <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 text-center mx-auto">
                  Explore university programs abroad and apply seamlessly. Your exchange journey starts here.
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <img
                    src="http://localhost:3001/uploads/EEC_Student.jpg"
                    height="1000"
                    width="1000"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="students"
                  />
                </CardItem>
                <div className="flex justify-between items-center mt-10 w-full">
                  <CardItem translateZ={20} as="a" onClick={() => navigate("/register")}
                    className="cursor-pointer no-underline px-4 py-2 rounded-xl text-xs font-bold text-black bg-gray-200 hover:bg-gradient-to-r hover:from-orange-400 hover:to-yellow-300 transition duration-300 ease-in-out">
                    Signup
                  </CardItem>
                  <CardItem translateZ={20} as="a" onClick={() => navigate("/login")}
                    className="cursor-pointer no-underline px-4 py-2 rounded-xl text-xs font-bold text-white bg-black hover:bg-gradient-to-r hover:from-green-500 hover:to-green-800 transition duration-300 ease-in-out">
                    Login
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
            {/* Lecturer Card */}
            <CardContainer className="inter-var">
              <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-purple-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full sm:w-[28rem] h-auto rounded-xl p-6 border">
                <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white text-center w-full">
                  For Lecturers
                </CardItem>
                <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 text-center mx-auto">
                  Register your institution, manage applications, and support your students throughout their journey.
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <img
                    src="http://localhost:3001/uploads/EEC_Lecturer.jpg"
                    height="1000"
                    width="1000"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="admins"
                  />
                </CardItem>
                <div className="flex justify-between items-center mt-10 w-full">
                  <CardItem translateZ={20} as="a" onClick={() => navigate("/admin-register")}
                    className="cursor-pointer no-underline px-4 py-2 rounded-xl text-xs font-bold text-black bg-gray-200 hover:bg-gradient-to-r hover:from-orange-400 hover:to-yellow-300 transition duration-300 ease-in-out">
                    Signup
                  </CardItem>
                  <CardItem translateZ={20} as="a" onClick={() => navigate("/admin-login")}
                    className="cursor-pointer no-underline px-4 py-2 rounded-xl text-xs font-bold text-white bg-black hover:bg-gradient-to-r hover:from-green-500 hover:to-green-800 transition duration-300 ease-in-out">
                    Login
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          </section>

          {/* Features Section */}
          <section className="text-center max-w-5xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6">Why Choose EasyExchangeConnect?</h2>
            <ul className="text-neutral-300 space-y-2 text-base">
              <li>✓ Secure, efficient, and transparent student exchange process</li>
              <li>✓ Tailored dashboards for both students and lecturers</li>
              <li>✓ Real-time application tracking</li>
              <li>✓ Built-in language proficiency tools</li>
            </ul>
          </section>
          {/* Testimonials */}
          <section className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">What Our Users Say</h2>
            <blockquote className="text-neutral-400 italic">
              “This platform made my exchange application so much easier — the visual interface and automation saved me weeks of back and forth of researching universities. It's all here!” — <span className="text-white font-semibold">Bobola, Ireland</span>
            </blockquote>
          </section>

          {/* CTA */}
          <section className="text-center">
            <h2 className="text-2xl font-bold">Ready to kick off?</h2>
            <p className="text-neutral-300 mb-4">Create your account now and explore opportunities waiting for you.</p>
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-3 text-white font-bold bg-gradient-to-r from-orange-500 to-yellow-400 rounded-lg shadow-lg hover:scale-105 transition"
            >
              Join the Exchange
            </button>
          </section>
        </div>
      </div>
    </MouseEnterProvider>
  );
};
