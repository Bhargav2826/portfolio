import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-darkAccent border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-8 md:mb-0">
          <div className="text-2xl font-bold font-mono tracking-tighter mb-2">
            <span className="text-primary">&lt;</span>
            Bhargav Modha
            <span className="text-primary"> /&gt;</span>
          </div>
          <p className="text-gray-500 text-sm">Building digital experiences with the MERN stack.</p>
        </div>

        <div className="flex space-x-6 mb-8 md:mb-0">
          <a href="#" className="text-gray-400 hover:text-primary transition-colors"><FaGithub size={24} /></a>
          <a href="#" className="text-gray-400 hover:text-primary transition-colors"><FaLinkedin size={24} /></a>
          <a href="#" className="text-gray-400 hover:text-primary transition-colors"><FaTwitter size={24} /></a>
          <a href="#" className="text-gray-400 hover:text-primary transition-colors"><FaEnvelope size={24} /></a>
        </div>

        <div className="text-gray-500 text-sm text-center md:text-right">
          <p>© {new Date().getFullYear()} Bhargav Modha. All rights reserved.</p>
          <p className="mt-1">Crafted with React & Framer Motion.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
