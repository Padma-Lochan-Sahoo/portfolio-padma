import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { NAV_LINKS } from "../../constants";
import { scrollToSection } from "../../utils/helpers";

const OverlayMenu = ({ isOpen, onClose }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const origin = isMobile ? "95% 8%" : "50% 8%";

  const handleNavClick = (href) => {
    onClose();
    // Small delay to let the menu close animation start
    setTimeout(() => scrollToSection(href), 100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ clipPath: `circle(0% at ${origin})` }}
          animate={{ clipPath: `circle(150% at ${origin})` }}
          exit={{ clipPath: `circle(0% at ${origin})` }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{ backgroundColor: "rgba(0,0,0,0.95)" }}
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white text-3xl"
            aria-label="Close menu"
          >
            <FiX />
          </button>

          <motion.ul
            className="space-y-6 text-center"
            onClick={(e) => e.stopPropagation()}
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.1, delayChildren: 0.3 },
              },
            }}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <motion.li
                key={label}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <button
                  onClick={() => handleNavClick(href)}
                  className="text-4xl text-white font-semibold hover:text-pink-400 transition-colors duration-300 cursor-pointer bg-transparent border-none outline-none"
                >
                  {label}
                </button>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OverlayMenu;
