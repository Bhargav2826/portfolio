import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone } from 'react-icons/fa';

const Contact = () => {
  return (
    <section id="contact" className="py-20 md:py-32 bg-dark">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Get in <span className="text-gradient">Touch</span></h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            Have a project in mind or just want to chat? Feel free to reach out.
            I am always open to new opportunities and collaborations.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Email */}
          <motion.a
            href="mailto:brgv6837@gmail.com"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-5 bg-darkAccent border border-white/10 rounded-2xl px-8 py-6 w-full md:w-auto min-w-[280px] hover:border-primary/40 transition-all cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:bg-primary/20 transition-all flex-shrink-0">
              <FaEnvelope size={22} />
            </div>
            <div>
              <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Email</p>
              <p className="text-white font-semibold text-lg">brgv6837@gmail.com</p>
            </div>
          </motion.a>

          {/* Phone */}
          <motion.a
            href="tel:+919099582826"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-5 bg-darkAccent border border-white/10 rounded-2xl px-8 py-6 w-full md:w-auto min-w-[280px] hover:border-primary/40 transition-all cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:bg-primary/20 transition-all flex-shrink-0">
              <FaPhone size={22} />
            </div>
            <div>
              <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Phone</p>
              <p className="text-white font-semibold text-lg">+91 9099582826</p>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
