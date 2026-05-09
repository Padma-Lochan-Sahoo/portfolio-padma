import React from "react";
import { motion } from "framer-motion";
import { FaXTwitter, FaLinkedin, FaGithub } from "react-icons/fa6";

const iconMap = { X: FaXTwitter, LinkedIn: FaLinkedin, GitHub: FaGithub };

const glowVariants = {
  initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
  hover: {
    scale: 1.2,
    y: -3,
    filter:
      "drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(16,185,129,0.8))",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: { scale: 0.95, y: 0, transition: { duration: 0.08 } },
};

const SocialIcon = ({ label, href, className = "text-gray-300" }) => {
  const Icon = iconMap[label];
  if (!Icon) return null;
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      variants={glowVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      className={`inline-flex items-center justify-center transition-colors duration-200 hover:text-white ${className}`}
    >
      <Icon />
    </motion.a>
  );
};

export default SocialIcon;
