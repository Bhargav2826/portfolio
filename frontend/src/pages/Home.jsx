import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import GitHub from '../components/GitHub';
import Terminal from '../components/Terminal';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <div className="bg-dark">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <GitHub />
      <Terminal />
      <Contact />
    </div>
  );
};

export default Home;
