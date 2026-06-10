import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Terminal = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([
        { type: 'output', content: 'Welcome to Bhargav\'s Interactive Terminal. (v1.0.0)' },
        { type: 'output', content: 'Type "help" to see available commands.' }
    ]);
    // Ref on the scrollable container div, NOT a child element
    const containerRef = useRef(null);

    // Only scroll the terminal's own inner box — NOT the window
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();
            const newHistory = [...history, { type: 'input', content: input }];

            switch (cmd) {
                case 'help':
                    newHistory.push({ type: 'output', content: 'Available commands: help, skills, projects, resume, contact, clear' });
                    break;
                case 'skills':
                    newHistory.push({ type: 'output', content: 'Skills: React, Node.js, MongoDB, Express, TypeScript, Tailwind, Three.js' });
                    break;
                case 'projects':
                    newHistory.push({ type: 'output', content: 'Redirecting to projects section...' });
                    setTimeout(() => {
                        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                    }, 500);
                    break;
                case 'resume':
                    newHistory.push({ type: 'output', content: 'Opening resume... (link placeholder)' });
                    break;
                case 'contact':
                    newHistory.push({ type: 'output', content: 'Socials: GitHub (@bhargav-modha), LinkedIn (Bhargav Modha), Email (bhargav@example.com)' });
                    break;
                case 'clear':
                    setHistory([]);
                    setInput('');
                    return;
                default:
                    newHistory.push({ type: 'output', content: `Command not found: ${cmd}. Type "help" for a list of commands.` });
            }

            setHistory(newHistory);
            setInput('');
        }
    };

    return (
        <section className="py-20 bg-dark">
            <div className="max-w-4xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-white/10"
                >
                    <div className="bg-[#323232] px-4 py-2 flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                        <span className="text-gray-400 text-xs font-mono ml-4">bhargav@portfolio: ~</span>
                    </div>

                    {/* containerRef on the scrollable div so scrollTop only affects this box */}
                    <div ref={containerRef} className="p-6 h-[400px] overflow-y-auto font-mono text-sm sm:text-base scrollbar-hide">
                        {history.map((line, i) => (
                            <div key={i} className="mb-2">
                                {line.type === 'input' ? (
                                    <div className="flex">
                                        <span className="text-primary mr-2">➜</span>
                                        <span className="text-secondary mr-2">~</span>
                                        <span className="text-white">{line.content}</span>
                                    </div>
                                ) : (
                                    <div className="text-gray-400 opacity-90">{line.content}</div>
                                )}
                            </div>
                        ))}
                        <div className="flex items-center">
                            <span className="text-primary mr-2">➜</span>
                            <span className="text-secondary mr-2">~</span>
                            <input
                                type="text"
                                className="bg-transparent border-none outline-none text-white w-full"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleCommand}
                            />
                        </div>
                    </div>
                </motion.div>
                <p className="text-center text-gray-500 mt-6 text-sm font-mono">Interactive Developer Terminal Section</p>
            </div>
        </section>
    );
};

export default Terminal;
