import React from 'react';
import { motion } from 'framer-motion';
import { experiences } from '../data';
import { Briefcase } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-white dark:bg-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">Professional Experience</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </motion.div>

        <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700"></div>

            <div className="space-y-12">
                {experiences.map((exp, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className={`relative flex flex-col md:flex-row gap-8 ${
                            index % 2 === 0 ? 'md:flex-row-reverse' : ''
                        }`}
                    >
                        {/* Dot */}
                        <div className="absolute left-[-5px] md:left-1/2 top-0 transform md:-translate-x-1/2 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-white dark:ring-dark z-10"></div>

                        {/* Content */}
                        <div className="md:w-1/2 pl-8 md:pl-0 md:px-8">
                            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.role}</h3>
                                    <span className="text-xs font-semibold px-2 py-1 bg-secondary/10 text-secondary rounded">{exp.type}</span>
                                </div>
                                <div className="flex items-center gap-2 text-primary font-medium mb-4">
                                    <Briefcase size={16} />
                                    <span>{exp.company}</span>
                                </div>
                                <p className="text-sm text-gray-500 mb-4">{exp.date}</p>
                                <ul className="space-y-2">
                                    {exp.description.map((desc, i) => (
                                        <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                                            <span className="mr-2 text-primary">•</span>
                                            {desc}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        {/* Empty side for layout balance */}
                        <div className="hidden md:block md:w-1/2"></div>
                    </motion.div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
