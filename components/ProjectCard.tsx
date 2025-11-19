import React from 'react';
import { ArrowUpRight, Github, GitBranch } from 'lucide-react';
import { Project } from '../types';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2, ease: "easeOut" } }}
      className="group relative border border-neutral-800 bg-neutral-950 hover:border-neutral-600 transition-colors duration-300 flex flex-col h-full cursor-default"
    >
      {/* Dotted pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      
      <div className="p-6 flex-grow relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-neutral-900 border border-neutral-800 rounded-sm">
            <GitBranch className="w-5 h-5 text-neutral-400" />
          </div>
          <div className="flex gap-2">
             {project.github && (
                <motion.a 
                  whileHover={{ scale: 1.1, color: '#ffffff' }}
                  whileTap={{ scale: 0.95 }}
                  href={project.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-neutral-500 transition-colors p-1"
                >
                    <Github className="w-5 h-5" />
                </motion.a>
             )}
             {project.link && (
                <motion.a 
                  whileHover={{ scale: 1.1, color: '#ffffff', rotate: 45 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.link} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-neutral-500 transition-colors p-1"
                >
                    <ArrowUpRight className="w-5 h-5" />
                </motion.a>
             )}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-neutral-200 transition-colors">
          {project.title}
        </h3>
        
        {project.role && (
          <div className="text-xs font-mono text-neutral-500 mb-2 uppercase tracking-wide">
            {project.role} {project.date && `• ${project.date}`}
          </div>
        )}

        {project.description && (
          <p className="text-neutral-400 text-sm leading-relaxed mb-4">
            {project.description}
          </p>
        )}

        {project.highlights && (
          <ul className="text-neutral-400 text-sm leading-relaxed mb-6 list-disc list-outside ml-4 space-y-2">
            {project.highlights.map((highlight, idx) => (
              <li key={idx}>{highlight}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="p-6 pt-0 relative z-10 mt-auto">
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span 
              key={tech} 
              className="text-xs font-mono text-neutral-500 border border-neutral-800 px-2 py-1 rounded-sm bg-neutral-900/50"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;