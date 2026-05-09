import React, { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import useIsMobile from "../../hooks/useIsMobile";
import { projects } from "../../data";
import {
  Mobile1, Mobile2, Mobile3,
  Project1, Project2, Project3,
} from "../../assets";

// Map image keys to actual imported images
const IMAGE_MAP = {
  Mobile1, Mobile2, Mobile3,
  Project1, Project2, Project3,
};

const ProjectCard = ({ project, isActive, isMobile }) => {
  const image = isMobile
    ? IMAGE_MAP[project.mobileImageKey]
    : IMAGE_MAP[project.desktopImageKey];

  return (
    <div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
        isActive ? "opacity-100 z-20" : "opacity-0 z-0 sm:z-10"
      }`}
      style={{ width: "85%", maxWidth: "1200px" }}
    >
      {/* Project title */}
      <AnimatePresence mode="wait">
        {isActive && (
          <motion.h3
            key={project.title}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`block text-[clamp(2rem,6vw,5rem)] text-white/95 sm:absolute sm:-top-20 sm:left-[35%] lg:left-[-5%] sm:mb-0 text-center italic font-semibold ${
              isMobile ? "-mt-24" : ""
            }`}
            style={{ zIndex: 5, textAlign: isMobile ? "center" : "left" }}
          >
            {project.title}
          </motion.h3>
        )}
      </AnimatePresence>

      {/* Image */}
      <div
        className={`relative w-full overflow-hidden bg-black/20 shadow-2xl md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] ${
          isMobile ? "mb-6 rounded-lg" : "mb-10 sm:mb-12 rounded-xl"
        } h-[62vh] sm:h-[66vh]`}
        style={{ zIndex: 10, transition: "box-shadow 250ms ease" }}
      >
        <img
          src={image}
          alt={project.title}
          className="w-full h-full object-cover drop-shadow-xl md:drop-shadow-2xl"
          style={{
            position: "relative",
            zIndex: 10,
            filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.65))",
            transition: "filter 200ms ease",
          }}
          loading="lazy"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            zIndex: 11,
            background: "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 40%)",
          }}
        />
      </div>
    </div>
  );
};

const Projects = () => {
  const isMobile = useIsMobile();
  const sceneRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = useMemo(
    () => projects.map((_, i) => (i + 1) / projects.length),
    []
  );

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = thresholds.findIndex((t) => v <= t);
    setActiveIndex(idx === -1 ? thresholds.length - 1 : idx);
  });

  const activeProject = projects[activeIndex];

  return (
    <section
      id="projects"
      className="relative text-white"
      ref={sceneRef}
      style={{
        height: `${100 * projects.length}vh`,
        backgroundColor: activeProject.bgColor,
        transition: "background-color 400ms ease",
      }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        <h2 className={`text-3xl font-semibold z-10 text-center ${isMobile ? "mt-4" : "mt-8"}`}>
          My Work
        </h2>

        <div
          className={`relative w-full flex flex-1 items-center justify-center ${
            isMobile ? "mt-4" : "mt-8"
          }`}
        >
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.title}
              project={project}
              isActive={activeIndex === idx}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* Project links */}
        <div className={`absolute ${isMobile ? "bottom-16" : "bottom-10"} flex gap-4`}>
          <a
            href={activeProject?.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 font-semibold rounded-lg bg-gray-900 text-white border border-white/20 hover:bg-gray-800 transition-all"
            aria-label={`GitHub — ${activeProject?.title}`}
          >
            <FaGithub className="text-lg" />
            GitHub
          </a>
          <a
            href={activeProject?.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all"
            aria-label={`Live demo — ${activeProject?.title}`}
          >
            <FaExternalLinkAlt className="text-sm" />
            Live Demo
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
