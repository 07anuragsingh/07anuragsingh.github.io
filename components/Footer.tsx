import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '../data';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-[#0b1121] border-t border-gray-200 dark:border-gray-800 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="text-lg font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            {personalInfo.name}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a href="#" className="text-gray-500 hover:text-primary transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <Github size={20} />
          </a>
          <a href="#" className="text-gray-500 hover:text-primary transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <Linkedin size={20} />
          </a>
          <a href={`mailto:${personalInfo.email}`} className="text-gray-500 hover:text-primary transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
