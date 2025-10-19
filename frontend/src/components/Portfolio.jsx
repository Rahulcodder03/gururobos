import React from "react";

const projects = [
  { img: "robot car.jpg", title: "Robot Car" },
  { img: "line follower bot.jpg", title: "Line Follower Bot" },
  { img: "robotic arm.jpg", title: "Robotic Arm" },
  { img: "school website development.jpg", title: "Website Design" },
  { img: "4.jpeg", title: "STEM Lab Setup" },
  { img: "costum project.jpg", title: "Custom Project" },
];

const Portfolio = () => {
  return (
    <section className="text-center py-16 px-10 bg-cover bg-no-repeat">
      <h1 className="text-3xl font-bold text-sky-500 mb-4">Our Portfolio</h1>
      <p className="text-gray-700 mb-10">A glimpse of the robotics projects and websites we have worked on.</p>
      <div className="flex flex-wrap justify-center gap-6">
        {projects.map((p, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-300 shadow-md hover:shadow-lg hover:-translate-y-1 transition p-4 w-72"
          >
            <img src={p.img} alt={p.title} className="rounded-md mb-3 w-full h-8/10" />
            <h3 className="text-sky-500 font-semibold">{p.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
