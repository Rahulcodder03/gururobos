import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // lightweight icons

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = ["Services", "Portfolio", "Team", "Contact"];

  return (
    <header className="text-white flex justify-between items-center px-4 py-3 bg-gradient-to-r from-white via-[#203a43] to-[#2c5364] relative">
      {/* Logo */}
      <div className="flex items-center">
        <NavLink to="/">
          <img
            src="GURUROBOs.png"
            alt="logo"
            className="h-10 md:h-14 object-contain"
          />
        </NavLink>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6 text-base lg:text-lg">
        {navItems.map((item) => (
          <NavLink
            key={item}
            to={`/${item.toLowerCase().replace(" ", "-")}`}
            className={({ isActive }) =>
              `px-3 py-1 rounded transition-all ${
                isActive
                  ? "bg-purple-700 underline"
                  : "hover:bg-purple-600 hover:underline"
              }`
            }
          >
            {item}
          </NavLink>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Navigation Menu */}
     {menuOpen && (
  <div className="absolute top-full left-0 w-full bg-[#203a43]/90 text-center md:hidden z-50 shadow-lg backdrop-blur-sm">
    <ul className="flex flex-col gap-3 py-4">
      {navItems.map((item) => (
        <li key={item}>
          <NavLink
            to={`/${item.toLowerCase().replace(" ", "-")}`}
            className="block py-2 text-lg hover:bg-purple-600 transition-all"
            onClick={() => setMenuOpen(false)}
          >
            {item}
          </NavLink>
        </li>
      ))}
    </ul>
  </div>
)}

    </header>
  );
};

export default Header;

// import React from "react";
// import { NavLink } from "react-router-dom";

// const Header = () => {
//   const navItems = [
//     "Services",
//     "Portfolio",
//     "Team",
//     "Contact",
//   ];

//   return (
//     <header className="text-white flex justify-between items-center px-6 py-4 bg-gradient-to-r from-[white] via-[#203a43] to-[#2c5364]">
//       {/* Logo */}
//       <div className="flex items-center">
//         <NavLink to="/"><img src="GURUROBOs.png" alt="logo" className="size-1/4" /></NavLink>
//       </div>

//       {/* Navigation */}
//       <nav>
//         <ul className="flex gap-6 text-lg">
//           {navItems.map((item) => (
//             <li key={item}>
//               <NavLink
//                 to={`/${item.toLowerCase().replace(" ", "-")}`}
//                 className="hover:bg-purple-600 hover:underline px-3 py-1 rounded transition-all"
//               >
//                 {item}
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default Header;

