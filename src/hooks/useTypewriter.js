import { useEffect, useState } from "react";

/**
 * Typewriter effect hook.
 * @param {string[]} words - Array of words to cycle through.
 * @returns {{ displayText: string }}
 */
const useTypewriter = (words = []) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) return;
    const current = words[index];
    let timeout;

    if (!deleting && subIndex < current.length) {
      timeout = setTimeout(() => setSubIndex((v) => v + 1), 60);
    } else if (!deleting && subIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1200);
    } else if (deleting && subIndex > 0) {
      timeout = setTimeout(() => setSubIndex((v) => v - 1), 40);
    } else if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((p) => (p + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, words]);

  return { displayText: words[index]?.substring(0, subIndex) ?? "" };
};

export default useTypewriter;
