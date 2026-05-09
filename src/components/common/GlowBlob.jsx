import React from "react";

/**
 * Reusable ambient glow blob used across sections.
 */
const GlowBlob = ({ className = "" }) => (
  <div
    className={`absolute rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] animate-pulse pointer-events-none ${className}`}
  />
);

export default GlowBlob;
