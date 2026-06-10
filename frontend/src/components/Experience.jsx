import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
  const experiences = [
    {
      role: 'Full Stack Web Developer Trainee',
      company: 'Nerds & Geeks Pvt. Ltd.',
      period: 'June 2025 - November 2025',
      description: 'Undergoing intensive full stack web development training, gaining hands-on experience in building end-to-end web solutions using the MERN stack, RESTful APIs, and modern frontend frameworks.',
      skills: ['React', 'Node.js', 'MongoDB', 'Express.js', 'REST APIs']
    },
    {
      role: 'Full Stack Web Developer Intern',
      company: 'Nerds & Geeks Pvt. Ltd.',
      period: 'November 2025 - March 2026',
      description: 'Worked as a Full Stack Developer Intern, contributing to real-world client projects using the MERN stack. Built and maintained RESTful APIs, developed responsive UIs, and collaborated with the team on end-to-end feature delivery.',
      skills: ['React', 'Node.js', 'MongoDB', 'Express.js', 'REST APIs']
    }
  ];

  return (
    <section id="experience" className="py-20 md:py-32 bg-dark">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Journey <span className="text-gradient">Timeline</span></h2>
          <p className="text-gray-400">My professional growth and educational background.</p>
        </motion.div>

        <div className="relative border-l border-white/10 ml-4 md:ml-0">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="mb-16 ml-8 relative"
            >
              <div className="absolute -left-12 top-0 w-8 h-8 rounded-full bg-dark border-4 border-primary shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
              
              <div className="p-8 bg-darkAccent rounded-3xl border border-white/5 hover:border-white/10 transition-all">
                <span className="text-primary text-sm font-mono mb-2 block">{exp.period}</span>
                <h3 className="text-2xl font-bold mb-1">{exp.role}</h3>
                <h4 className="text-gray-400 font-medium mb-4">{exp.company}</h4>
                <p className="text-gray-500 mb-6 leading-relaxed">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map(s => (
                    <span key={s} className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400">{s}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
