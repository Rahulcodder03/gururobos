import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./App.css";
import Team from "./components/Team";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <div style={{background: "linear-gradient(135deg, #d6d5deff)"}}>
      < Header/>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Hero />}/>
        <Route path="/services" element={<Services />}/>
        <Route path="/portfolio" element={<Portfolio />}/>
        <Route path="/team" element={< Team/>}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/admin" element={<AdminDashboard />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
