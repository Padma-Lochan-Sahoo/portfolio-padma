import React from "react";
import { motion } from "framer-motion";
import { testimonials } from "../../data";
import * as Assets from "../../assets";

const TestimonialCard = ({ t, idx }) => {
  const image = Assets[t.imageKey];
  return (
    <motion.div
      key={t.name}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.2 }}
      viewport={{ once: true }}
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 flex flex-col items-center text-center transform transition duration-500 hover:scale-105 hover:-rotate-1"
    >
      <img
        src={image}
        alt={t.name}
        className="w-20 h-20 rounded-full border-2 border-white/40 mb-4 object-cover"
        loading="lazy"
      />
      <p className="text-gray-200 italic mb-4">"{t.review}"</p>
      <h3 className="text-lg font-semibold">{t.name}</h3>
      <p className="text-gray-400 text-sm">{t.role}</p>
    </motion.div>
  );
};

const Testimonials = () => (
  <section
    id="testimonials"
    className="relative min-h-screen bg-black flex flex-col items-center justify-between px-6 py-20"
  >
    <motion.h2
      className="text-4xl font-bold mb-16 text-white"
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      What People Say
    </motion.h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-6xl w-full">
      {testimonials.map((t, idx) => (
        <TestimonialCard key={t.name} t={t} idx={idx} />
      ))}
    </div>
  </section>
);

export default Testimonials;
