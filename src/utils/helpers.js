/**
 * Smooth scroll to a section by its id.
 * @param {string} sectionId - The element id (without #).
 */
export const scrollToSection = (sectionId) => {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

/**
 * Validate an email address format.
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
