import React from "react";
import { motion } from "framer-motion";
import SocialIcon from "../common/SocialIcon";
import { SOCIAL_LINKS } from "../../constants";

const Footer = () => (
  <footer className="relative overflow-hidden bg-black">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_70%_35%,rgba(13,88,202,0.35),transparent_70%)]" />
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_55%_at_30%_70%,rgba(16,185,129,0.30),transparent_70%)]" />

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 px-4 sm:px-8 lg:px-10 py-16 md:py-20 flex flex-col items-center text-center space-y-6"
    >
      <h1
        className="font-semibold leading-none text-white text-center select-none"
        style={{
          fontSize: "clamp(3rem,5vw,14rem)",
          letterSpacing: "0.02em",
          lineHeight: 0.9,
          padding: "0.3vw",
          whiteSpace: "nowrap",
          textShadow: "0 2px 18px rgba(0,0,0,0.45)",
        }}
      >
        Padma Lochan Sahoo
      </h1>

      <div className="h-[3px] w-24 md:w-32 rounded-full bg-gradient-to-r from-[#0d58cc] via-cyan-300 to-emerald-400" />

      <div className="flex text-2xl gap-5 md:text-3xl">
        {SOCIAL_LINKS.map(({ label, href }) => (
          <SocialIcon key={label} label={label} href={href} />
        ))}
      </div>

      <p className="text-gray-300 italic max-w-xl">
        "Crafting digital experiences that blend creativity and technology, I build websites that not
        only look stunning but also perform flawlessly. Let's create something amazing together!"
      </p>

      <p className="text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} Padma Lochan Sahoo. All rights reserved.
      </p>
    </motion.div>
  </footer>
);

export default Footer;
