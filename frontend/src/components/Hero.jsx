import React from "react";
import Services from "./Services";
import Portfolio from "./Portfolio";
import Team from "./Team";
import Contact from "./Contact";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <section className="flex flex-col justify-center items-center text-center min-h-[80vh] px-6 py-10 from-white to-[#e0f2f7]">
        
        {/* Text Section */}
        <div className="text-black max-w-3xl mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-typing overflow-hidden whitespace-nowrap border-r-4 border-white pr-2">
            Empowering WEBSITE &<br />Robotics AUTOMATION
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 leading-relaxed">
             • ELECFREAKS Robotics <br />• Website Development <br />• Hands-on robotics workshops
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contact"
              className="bg-sky-500 hover:opacity-85 text-white px-5 py-2 rounded-md text-sm sm:text-base transition-all"
            >
              Request Demo
            </Link>
            <Link
              to="/services"
              className="border-2 border-sky-500 text-sky-500 px-5 py-2 rounded-md hover:bg-sky-500 hover:text-white text-sm sm:text-base transition-all"
            >
              Our Services
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-center mt-4">
          <img
            src="NILA.jpeg"
            alt="Robotics Automation"
            className="w-40 sm:w-56 md:w-72 lg:w-80 h-auto shadow-lg rounded-full"
          />
        </div>
      </section>

      {/* Additional Sections */}
      <Services />
      <Portfolio />
      <Team />
      <Contact />
    </>
  );
};

export default Hero;

// import React from "react";
// import Services from "./Services";
// import Portfolio from "./Portfolio";
// import Team from "./Team";
// import Contact from "./Contact";

// const Hero = () => {
//   return (
//     <>
//     <section className="flex flex-col md:flex-row justify-between items-center h-[70vh] px-10 ">
//       <div className="flex-1 mt-16 text-black">
//         <h1 className="text-4xl font-bold mb-4 animate-typing overflow-hidden whitespace-nowrap border-r-4 border-white pr-2">
//           Empowering  WEBSITE &<br/>Robotics AUTOMATION
//         </h1>
//         <p className="mb-6 text-lg">
//           Hands-on robotics workshops <br />•ELECFREAKS micro:bit <br />•Website Development
//         </p>
//         <div className="flex gap-4">
//           <a href="contact.html" className="bg-sky-500 hover:opacity-85 text-white px-5 py-2 rounded-md">Request Demo</a>
//           <a href="services.html" className="border-2 border-sky-500 text-sky-500 px-5 py-2 rounded-md hover:bg-sky-500 hover:text-white">Our Services</a>
//         </div>
//       </div>
//               <div className="flex-1 flex justify-center mt-10 md:mt-0">
//           <img
//             src="NILA.jpeg" 
//             alt="Robotics Automation"
//             className="w-2/5 h-auto mt-24 shadow-lg rounded-full "
//           />
//         </div>
//     </section>
//     <Services/>
//     <Portfolio/>
//     <Team/>
//     <Contact/>
// </>
//   );
// };

// export default Hero;
