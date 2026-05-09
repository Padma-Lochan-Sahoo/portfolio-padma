import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import GlowBlob from "../common/GlowBlob";
import { skillsRowOne, skillsRowTwo } from "../../data";

const SPEED = 80;

/**
 * A single infinitely scrolling row of skill pills.
 * direction: 1 = moves right (positive x), -1 = moves left (negative x)
 */
const SkillRow = ({ skills, direction, active }) => {
  const repeated = [...skills, ...skills];
  const trackRef = useRef(null);
  const x = useMotionValue(0);

  useEffect(() => {
    let id;
    let last = performance.now();

    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      let next = x.get() + SPEED * direction * dt;
      const loop = trackRef.current?.scrollWidth / 2 || 0;
      if (loop) {
        if (next <= -loop) next += loop;
        if (next >= 0) next -= loop;
      }
      x.set(next);
      id = requestAnimationFrame(tick);
    };

    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [direction, x]);

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        ref={trackRef}
        className="flex gap-10 text-6xl text-[#1cd8d2]"
        style={{ x, whiteSpace: "nowrap", willChange: "transform" }}
      >
        {repeated.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="flex flex-col items-center gap-2 min-w-[120px]"
              aria-label={s.name}
              title={s.name}
            >
              <span className="hover:scale-125 transition-transform duration-300">
                <Icon />
              </span>
              <p className="text-sm">{s.name}</p>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(false);
  const [scrollDir, setScrollDir] = useState(-1); // -1 = down, 1 = up
  const touchY = useRef(null);

  // Detect when section is visible
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting && entry.intersectionRatio > 0.1),
      { threshold: [0.1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Listen for scroll/touch direction
  useEffect(() => {
    if (!active) return;
    const onWheel = (e) => setScrollDir(e.deltaY > 0 ? -1 : 1);
    const onTouchStart = (e) => (touchY.current = e.touches[0].clientY);
    const onTouchMove = (e) => {
      if (touchY.current == null) return;
      const delta = e.touches[0].clientY - touchY.current;
      setScrollDir(delta > 0 ? 1 : -1);
      touchY.current = e.touches[0].clientY;
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [active]);

  // Row 1: when scrolling down → moves left (dir=-1), up → right (dir=1)
  // Row 2: opposite of row 1
  const row1Dir = scrollDir; // -1 when scrolling down → left
  const row2Dir = -scrollDir; // 1 when scrolling down → right

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="w-full py-16 flex flex-col items-center justify-center relative bg-black text-white overflow-hidden gap-10"
    >
      <div className="absolute inset-0 pointer-events-none">
        <GlowBlob className="top-1/4 left-0 w-[300px] h-[300px] opacity-20 blur-[120px]" />
        <GlowBlob className="bottom-1/4 right-0 w-[300px] h-[300px] opacity-20 blur-[120px] delay-500" />
      </div>

      <motion.h2
        className="text-4xl mt-5 sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] z-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        My Skills
      </motion.h2>
      <motion.p
        className="text-white/90 text-base sm:text-lg z-10 -mt-6"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Modern Applications | Modern Technologies
      </motion.p>

      <div className="w-full flex flex-col gap-10">
        <SkillRow skills={skillsRowOne} direction={row1Dir} active={active} />
        <SkillRow skills={skillsRowTwo} direction={row2Dir} active={active} />
      </div>
    </section>
  );
};

export default Skills;
