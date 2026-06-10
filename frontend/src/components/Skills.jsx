import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaDatabase, FaGitAlt, 
  FaCode, FaTerminal, FaServer, FaLayerGroup, FaMobileAlt 
} from 'react-icons/fa';
import { 
  SiTailwindcss, SiMongodb, SiExpress, SiFramer, SiBootstrap, SiPostman 
} from 'react-icons/si';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <FaCode className="text-secondary w-6 h-6" />,
      skills: [
        { name: 'HTML5/CSS3', icon: <FaHtml5 className="text-[#E34F26]" /> },
        { name: 'JavaScript', icon: <FaJs className="text-[#F7DF1E]" /> },
        { name: 'React.js', icon: <FaReact className="text-[#61DAFB]" /> },
        { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-[#06B6D4]" /> },
        { name: 'Bootstrap', icon: <SiBootstrap className="text-[#7952B3]" /> },
      ]
    },
    {
      title: 'Backend & Database',
      icon: <FaServer className="text-primary w-6 h-6" />,
      skills: [
        { name: 'Node.js', icon: <FaNodeJs className="text-[#339933]" /> },
        { name: 'Express.js', icon: <SiExpress className="text-white" /> },
        { name: 'MongoDB', icon: <SiMongodb className="text-[#47A248]" /> },
        { name: 'REST APIs', icon: <FaDatabase className="text-[#F29111]" /> },
        { name: 'Postman', icon: <SiPostman className="text-[#FF6C37]" /> },
      ]
    },
    {
      title: 'Workflow & Tools',
      icon: <FaTerminal className="text-accent w-6 h-6" />,
      skills: [
        { name: 'Git & GitHub', icon: <FaGitAlt className="text-[#F05032]" /> },
        { name: 'Responsive Design', icon: <FaMobileAlt className="text-primary" /> },
        { name: 'Framer Motion', icon: <SiFramer className="text-white" /> },
        { name: 'Architecture', icon: <FaLayerGroup className="text-secondary" /> },
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 md:py-32 bg-dark relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Expertise <span className="text-gradient">& Skills</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A comprehensive set of modern technologies I use to build scalable, high-performance web applications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Card Decoration */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2.5rem] blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              
              <div className="relative h-full p-10 bg-darkAccent/50 backdrop-blur-xl rounded-[2.5rem] border border-white/5 group-hover:border-primary/30 transition-all duration-500">
                <div className="flex items-center space-x-4 mb-10">
                  <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:scale-110 transition-transform duration-500">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                </div>

                <div className="flex flex-wrap gap-4">
                  {category.skills.map((skill, sIdx) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (idx * 0.2) + (sIdx * 0.05) }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-2.5 px-5 py-3 bg-white/5 rounded-2xl border border-white/5 hover:border-primary/20 hover:bg-white/10 transition-all duration-300 group/skill"
                    >
                      <span className="text-xl group-hover/skill:scale-125 transition-transform duration-300">
                        {skill.icon}
                      </span>
                      <span className="text-gray-300 text-sm font-medium">{skill.name}</span>
                    </motion.div>
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

export default Skills;
