import React from 'react';
import { motion } from 'framer-motion';
import { education, extracurricular, certifications } from '../data';
import { GraduationCap, Award, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 relative bg-white dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Education Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-primary/10 rounded-lg text-primary">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-2xl font-bold">Education</h3>
            </div>
            
            <div className="space-y-8 pl-4 border-l-2 border-gray-200 dark:border-gray-800">
              {education.map((edu, index) => (
                <div key={index} className="relative pl-8">
                  <span className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-primary border-4 border-white dark:border-dark"></span>
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
                    <span className="text-sm text-primary font-semibold tracking-wide">{edu.date}</span>
                    <h4 className="text-xl font-bold mt-1">{edu.institution}</h4>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">{edu.degree}</p>
                    <div className="flex justify-between items-center mt-3">
                        <span className="text-sm text-gray-500">{edu.location}</span>
                        <span className="text-sm font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">{edu.score}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Certifications & Extracurricular */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-12"
          >
             {/* Certifications */}
             <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-secondary/10 rounded-lg text-secondary">
                    <Award size={24} />
                  </div>
                  <h3 className="text-2xl font-bold">Certifications</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {certifications.map((cert, index) => (
                    <div key={index} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-secondary dark:hover:border-secondary transition-colors">
                      <p className="font-medium">{cert}</p>
                    </div>
                  ))}
                </div>
             </div>

             {/* Extracurricular */}
             <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-pink-500/10 rounded-lg text-pink-500">
                    <Users size={24} />
                  </div>
                  <h3 className="text-2xl font-bold">Extracurricular</h3>
                </div>
                <div className="bg-gradient-to-br from-pink-500/5 to-purple-500/5 p-6 rounded-2xl border border-pink-500/10">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold">{extracurricular.org}</h4>
                    <span className="text-xs text-gray-500 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-sm">{extracurricular.date}</span>
                  </div>
                  <p className="text-secondary font-semibold mb-3">{extracurricular.role}</p>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 text-sm">
                    {extracurricular.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
