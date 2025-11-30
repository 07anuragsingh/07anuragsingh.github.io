import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data';
import { Github, ExternalLink, Code2 } from 'lucide-react';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-[#0b1121]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col h-full"
            >
                {/* Project Header/Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-6 relative group">
                    <Code2 size={64} className="text-gray-600 dark:text-gray-500" />
                    <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                        {project.github && (
                            <a 
                                href={`https://${project.github}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="p-3 bg-white text-gray-900 rounded-full hover:scale-110 transition-transform"
                                title="View Code"
                            >
                                <Github size={20} />
                            </a>
                        )}
                        {project.link && (
                             <a 
                                href={project.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="p-3 bg-white text-gray-900 rounded-full hover:scale-110 transition-transform"
                                title="Live Demo"
                            >
                                <ExternalLink size={20} />
                            </a>
                        )}
                    </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                         <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">{project.title}</h3>
                         <span className="text-xs text-gray-500 whitespace-nowrap pt-1">{project.date}</span>
                    </div>
                   
                    <p className="text-sm text-secondary font-medium mb-4">{project.role}</p>
                    
                    <div className="mb-4 flex-1">
                         <ul className="space-y-1">
                             {project.description.map((desc, i) => (
                                 <li key={i} className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">• {desc}</li>
                             ))}
                         </ul>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tech.map((tech) => (
                            <span key={tech} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded text-gray-700 dark:text-gray-300 font-medium">
                                {tech}
                            </span>
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

export default Projects;
