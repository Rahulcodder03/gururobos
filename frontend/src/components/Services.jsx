import React from "react";

const services = [
  {
    img: "humanoid-robot.jpg",
    title: "Humanoid Robot",
    desc: "A humanoid robot is a machine designed to look and act like a human, often used for interaction and assistance.",
  },
  {
    img: "Servining.jpg",
    title: "Serving Robot",
    desc: "A serving robot is designed to deliver food or items, often used in restaurants or hospitals to assist with service tasks efficiently.",
  },
  {
    img: "RECEPTION.webp",
    title: "Reception Robot",
    desc: "A reception robot greets visitors, provides information, answers questions, and assists with check-ins, often used in offices or hotels.",
  },
  {
    img: "STEM.jpeg",
    title: "STEM Kit",
    desc: " Arduino Starter Kit - ELECFREAKS micro:bit Starter Kit A STEM kit is an educational tool containing hands-on materials to teach science, technology, engineering, and math through interactive learning.",
  },
  {
    img: "TEACHER.jpg",
    title: "Teacher-Student Training Program",
    desc: "Internship - Python, Java, C & C++",
  },
  {
    img: "WEB_DESIGN.avif",
    title: "Web Design",
    desc: "We Design & Develop Modern, Responsive Website, Including Galleries, Events & Admin Panels",
  },
];

const Services = () => {
  return (
    <section className="text-center py-16 px-10">
      <h1 className="text-3xl font-bold text-sky-500 mb-10">Our Services</h1>
      <div className="flex flex-wrap justify-center gap-8">
        {services.map((service, i) => (
          <div key={i} className="bg-blue-900 text-white p-6 rounded-xl max-w-xs shadow-md">
            <img src={service.img} alt={service.title} className="rounded-md mb-4 w-full h-6/10" />
            <h2 className="text-xl text-sky-300 mb-2">{service.title}</h2>
            <p className="text-xs">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
