import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-darkAccent relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-8">About <span className="text-gradient">Me</span></h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            I am a passionate Full Stack Web Developer specializing in the MERN stack. I build modern and responsive websites using technologies like React, Node.js, and MongoDB.
            I enjoy creating user-friendly interfaces and continuously improving my skills by working on real-world projects.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed mb-10">
            My expertise lies in crafting high-performance, user-centric interfaces with React and Tailwind CSS,
            and building robust backend services with Node.js and MongoDB. I pride myself on writing clean,
            maintainable code and staying ahead of the curve with emerging technologies.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <h4 className="text-primary font-bold text-2xl">1+</h4>
              <p className="text-gray-500 text-sm">Years Experience</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <h4 className="text-primary font-bold text-2xl">5+</h4>
              <p className="text-gray-500 text-sm">Projects Completed</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
