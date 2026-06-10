import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: 'Home', path: 'home' },
    { title: 'About', path: 'about' },
    { title: 'Skills', path: 'skills' },
    { title: 'Experience', path: 'experience' },
    { title: 'Contact', path: 'contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-dark/80 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold font-mono tracking-tighter"
        >
          <span className="text-primary">&lt;</span>
          Bhargav.dev
          <span className="text-primary"> /&gt;</span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                to={link.path} 
                smooth={true} 
                offset={-70} 
                duration={500} 
                className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm font-medium"
              >
                {link.title}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Button */}
        <div className="md:hidden text-gray-400" onClick={() => setNav(!nav)}>
          {nav ? <HiX size={30} /> : <HiMenuAlt3 size={30} />}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-0 left-0 w-full h-screen bg-dark z-40 flex flex-col items-center justify-center transition-transform duration-300 ${nav ? 'translate-x-0' : 'translate-x-full'}`}>
        <ul className="text-center">
          {navLinks.map((link) => (
            <li key={link.path} className="py-6 text-2xl" onClick={() => setNav(false)}>
              <Link 
                to={link.path} 
                smooth={true} 
                offset={-70} 
                duration={500} 
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                onClick={() => setNav(false)}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
