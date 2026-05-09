import React from "react";
import { motion, useTransform } from "framer-motion";

const ExperienceItem = ({ exp, idx, start, end, scrollYProgress, layout }) => {
  const scale = useTransform(scrollYProgress, [start, end], [0, 1]);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(scrollYProgress, [start, end], [idx % 2 === 0 ? 30 : -30, 0]);
  const x = useTransform(scrollYProgress, [start, end], [-24, 0]);

  if (layout === "desktop") {
    return (
      <div className="relative flex flex-1 justify-center items-center min-w-0">
        <motion.div
          className="z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
          style={{ scale, opacity }}
        />
        <motion.div
          className={`absolute ${idx % 2 === 0 ? "-top-8" : "-bottom-8"} w-[3px] bg-white/40`}
          style={{ height: 40, opacity }}
        />
        <motion.article
          className={`absolute ${
            idx % 2 === 0 ? "bottom-12" : "top-12"
          } bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-7 w-[320px] shadow-lg`}
          style={{ opacity, y, maxWidth: "90vw" }}
          transition={{ duration: 0.4, delay: idx * 0.15 }}
        >
          <h3 className="text-xl font-semibold">{exp.role}</h3>
          <p className="text-md text-gray-400 mb-3">
            {exp.company} | {exp.duration}
          </p>
          <p className="text-md text-gray-300 break-words">{exp.description}</p>
        </motion.article>
      </div>
    );
  }

  return (
    <div className="relative flex items-start">
      <motion.div
        className="absolute -left-[14px] top-3 z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.2)]"
        style={{ scale, opacity }}
      />
      <motion.article
        className="bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 w-[90vw] max-w-sm ml-6 shadow-lg"
        style={{ opacity, x }}
        transition={{ duration: 0.4, delay: idx * 0.15 }}
      >
        <h3 className="text-lg font-semibold break-words">{exp.role}</h3>
        <p className="text-sm text-gray-400 mb-2 break-words">
          {exp.company} | {exp.duration}
        </p>
        <p className="text-sm text-gray-300 break-words">{exp.description}</p>
      </motion.article>
    </div>
  );
};

export default ExperienceItem;
