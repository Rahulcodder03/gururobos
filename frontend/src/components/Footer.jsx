import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[white] text-blue py-10 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between px-8 gap-8">
        {/* Founder 1 */}
        <div className="text-center">
          <h4 className="text-xl font-bold">CHANDRA SHEKHAR KUSWAH</h4>
          <p className="text-sm">FOUNDER (GURUROBOS)</p>
          <small>cskrobotics7@gmail.com<br />+91 9806182058</small>
        </div>

        {/* Co-founder */}
        <div className="text-center">
          <h4 className="text-xl font-bold">RAHUL RATHORE</h4>
          <p className="text-sm">CO-FOUNDER (GURUROBOS)</p>
          <small>errahulrobotics@gmail.com<br />+91 9131872190</small>
        </div>

        {/* Socials */}
        <div>
          <h4 className="text-xl font-semibold mb-2">Services</h4>
          <p className="text-sm mb-3">
            Custom Design • Vision <br/>• Motion • Integration <br />
            End-to-end <br/>robotics services — <br/>design,prototyping, <br/>integration and maintenance.
          </p>
        </div>
        <div><h5 className="text-2xl mb-2">Social Media</h5>
          <hr className="border-gray-600 mb-3" />
          <ul className="space-y-2">
            <li><a href="https://instagram.com/errahul_king" className="hover:text-sky-400" target="_blank">Instagram</a></li>
            <li>Facebook</li>
            <li>Linkedin</li>
            <li>X (Twitter)</li>
            <li>Youtube</li>
          </ul></div>
      </div>
      <div className="text-center text-gray-400 mt-6">
        © {new Date().getFullYear()} GURUROBOS — All rights reserved <br/><span>Developed by </span>GURUROBOS
      </div>
    </footer>
  );
};

export default Footer;
