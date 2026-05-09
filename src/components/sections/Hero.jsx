import React, { useMemo } from "react";
import { motion } from "framer-motion";
import ParticlesBackground from "../common/ParticlesBackground";
import SocialIcon from "../common/SocialIcon";
import GlowBlob from "../common/GlowBlob";
import { AvatarImg } from "../../assets";
import { SOCIAL_LINKS } from "../../constants";
import { scrollToSection } from "../../utils/helpers";
import useTypewriter from "../../hooks/useTypewriter";

const ROLES = [
  "Software Developer",
  "MERN Developer",
  "Frontend Developer",
  "Fullstack Developer",
];

const Hero = () => {
  const { displayText } = useTypewriter(ROLES);

  return (
    <section id="home" className="w-full h-screen relative bg-black overflow-hidden">
      <ParticlesBackground />

      {/* Ambient blobs */}
      <div className="absolute inset-0">
        <GlowBlob className="-top-32 -left-32 w-[70vw] sm:w-[50vw] md:w-[40vw] h-[70vw] sm:h-[50vw] md:h-[40vw] max-w-[500px] max-h-[500px] opacity-30 sm:opacity-20 md:opacity-10 blur-[100px] sm:blur-[130px] md:blur-[150px]" />
        <GlowBlob className="bottom-0 right-0 w-[70vw] sm:w-[50vw] md:w-[40vw] h-[70vw] sm:h-[50vw] md:h-[40vw] max-w-[500px] max-h-[500px] opacity-30 sm:opacity-20 md:opacity-10 blur-[100px] sm:blur-[130px] md:blur-[150px] delay-500" />
      </div>

      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2">
        {/* Left: text content */}
        <div className="flex flex-col justify-center h-full text-center lg:text-left relative">
          <div className="w-full lg:pr-24 mx-auto max-w-[52rem] xl:max-w-[60rem]">
            {/* Typewriter */}
            <motion.div
              className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-wide min-h-[1.6em]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span>{displayText}</span>
              <span
                className="inline-block w-[2px] ml-1 bg-white animate-pulse align-middle"
                style={{ height: "1em" }}
              />
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] drop-shadow-lg"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Hello, I'm
              <br />
              <span className="text-white font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl lg:whitespace-nowrap">
                Padma Lochan
                <br />
                Sahoo
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              I turn complex ideas into seamless, high-impact web experiences — building modern,
              scalable, and lightning-fast applications that make a difference.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <button
                onClick={() => scrollToSection("projects")}
                className="px-6 py-3 rounded-full font-medium text-lg text-white bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] shadow-lg hover:scale-105 transition-all"
              >
                View My Work
              </button>
              <a
                href="/resume.pdf"
                download
                className="px-6 py-3 rounded-full text-lg font-medium text-black bg-white hover:bg-gray-200 shadow-lg hover:scale-105 transition-all"
              >
                My Resume
              </a>
            </motion.div>

            {/* Social icons */}
            <div className="mt-10 flex gap-5 text-2xl md:text-3xl justify-center lg:justify-start">
              {SOCIAL_LINKS.map(({ label, href }) => (
                <SocialIcon key={label} label={label} href={href} />
              ))}
            </div>
          </div>
        </div>

        {/* Right: avatar */}
        <div className="relative hidden lg:block">
          <div
            className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              right: "10px",
              width: "min(22vw, 410px)",
              height: "min(40vw,760px)",
              borderRadius: "50%",
              filter: "blur(38px)",
              opacity: 0.32,
              background: "conic-gradient(from 0deg, #1cd8d2, #00bf8f, #302b63, #1cd8d2)",
            }}
          />
          <motion.img
            src={AvatarImg}
            alt="Padma Lochan Sahoo portrait"
            className="absolute top-1/2 -translate-y-1/2 object-contain select-none pointer-events-none"
            style={{ right: "clamp(-10px, -1vw, 0px)", width: "min(45vw, 780px)", maxHeight: "90vh" }}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
