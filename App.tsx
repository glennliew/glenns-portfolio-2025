import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DitherCanvas from './components/DitherCanvas';
import ProjectCard from './components/ProjectCard';
import SectionHeader from './components/SectionHeader';
import { Project, SkillCategory, Experience, Education } from './types';
import { ArrowRight, Code, Database, Layout, Cloud, Terminal, Mail, Github, Linkedin, FileText, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

// --- DATA POPULATION ---

const EXPERIENCE: Experience[] = [
  {
    id: 'cpf',
    company: 'Central Provident Fund Board',
    role: 'Software Engineer',
    period: 'Jan 2025 - Sep 2025',
    highlights: [
      'Engineered automation bots with UiPath to streamline data extraction, Excel updates, and email report generation leveraging SaaS solutions.',
      'Integrated Bloomberg Terminal data leveraging OCR and Gemini APIs, enabling intelligent parsing and analysis of financial reports and credit ratings.',
      'Designed, created, and tested UiPath automation workflows to streamline Bloomberg credit rating analysis, improving operational efficiency by 90%.'
    ]
  },
  {
    id: 'lenor',
    company: 'Lenor AI',
    role: 'Software Engineer',
    period: 'Apr 2025 - Jul 2025',
    highlights: [
      'Formed founding engineering team of startup Edtech company partnered with MOE and backed by Google, Nvidia and NUS.',
      'Designed and developed robust front-end interfaces using HTML, CSS, and React.js for remarkably.ink and reedu.ai.',
      'Built and maintained back-end services and APIs using JavaScript and Firebase; set up queuing system using BullMQ backed by Redis.',
      'Managed scalable cloud deployments on GCP, implementing CI/CD workflows and containerised services (Docker).'
    ]
  }
];

const PROJECTS: Project[] = [
  {
    id: 'startup-intel',
    title: 'Startup Intelligence Platform',
    role: 'Software Engineer & Research Assistant',
    date: 'Oct 2025 - Present',
    technologies: ['Python', 'FastAPI', 'OpenAI', 'pgvector', 'Docker'],
    highlights: [
      'Built an automated platform aggregating company data from web sources/APIs with semantic search and chat capabilities.',
      'Architected a concurrent async research engine (Python, FastAPI, asyncio) scraping GitHub and NewsAPI.',
      'Implemented semantic search via OpenAI embeddings + pgvector for natural-language queries.',
      'Engineered rate limiting with token bucket algorithms to ensure polite web scraping.'
    ]
  },
  {
    id: 'defi-tracker',
    title: 'DeFi Vault Tracker',
    role: 'Software Engineer',
    date: 'Sep 2025 - Present',
    technologies: ['TypeScript', 'Node.js', 'PostgreSQL', 'React', 'ethers.js'],
    highlights: [
      'Constructed a DeFi security monitoring system for Seamless USDC Vault on Base network, detecting potential drainage in <30s.',
      'Implemented block-driven watcher service leveraging ethers.js to query ERC-4626 vaults.',
      'Deployed full-stack App with Node.js/Express, time-series PostgreSQL, and React Recharts dashboard.'
    ]
  },
  {
    id: 'cafe-ai',
    title: 'AI Cafe Order Assistant',
    role: 'AI Engineer',
    date: 'Sep 2025 - Present',
    technologies: ['OpenAI GPT-4', 'Python', 'Function Calling'],
    highlights: [
      'Built an AI-powered order assistant using GPT-4 function calling for natural language parsing and inventory validation.',
      'Devised multi-tool orchestration with schemas for menu lookup, tax computation, and customer messaging.',
      'Implemented robust business logic for allergy detection, loyalty redemption, and location-aware tax.'
    ]
  },
  {
    id: 'tic-tac-toe',
    title: 'Ultimate Tic-Tac-Toe Agent',
    role: 'ML Engineer',
    date: 'Mar 2025 - Apr 2025',
    technologies: ['Python', 'Scikit-Learn', 'Ridge Regression', 'Random Forest'],
    highlights: [
      'Developed a ML agent for Ultimate Tic-Tac-Toe, a strategic extension of the classic game.',
      'Implemented regression-based models (Gradient Boosting, MLP) to predict optimal moves with 95% accuracy.',
      'Achieved top 5% result in cohort through feature engineering and hyperparameter tuning.'
    ]
  },
  {
    id: 'piggify',
    title: 'Piggify (NUS Orbital)',
    role: 'Software Engineer',
    date: 'May 2024 - Jul 2024',
    technologies: ['React Native', 'Firebase', 'Rest API'],
    highlights: [
      'Co-led development of a full-stack finance-tracking app simplifying shared expense management.',
      'Implemented user auth, expense tracking, analytics dashboard, and repayment notifications.',
      'Designed RESTful APIs for transaction management and real-time synchronization.'
    ]
  },
  {
    id: 'psa-hackathon',
    title: 'PSA CodeSprint Hackathon',
    role: 'Team Lead',
    date: 'Oct 2024',
    technologies: ['LangChain', 'RAG', 'LLMs'],
    highlights: [
      'Built RAG pipelines with LangChain for PSA-specific internal knowledge queries.',
      'Implemented AI-driven mentor matching and personalized career guidance leveraging LLMs.'
    ]
  }
];

const EDUCATION: Education[] = [
  {
    school: 'National University of Singapore (NUS)',
    degree: 'Bachelor of Computing in Computer Science',
    period: 'Jul 2023 - May 2027',
    highlights: [
      'Relevant Coursework: Software Engineering, Data Structures & Algorithms, Database Systems (SQL), AI/ML, Operating Systems, Computer Networks, Distributed Systems.'
    ]
  },
  {
    school: 'Victoria Junior College',
    degree: "Singapore Cambridge GCE 'A' Levels",
    period: 'Jan 2019 - Dec 2020',
    highlights: [
      'Graduated with Distinctions in Biology, Chemistry, Mathematics, Economics.'
    ]
  }
];

const SKILLS_DATA = [
  { category: SkillCategory.LANGUAGES, items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C', 'C#', 'SQL'] },
  { category: SkillCategory.FRAMEWORKS, items: ['React', 'React Native', 'Next.js', 'Vue', 'Node.js', 'FastAPI'] },
  { category: SkillCategory.BACKEND, items: ['PostgreSQL', 'Firebase', 'Redis', 'Apache Spark', 'Hadoop', 'MongoDB'] },
  { category: SkillCategory.CLOUD, items: ['GCP', 'AWS', 'Docker', 'Kubernetes', 'Git', 'CI/CD'] },
  { category: SkillCategory.TOOLS, items: ['UiPath', 'Bloomberg Terminal', 'Figma', 'Junit', 'Gradle', 'Linux'] },
];

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

function App() {
  return (
    <div className="min-h-screen bg-mono-black text-white selection:bg-white selection:text-black font-sans">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden border-b border-neutral-900">
        {/* Background Grid */}
        <div className="absolute inset-0 z-0 opacity-[0.05]" 
             style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Text Content */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="order-2 lg:order-1 flex flex-col gap-6"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/50 w-fit">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-mono text-neutral-400">AVAILABLE FOR HIRE</span>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-2">
                GLENN LIEW <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-400 to-white">
                  ZI YI
                </span>
              </h1>
              <p className="text-xl text-white font-mono mt-2">Software Engineer | CS @ NUS</p>
            </motion.div>
            
            <motion.p variants={fadeInUp} className="text-lg text-neutral-400 max-w-xl leading-relaxed">
              Full-stack software engineer specializing in high-performance web applications, AI automation, and distributed systems. I turn complex requirements into robust, scalable code.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mt-4">
              <motion.a 
                href="#work" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-black font-bold rounded-sm flex items-center gap-2 group"
              >
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a 
                href="#contact" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border border-neutral-700 text-white font-bold rounded-sm hover:border-white hover:bg-neutral-900 transition-all"
              >
                Contact Me
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Visual Content (Dither Effect) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 relative h-[400px] lg:h-[500px] w-full border border-neutral-800 bg-neutral-900 overflow-hidden rounded-sm"
          >
            {/* Code Window Overlay Simulation */}
            <div className="absolute top-4 left-4 right-4 bottom-4 border border-neutral-800 bg-mono-black z-10 flex flex-col shadow-2xl">
              <div className="h-8 border-b border-neutral-800 flex items-center px-4 gap-2 bg-neutral-900">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                <div className="ml-4 text-xs font-mono text-neutral-500">portfolio_sys.tsx</div>
              </div>
              <div className="flex-grow relative bg-black">
                 <DitherCanvas />
                 
                 <motion.div 
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-6 left-6 pointer-events-none"
                 >
                    <div className="text-xs font-mono text-neutral-500 mb-1">System Status</div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                       <span className="w-2 h-2 bg-green-500 rounded-full"></span> ONLINE
                    </div>
                 </motion.div>
                 
                 <div className="absolute top-6 right-6 pointer-events-none text-right">
                    <div className="text-xs font-mono text-neutral-500 mb-1">Render Mode</div>
                    <div className="text-sm font-bold text-white">BAYER_DITHER_4X4</div>
                 </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-neutral-800/20 blur-3xl -z-10"></div>
          </motion.div>
        </div>
      </section>

      {/* TECH STACK MARQUEE */}
      <div className="py-8 border-b border-neutral-900 bg-neutral-950 overflow-hidden">
         <div className="relative flex overflow-x-hidden group hover:cursor-pointer">
            <div className="animate-marquee whitespace-nowrap flex items-center gap-12 px-8 group-hover:[animation-play-state:paused]">
               {["JavaScript", "TypeScript", "React", "Python", "Java", "Node.js", "PostgreSQL", "Docker", "AWS", "GCP", "Next.js", "Firebase"].map((tech, i) => (
                   <span key={i} className="text-lg font-mono font-bold text-neutral-600 hover:text-white transition-colors cursor-default select-none">
                       {tech}
                   </span>
               ))}
               {["JavaScript", "TypeScript", "React", "Python", "Java", "Node.js", "PostgreSQL", "Docker", "AWS", "GCP", "Next.js", "Firebase"].map((tech, i) => (
                   <span key={`dup-${i}`} className="text-lg font-mono font-bold text-neutral-600 hover:text-white transition-colors cursor-default select-none">
                       {tech}
                   </span>
               ))}
            </div>
         </div>
      </div>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="py-24 bg-mono-black border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Work Experience" description="Professional history delivering software solutions." />
          
          <div className="flex flex-col gap-8">
            {EXPERIENCE.map((exp, index) => (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{ x: 10, transition: { duration: 0.2 } }}
                className="flex flex-col md:flex-row gap-4 md:gap-12 border-l border-neutral-800 pl-8 relative group"
              >
                {/* Timeline Dot */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.2, type: "spring" }}
                  className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-neutral-500 rounded-full border border-black group-hover:bg-white transition-colors"
                />
                
                <div className="md:w-1/3 shrink-0">
                  <h3 className="text-2xl font-bold text-white group-hover:text-neutral-200 transition-colors">{exp.company}</h3>
                  <div className="text-neutral-400 font-mono mt-1 mb-2">{exp.role}</div>
                  <div className="inline-flex items-center gap-2 px-2 py-1 bg-neutral-900 rounded-sm text-xs text-neutral-500 font-mono border border-neutral-800">
                    <Calendar className="w-3 h-3" /> {exp.period}
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <ul className="space-y-3">
                    {exp.highlights.map((item, idx) => (
                      <li key={idx} className="text-neutral-300 leading-relaxed text-sm md:text-base relative pl-6">
                        <span className="absolute left-0 top-2 w-1.5 h-1.5 bg-neutral-700 rounded-full group-hover:bg-neutral-500 transition-colors"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="work" className="py-24 bg-neutral-950 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader 
            title="Selected Projects" 
            description="A collection of systems, applications, and tools demonstrating full-stack expertise." 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION SECTION */}
      <section id="education" className="py-24 bg-mono-black border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Education" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {EDUCATION.map((edu, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ y: -5 }}
                className="p-8 border border-neutral-800 bg-neutral-900/20 rounded-sm hover:border-neutral-700 transition-colors"
              >
                <h3 className="text-xl font-bold text-white mb-2">{edu.school}</h3>
                <p className="text-neutral-400 mb-4">{edu.degree}</p>
                <div className="text-sm font-mono text-neutral-500 mb-6">{edu.period}</div>
                {edu.highlights && (
                  <p className="text-sm text-neutral-300 leading-relaxed border-t border-neutral-800 pt-4">
                    {edu.highlights[0]}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-24 bg-neutral-950">
         <div className="max-w-7xl mx-auto px-6">
             <SectionHeader title="Technical Arsenal" description="Technologies and tools I use to build software." />
             
             <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
             >
                 {SKILLS_DATA.map((skillGroup, idx) => (
                     <motion.div 
                        key={idx} 
                        variants={fadeInUp}
                        whileHover={{ scale: 1.02, backgroundColor: '#0a0a0a' }}
                        className="border border-neutral-800 bg-black p-6 transition-colors"
                     >
                         <div className="flex items-center gap-3 mb-6">
                             <div className="p-2 bg-neutral-900 text-white rounded-sm">
                                 {skillGroup.category === SkillCategory.LANGUAGES && <Code className="w-5 h-5" />}
                                 {skillGroup.category === SkillCategory.FRAMEWORKS && <Layout className="w-5 h-5" />}
                                 {skillGroup.category === SkillCategory.BACKEND && <Database className="w-5 h-5" />}
                                 {skillGroup.category === SkillCategory.CLOUD && <Cloud className="w-5 h-5" />}
                                 {skillGroup.category === SkillCategory.TOOLS && <Terminal className="w-5 h-5" />}
                             </div>
                             <h4 className="font-bold text-sm uppercase tracking-wider">{skillGroup.category}</h4>
                         </div>
                         <div className="flex flex-wrap gap-2">
                             {skillGroup.items.map((item) => (
                                 <span key={item} className="text-sm text-neutral-400 border border-neutral-800 px-3 py-1 rounded-sm bg-neutral-900/30 hover:bg-neutral-800 transition-colors cursor-default">
                                     {item}
                                 </span>
                             ))}
                         </div>
                     </motion.div>
                 ))}
             </motion.div>
         </div>
      </section>

      {/* CONTACT / FOOTER */}
      <section id="contact" className="py-24 bg-mono-black border-t border-neutral-900">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-6 text-center"
        >
            <motion.h2 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold mb-8 tracking-tight"
            >
              Ready to collaborate?
            </motion.h2>
            <p className="text-neutral-400 mb-12 max-w-2xl mx-auto text-lg">
                I'm currently looking for opportunities to apply my skills in full-stack development and AI engineering.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:glennliew@u.nus.edu" 
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-bold text-lg rounded-sm hover:bg-neutral-200 transition-colors"
              >
                  <Mail className="w-5 h-5" />
                  glennliew@u.nus.edu
              </motion.a>
              <motion.div 
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-neutral-800 text-neutral-300 font-mono text-lg rounded-sm cursor-pointer hover:bg-neutral-900 hover:border-neutral-600 transition-colors"
              >
                  (+65) 83886462
              </motion.div>
            </div>

            <div className="flex justify-center gap-8 mb-16">
                <motion.a whileHover={{ y: -5, color: '#fff' }} href="#" className="text-neutral-500 transition-colors"><Github className="w-6 h-6" /></motion.a>
                <motion.a whileHover={{ y: -5, color: '#fff' }} href="#" className="text-neutral-500 transition-colors"><Linkedin className="w-6 h-6" /></motion.a>
                <motion.a whileHover={{ y: -5, color: '#fff' }} href="#" className="text-neutral-500 transition-colors"><FileText className="w-6 h-6" /></motion.a>
            </div>

            <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-600 font-mono">
                <p>&copy; 2024 Glenn Liew Zi Yi. All rights reserved.</p>
                <p>System Status: OPERATIONAL</p>
            </div>
        </motion.div>
      </section>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default App;