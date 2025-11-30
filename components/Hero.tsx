import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data';
import { ArrowRight, Download, Linkedin, Github, Mail } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center">
        
        {/* Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left mt-10 lg:mt-0">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-primary font-medium tracking-wider mb-4"
          >
            HELLO, I'M
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.10, delay: 0.1 }}
            className="text-5xl lg:text-7xl font-heading font-bold mb-6 leading-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              {personalInfo.name}
            </span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 h-8"
          >
            I build <span className="text-secondary font-semibold">Web Experiences</span>.
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto lg:mx-0 mb-10 text-lg leading-relaxed"
          >
            {personalInfo.summary}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <a href="#contact" className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 group">
              Contact Me
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="components\public\resume.pdf" 
              download="Anurag_Kumar_Singh_Resume.pdf"
              className="px-8 py-3 rounded-full border border-gray-300 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2"
            >
              Download CV
              <Download size={18} />
            </a>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 flex gap-6 justify-center lg:justify-start"
          >
             <a href="https://github.com/07anuragsingh" className="text-gray-500 hover:text-primary transition-colors"><Github size={24}/></a>
             <a href="https://www.linkedin.com/in/anurag-kumar-singh-64798724a/" className="text-gray-500 hover:text-primary transition-colors"><Linkedin size={24}/></a>
             <a href={`mailto:${personalInfo.email}`} className="text-gray-500 hover:text-primary transition-colors"><Mail size={24}/></a>
          </motion.div>
        </div>

        {/* Image / Visual */}
        <div className="w-full lg:w-1/2 flex justify-center items-center relative">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-72 h-72 sm:w-96 sm:h-96"
            >
                {/* Decorative circles */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-700 animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute inset-4 rounded-full border border-gray-200 dark:border-gray-800 animate-[spin_15s_linear_infinite_reverse]"></div>
                
                {/* Main Profile Image */}
                <div className="absolute inset-6 rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
                    <img 
                        src={personalInfo.profileImage} 
                        alt={personalInfo.name} 
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Floating cards/badges */}
                <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -right-4 top-10 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-xl glass"
                >
                    <span className="text-2xl">⚡</span>
                    <span className="font-bold text-sm ml-2">Fast Learner</span>
                </motion.div>

                <motion.div 
                     animate={{ y: [0, 10, 0] }}
                     transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -left-4 bottom-20 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-xl glass"
                >
                    <span className="text-2xl">💻</span>
                    <span className="font-bold text-sm ml-2">React Developer</span>
                </motion.div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;