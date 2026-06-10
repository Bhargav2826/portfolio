import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaPlus, FaTrash, FaLock, FaUnlock } from 'react-icons/fa';
import axios from 'axios';

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [projectsList, setProjectsList] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    image: '',
    techStack: '',
    category: 'Full Stack',
    githubLink: '',
    liveDemo: ''
  });

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get('/api/projects');
      if (data && data.dbOffline) throw new Error('Offline');
      setProjectsList(data);
    } catch (error) {
      const savedMock = localStorage.getItem('portfolio_mock_projects');
      if (savedMock) {
        setProjectsList(JSON.parse(savedMock));
      } else {
        localStorage.setItem('portfolio_mock_projects', JSON.stringify(initialProjects));
        setProjectsList(initialProjects);
      }
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddProject = async (e) => {
    e.preventDefault();
      const projectToSave = {
        ...newProject,
        techStack: newProject.techStack.split(',').map(s => s.trim())
      };
      try {
        const res = await axios.post('/api/projects', projectToSave);
        if (res.data && res.data.dbOffline) throw new Error('Offline');
      } catch (error) {
        console.warn('Backend unavailable. Simulating project addition locally.', error.message);
        const updatedList = [...projectsList, projectToSave];
        setProjectsList(updatedList);
        localStorage.setItem('portfolio_mock_projects', JSON.stringify(updatedList));
      }
      setNewProject({
        title: '',
        description: '',
        image: '',
        techStack: '',
        category: 'Full Stack',
        githubLink: '',
        liveDemo: ''
      });
      setShowAddForm(false);
      fetchProjects();
  };

  const handleDeleteProject = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      if (!id || id === "undefined") {
        const updatedList = projectsList.filter(p => p.title !== title);
        setProjectsList(updatedList);
        // Persist the deletion of the mock project so it doesn't reappear on refresh
        localStorage.setItem('portfolio_mock_projects', JSON.stringify(updatedList));
        return;
      }

      try {
        const res = await axios.delete(`/api/projects/${id}`);
        if (res.data && res.data.dbOffline) throw new Error('Offline');
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project from server. Please check your database connection.');
      }
    }
  };

  const initialProjects = [
    {
      title: 'SIP & Lumpsum Calculator',
      description: 'A financial planning tool built with React and Chart.js for visualizing investment growth.',
      image: 'https://images.unsplash.com/photo-1611974717482-48a8a101f11e?q=80&w=1000&auto=format&fit=crop',
      techStack: ['React', 'Chart.js', 'Tailwind'],
      category: 'Frontend',
      githubLink: '#',
      liveDemo: '#',
    },
    {
      title: 'Broker App (MERN)',
      description: 'A real estate platform for managing property listings, user authentication, and secure inquiries.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop',
      techStack: ['MongoDB', 'Express', 'React', 'Node'],
      category: 'Full Stack',
      githubLink: '#',
      liveDemo: '#',
    },
    {
      title: 'Speech to Text App',
      description: 'AI-powered application that converts voice input into text with support for multiple languages.',
      image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=1000&auto=format&fit=crop',
      techStack: ['React', 'SpeechRecognition API', 'Tailwind'],
      category: 'AI',
      githubLink: '#',
      liveDemo: '#',
    }
  ];

  const categories = ['All', 'Full Stack', 'Frontend', 'AI'];
  const filteredProjects = filter === 'All' ? projectsList : projectsList.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-20 md:py-32 bg-darkAccent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured <span className="text-gradient">Projects</span></h2>
            <p className="text-gray-400">Some of my most relevant works.</p>
            
            <button 
              onClick={() => setIsAdmin(!isAdmin)}
              className="mt-4 flex items-center space-x-2 text-xs font-mono text-gray-600 hover:text-primary transition-colors"
            >
              {isAdmin ? <FaUnlock size={10} /> : <FaLock size={10} />}
              <span>{isAdmin ? 'Admin Mode On' : 'Manager Mode'}</span>
            </button>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-8 md:mt-0 items-center">
            {isAdmin && (
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-primary/20 text-primary border border-primary/30 p-2 rounded-full hover:bg-primary hover:text-white transition-all"
                title="Add New Project"
              >
                <FaPlus />
              </button>
            )}
            
            <div className="flex space-x-4 bg-white/5 p-1 rounded-full border border-white/5">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${filter === cat ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:text-white'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-16 overflow-hidden"
            >
              <form onSubmit={handleAddProject} className="bg-dark p-8 rounded-[2.5rem] border border-white/10 grid md:grid-cols-2 gap-6 shadow-2xl">
                <div className="space-y-4">
                  <input
                    placeholder="Project Title"
                    required
                    value={newProject.title}
                    onChange={e => setNewProject({...newProject, title: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 focus:outline-none focus:border-primary transition-colors"
                  />
                  <textarea
                    placeholder="Project Description"
                    required
                    rows="3"
                    value={newProject.description}
                    onChange={e => setNewProject({...newProject, description: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                  <input
                    placeholder="Image URL"
                    required
                    value={newProject.image}
                    onChange={e => setNewProject({...newProject, image: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-4">
                  <input
                    placeholder="Tech Stack (comma separated: React, Node, etc.)"
                    required
                    value={newProject.techStack}
                    onChange={e => setNewProject({...newProject, techStack: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 focus:outline-none focus:border-primary transition-colors"
                  />
                  <select
                    value={newProject.category}
                    onChange={e => setNewProject({...newProject, category: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 focus:outline-none focus:border-primary transition-colors text-gray-400"
                  >
                    {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      placeholder="GitHub Link"
                      value={newProject.githubLink}
                      onChange={e => setNewProject({...newProject, githubLink: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 focus:outline-none focus:border-primary transition-colors"
                    />
                    <input
                      placeholder="Live Demo Link"
                      value={newProject.liveDemo}
                      onChange={e => setNewProject({...newProject, liveDemo: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <button type="submit" className="w-full bg-primary py-3 rounded-xl font-bold hover:bg-primary/80 transition-all shadow-lg shadow-primary/20">
                    Add Project
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project._id || project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-dark rounded-[2rem] overflow-hidden border border-white/5 hover:border-primary/30 transition-all hover:-translate-y-2 flex flex-col h-full"
              >
                {isAdmin && (
                  <button
                    onClick={() => handleDeleteProject(project._id, project.title)}
                    className="absolute top-4 right-4 z-20 p-3 bg-red-500/10 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all backdrop-blur-md border border-red-500/20"
                  >
                    <FaTrash size={14} />
                  </button>
                )}
                
                <div className="h-56 overflow-hidden relative">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60"></div>
                </div>
                
                <div className="p-8 flex-grow flex flex-col">
                  <span className="text-primary text-[10px] uppercase tracking-widest font-bold mb-2">{project.category}</span>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                    {project.techStack.map(t => (
                      <span key={t} className="text-[10px] px-3 py-1 bg-white/5 rounded-full text-gray-400 border border-white/5">{t}</span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t border-white/5">
                    <div className="flex space-x-5">
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors transform hover:scale-125"><FaGithub size={22} /></a>
                      <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors transform hover:scale-125"><FaExternalLinkAlt size={20} /></a>
                    </div>
                    <button className="text-primary text-xs font-bold flex items-center group/btn tracking-widest uppercase">
                      Case Study <span className="ml-2 group-hover/btn:translate-x-2 transition-transform">-&gt;</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

