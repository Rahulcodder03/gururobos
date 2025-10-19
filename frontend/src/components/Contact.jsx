import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
    city: "",
    state: "",
    country: ""
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      await axios.post("http://localhost:5000/api/contacts/", formData);
      setSuccess("Your message has been sent successfully ✅");
      setFormData({
        name: "",
        email: "",
        phone: "",
        course: "",
        message: "",
        city: "",
        state: "",
        country: ""
      });
    } catch (err) {
      setError("Something went wrong. Please try again ❌");
    }
  };

  return (
    <section id="contact" className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-semibold">Contact Us</h3>
        <p className="mt-2 text-gray-600">Course queries, demo requests or training</p>

        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">

          <input name="name" value={formData.name} onChange={handleChange} required placeholder="Full name" className="px-4 py-3 rounded-lg border border-black-200" />
          <input name="email" value={formData.email} onChange={handleChange} required placeholder="Email" type="email" className="px-4 py-3 rounded-lg border border-black-200" />
          <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="px-4 py-3 rounded-lg border border-black-200" />
          <input name="city" value={formData.city} onChange={handleChange} placeholder="City" className="px-4 py-3 rounded-lg border border-black-200" />
          <input name="state" value={formData.state} onChange={handleChange} placeholder="State" className="px-4 py-3 rounded-lg border border-black-200" />
          <input name="country" value={formData.country} onChange={handleChange} placeholder="Country" className="px-4 py-3 rounded-lg border border-black-200" />

          <select name="course" value={formData.course} onChange={handleChange} className="md:col-span-2 px-4 py-3 rounded-lg border border-black-200 bg-blue-600 text-white">
            <option>Select Course</option>
            <option>Intro to Robotics</option>
            <option>Embedded Systems</option>
            <option>Serving Robotics</option>
            <option>Humanoid Robotics</option>
            <option>Reception Robotics</option>
            <option>Robotics Kits</option>
            <option>Training Program Robotics</option>
            <option>WEB Design</option>
          </select>

          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Message" className="md:col-span-2 px-4 py-3 rounded-lg border border-black-200" rows="4"></textarea>

          {success && <p className="md:col-span-2 text-green-600">{success}</p>}
          {error && <p className="md:col-span-2 text-red-600">{error}</p>}

          <div className="md:col-span-2 flex items-center justify-between">
            <button type="submit" className="px-6 py-3 rounded-md bg-blue-600 text-white">Send Message</button>
            <div className="text-sm text-gray-500">We reply within 24 hours</div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
