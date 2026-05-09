import React from "react";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";

import Contact from "../components/sections/Contact";
import Footer from "../components/layout/Footer";

const Home = () => (
  <div className="relative gradient text-white">
    <Hero />
    <About />
    <Skills />
    <Projects />
    <Contact />
    <Footer />
  </div>
);

export default Home;
