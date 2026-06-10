import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTerminal, FaCodeBranch, FaStar, FaGithub } from 'react-icons/fa';

const GitHub = () => {
  const [stats, setStats] = useState({ repos: 45, contributions: 1250, stars: 120 });

  return (
    <section className="py-20 md:py-32 bg-darkAccent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Open Source <br /> <span className="text-gradient">Contributions</span></h2>
            <p className="text-gray-400 text-lg mb-10">
              I love contributing to the developer community through open-source projects. 
              My code is clean, documented, and built with collaboration in mind.
            </p>

            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{stats.repos}</div>
                <div className="text-gray-500 text-xs flex items-center justify-center uppercase tracking-widest">
                  <FaTerminal className="mr-1" /> Repos
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{stats.contributions}+</div>
                <div className="text-gray-500 text-xs flex items-center justify-center uppercase tracking-widest">
                  <FaCodeBranch className="mr-1" /> Commits
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{stats.stars}</div>
                <div className="text-gray-500 text-xs flex items-center justify-center uppercase tracking-widest">
                  <FaStar className="mr-1" /> Stars
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* GitHub Stats Card Mockup */}
            <div className="bg-dark p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <FaGithub size={150} />
              </div>
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
                  <div className="w-full h-full rounded-full bg-dark flex items-center justify-center font-bold text-xl">BM</div>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Bhargav2826</h3>
                  <p className="text-gray-500 text-sm">Full Stack Developer</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-4/5"></div>
                </div>
                <div className="h-4 w-5/6 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-secondary w-2/3"></div>
                </div>
                <div className="h-4 w-3/4 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-white/20 w-1/2"></div>
                </div>
              </div>

              <div className="mt-8 flex justify-between items-center text-sm text-gray-500 font-mono">
                <span>Joined Oct 2020</span>
                <a href="https://github.com/Bhargav2826" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline cursor-pointer">View Profile -&gt;</a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GitHub;
