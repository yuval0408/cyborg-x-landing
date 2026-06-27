import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import {
  BrainCircuit,
  Eye,
  ShieldAlert,
  Cpu,
  Zap,
  TrendingUp,
  PlayCircle,
  Share2,
  Globe,
  Mail,
  Sparkles,
  ChevronRight,
  Flame,
  CheckCircle,
  Network
} from 'lucide-react';

import Navigation from './components/Navigation';
import CyberCanvas from './components/CyberCanvas';
import CyberHeroGlobe from './components/CyberHeroGlobe';
import CyberDashboard from './components/CyberDashboard';
import Counter from './components/Counter';

import { FEATURE_CARDS, TECHNOLOGY_CHIPS, STATS_ITEMS, TIMELINE_MILESTONES, TESTIMONIALS } from './data';

// Helper to resolve string icons to Lucide components
const renderFeatureIcon = (iconName: string) => {
  const baseClasses = "w-8 h-8 text-cyber-cyan transition-transform group-hover:scale-110";
  switch (iconName) {
    case 'BrainCircuit':
      return <BrainCircuit className={baseClasses} />;
    case 'Eye':
      return <Eye className={baseClasses} />;
    case 'ShieldAlert':
      return <ShieldAlert className={baseClasses} />;
    case 'Cpu':
      return <Cpu className={baseClasses} />;
    case 'Zap':
      return <Zap className={baseClasses} />;
    case 'TrendingUp':
      return <TrendingUp className={baseClasses} />;
    default:
      return <Sparkles className={baseClasses} />;
  }
};

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [demoVideoOpen, setDemoVideoOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [contactSuccess, setContactSuccess] = useState(false);
  
  // Ref for Hero Section mouse parallax tracking
  const heroRef = useRef<HTMLDivElement | null>(null);

  // Scroll Progress for Timeline Connector Animation
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  // Track mouse coordinates for subtle parallax and neon cursor light
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePos({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
    }, 5000);
  };

  return (
    <div className="relative min-h-screen bg-[#050816] text-[#dbe3ec] selection:bg-cyber-cyan selection:text-black">
      
      {/* Absolute background shader canvas */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-40">
        <CyberCanvas />
      </div>

      {/* Navigation Header */}
      <Navigation />

      {/* Hero Section */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden pt-24 md:pt-32 z-10"
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
          
          {/* Subtle Mouse Neon Glow Follower */}
          <div
            className="absolute hidden lg:block w-[500px] h-[500px] bg-cyber-cyan/5 rounded-full blur-[140px] pointer-events-none transition-transform duration-500 ease-out"
            style={{
              transform: `translate(${mousePos.x * 200}px, ${mousePos.y * 200}px)`,
              left: '20%',
              top: '15%',
            }}
          />

          {/* Left Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8 flex flex-col items-start"
          >
            {/* Tag Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan font-sans text-xs font-semibold tracking-widest uppercase"
            >
              <span className="mr-2 h-2.5 w-2.5 rounded-full bg-cyber-cyan animate-pulse shadow-[0_0_8px_#00f5ff]" />
              NEXT-GEN NEURAL EVOLUTION
            </motion.div>

            {/* Headline */}
            <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-white">
              Beyond Human.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-cyan to-cyber-purple drop-shadow-[0_2px_15px_rgba(0,245,255,0.2)]">
                Beyond Possible.
              </span>
            </h1>

            {/* Paragraph Description */}
            <p className="font-sans text-lg md:text-xl text-gray-400 max-w-lg leading-relaxed font-light">
              AI-powered cybernetic innovation engineered for the next evolution of humanity. Seamless integration, infinite capability.
            </p>

            {/* Call to Actions with Elegant Hover */}
            <div className="flex flex-wrap gap-5 pt-4">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(0, 245, 255, 0.45)' }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-cyber-cyan to-cyber-purple text-[#050816] font-display font-bold py-4 px-10 rounded-full text-base transition-all duration-300"
              >
                Enter the Future
              </motion.a>

              <motion.button
                onClick={() => setDemoVideoOpen(true)}
                whileHover={{ scale: 1.05, borderColor: 'rgba(0, 245, 255, 0.5)' }}
                whileTap={{ scale: 0.98 }}
                className="glass-card text-cyber-cyan border border-white/10 font-display font-bold py-4 px-8 rounded-full flex items-center gap-2.5 transition-all"
              >
                <PlayCircle className="w-5 h-5 text-cyber-cyan animate-pulse" />
                Watch Demo
              </motion.button>
            </div>
          </motion.div>

          {/* Right Hero Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.1, ease: 'easeOut' }}
            className="relative h-[450px] md:h-[550px] w-full flex items-center justify-center z-10"
            style={{
              transform: `translate(${mousePos.x * -25}px, ${mousePos.y * -25}px)`,
            }}
          >
            {/* Decorative Orbital Glow Rings behind globe */}
            <div className="absolute w-[350px] h-[350px] bg-cyber-purple/10 rounded-full blur-[80px] -z-10" />
            <div className="absolute w-[250px] h-[250px] bg-cyber-cyan/10 rounded-full blur-[60px] -z-10" />

            {/* Custom 3D-effect canvas neural brain sphere component */}
            <CyberHeroGlobe />
          </motion.div>
        </div>
      </section>

      {/* Features Bento Grid (Neural Architecture) */}
      <section id="features" className="py-28 relative z-10 border-t border-white/5 bg-[#070f15]/40">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Section Header */}
          <div className="mb-20 text-center max-w-3xl mx-auto space-y-4">
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white">
              Neural Architecture
            </h2>
            <p className="text-gray-400 font-sans text-base md:text-lg font-light">
              Precision engineered components working in perfect harmony with biological neural pathways.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {FEATURE_CARDS.map((card, idx) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: 'easeOut' }}
                whileHover={{ 
                  y: -6, 
                  borderColor: 'rgba(0, 245, 255, 0.35)',
                  boxShadow: '0 10px 30px rgba(0, 245, 255, 0.08)'
                }}
                className={`group glass-card p-8 md:p-10 rounded-2xl flex flex-col justify-end min-h-[300px] border border-white/5 transition-all duration-300 ${card.colSpan}`}
              >
                {/* Floating animated icon */}
                <div className="mb-6 p-3 bg-cyber-cyan/5 w-fit rounded-xl border border-white/5 group-hover:border-cyber-cyan/25 transition-colors">
                  {renderFeatureIcon(card.icon)}
                </div>

                <h3 className="font-display text-xl md:text-2xl font-semibold text-white mb-2 transition-colors group-hover:text-cyber-cyan">
                  {card.title}
                </h3>
                
                <p className="text-gray-400 font-sans text-sm md:text-base leading-relaxed font-light">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="tech" className="py-24 relative z-10 border-t border-white/5 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 text-center">
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl font-bold text-white mb-12"
          >
            Technological Foundation
          </motion.h2>

          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {TECHNOLOGY_CHIPS.map((chip, idx) => {
              const isSelected = selectedTech === chip.name;
              return (
                <motion.button
                  key={chip.name}
                  onClick={() => setSelectedTech(isSelected ? null : chip.name)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.06, borderColor: 'rgba(0, 245, 255, 0.4)' }}
                  whileTap={{ scale: 0.96 }}
                  className={`px-8 py-3.5 rounded-full font-display font-medium text-sm transition-all border cursor-pointer flex items-center gap-2 ${
                    isSelected 
                      ? 'bg-gradient-to-r from-cyber-cyan to-cyber-purple text-[#050816] border-transparent shadow-[0_0_15px_rgba(0,245,255,0.35)]' 
                      : 'glass-card text-cyber-cyan border-white/5 hover:bg-cyber-cyan/5'
                  }`}
                >
                  <Network className={`w-3.5 h-3.5 ${isSelected ? 'animate-spin' : ''}`} />
                  {chip.name}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {selectedTech && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-12 p-6 glass-card rounded-2xl max-w-2xl mx-auto border border-cyber-cyan/20 bg-cyber-dark/60 text-left"
              >
                <h4 className="font-display text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
                  {selectedTech} Integration Layer
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed font-sans">
                  The {selectedTech} node acts as a core biological sync pathway within CYBORG-X. It processes quantum matrices and feeds micro-feedback directly into the user's cerebral cortex.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="py-24 relative z-10 border-t border-white/5 bg-[#070f15]/40">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Heading */}
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
              Real-time Diagnostics
            </h2>
            <p className="text-gray-400 font-sans text-base">
              Monitor the mental and cybernetic telemetry systems live. Interact with the core systems below.
            </p>
          </div>

          {/* Interactive Core OS Dashboard */}
          <CyberDashboard />
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-28 relative z-10 border-t border-white/5 bg-gradient-to-b from-transparent to-[#070f15]/50">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Numbers grid with counters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-28">
            {STATS_ITEMS.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -4, borderColor: 'rgba(0, 245, 255, 0.2)', boxShadow: '0 8px 24px rgba(0, 245, 255, 0.04)' }}
                className="text-center p-8 md:p-10 glass-card rounded-2xl border border-white/5 transition-all"
              >
                <div className="text-5xl md:text-6xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-purple mb-4">
                  <Counter target={stat.targetNumber} suffix={stat.suffix} decimals={stat.targetNumber % 1 !== 0 ? 1 : 0} />
                </div>
                <p className="text-gray-400 font-sans font-bold text-xs tracking-widest uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Timeline Milestones Section */}
          <div ref={timelineRef} className="max-w-4xl mx-auto">
            <h3 className="font-display text-3xl md:text-5xl font-bold text-center text-white mb-20">
              The Evolution Timeline
            </h3>

            <div className="relative">
              
              {/* Vertical timeline spine */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/5">
                {/* Scroll-animated active connector path */}
                <motion.div 
                  className="w-full bg-gradient-to-b from-cyber-cyan via-cyber-purple to-transparent origin-top"
                  style={{ 
                    scaleY: scrollYProgress,
                    height: '100%'
                  }}
                />
              </div>

              {/* Milestones */}
              <div className="space-y-24 relative">
                {TIMELINE_MILESTONES.map((milestone, idx) => {
                  const isLeft = idx % 2 === 0;
                  const isPresent = milestone.status === 'present';
                  return (
                    <motion.div
                      key={milestone.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                      className={`flex items-center justify-between w-full ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                    >
                      {/* Left content block */}
                      <div className={`w-[45%] ${isLeft ? 'text-right pr-8' : 'text-left pl-8'}`}>
                        <span className={`inline-block font-mono text-xs px-2.5 py-1 rounded-full mb-3 ${
                          isPresent 
                            ? 'bg-cyber-purple/20 text-cyber-purple border border-cyber-purple/30' 
                            : 'bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20'
                        }`}>
                          STAGE 0{idx + 1}
                        </span>
                        <h4 className={`font-display text-lg md:text-2xl font-bold mb-2 ${isLeft ? 'text-cyber-cyan' : 'text-cyber-purple'}`}>
                          {milestone.title}
                        </h4>
                        <p className="text-gray-400 font-sans text-xs md:text-sm leading-relaxed font-light">
                          {milestone.description}
                        </p>
                      </div>

                      {/* Glowing indicator center node */}
                      <div className="relative z-10 flex items-center justify-center">
                        <motion.div
                          animate={isPresent ? { scale: [1, 1.3, 1] } : {}}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className={`w-8 h-8 rounded-full bg-[#050816] flex items-center justify-center border-4 ${
                            isPresent 
                              ? 'border-cyber-purple shadow-[0_0_15px_rgba(139,92,246,0.6)]' 
                              : 'border-cyber-cyan shadow-[0_0_12px_rgba(0,245,255,0.4)]'
                          }`}
                        >
                          <div className={`w-2.5 h-2.5 rounded-full ${isPresent ? 'bg-cyber-purple' : 'bg-cyber-cyan'}`} />
                        </motion.div>
                      </div>

                      {/* Matching layout placeholder to balance row */}
                      <div className="w-[45%]" />
                    </motion.div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Testimonials (Ascension Voices) */}
      <section id="about" className="py-24 relative z-10 border-t border-white/5 bg-cyber-dark/30">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
          
          <h2 className="font-display text-3xl md:text-5xl font-bold text-center text-white mb-20">
            Ascension Voices
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((voice) => (
              <motion.div
                key={voice.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                whileHover={{ y: -8, borderColor: 'rgba(0, 245, 255, 0.2)' }}
                className="glass-card p-8 rounded-2xl flex flex-col items-center text-center border border-white/5 transition-all duration-300"
              >
                {/* Profile Image with subtle cyan/purple border glow */}
                <div className={`w-20 h-20 rounded-full mb-6 overflow-hidden border-2 ${voice.borderColor} shadow-[0_0_15px_rgba(0,245,255,0.1)]`}>
                  <img
                    referrerPolicy="no-referrer"
                    src={voice.avatar}
                    alt={voice.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="text-gray-300 font-sans italic text-sm md:text-base leading-relaxed mb-6 font-light">
                  {voice.quote}
                </p>

                <div className="mt-auto">
                  <div className="font-display font-bold text-cyber-cyan">
                    {voice.name}
                  </div>
                  <div className="text-xs font-mono text-gray-500 tracking-wider uppercase mt-1">
                    {voice.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA upgrade panel (Ready to Upgrade Humanity?) */}
      <section id="contact" className="py-28 relative z-10 border-t border-white/5 overflow-hidden">
        
        {/* Glowing pulsing background layer */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-cyan/5 rounded-full blur-[140px] pointer-events-none animate-pulse" />

        <div className="w-full max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-12 md:p-20 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden"
          >
            {/* Soft grid decoration */}
            <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_40%,#050816_90%] opacity-20 pointer-events-none" />

            <h2 className="font-display text-4xl md:text-6xl font-extrabold text-white mb-6">
              Ready to Upgrade Humanity?
            </h2>

            <p className="font-sans text-base md:text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              Join the 15,000+ pioneers who have already ascended. The future isn't coming—it's here, and it is fully compatible with you.
            </p>

            {/* Interactive newsletter / lead signup form */}
            <form onSubmit={handleContactSubmit} className="max-w-md mx-auto mb-10 flex flex-col sm:flex-row gap-3">
              <input
                required
                type="email"
                placeholder="Enter neural telemetry email"
                className="flex-grow px-5 py-4 rounded-full bg-black/40 border border-white/10 text-white placeholder-gray-500 font-sans text-sm focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan transition-all"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="bg-cyber-cyan text-black font-display font-bold px-8 py-4 rounded-full text-sm transition-all shadow-[0_0_15px_rgba(0,245,255,0.3)] hover:brightness-110"
              >
                Get Started Now
              </motion.button>
            </form>

            <AnimatePresence>
              {contactSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-emerald-400 font-mono text-sm flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  Telemetry handshake secure. Our specialist will sync shortly.
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-center">
              <motion.a
                href="mailto:contact@cyborg-x.ai"
                whileHover={{ scale: 1.05, borderColor: 'rgba(255, 255, 255, 0.2)' }}
                className="mt-2 text-xs font-mono text-gray-500 hover:text-white border-b border-gray-600 pb-0.5"
              >
                Or contact directly: support@cyborg-x.ai
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#030611] border-t border-white/5 py-16 relative z-10">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Logo */}
          <div className="font-display text-xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-purple">
            CYBORG-X
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-8 font-sans text-sm font-medium">
            <a href="#home" className="text-gray-400 hover:text-cyber-cyan transition-colors">Privacy Policy</a>
            <a href="#home" className="text-gray-400 hover:text-cyber-cyan transition-colors">Terms of Service</a>
            <a href="#home" className="text-gray-400 hover:text-cyber-cyan transition-colors">Security Audit</a>
            <a href="#home" className="text-gray-400 hover:text-cyber-cyan transition-colors">System Status</a>
          </div>

          {/* Socials / Sharing links */}
          <div className="flex gap-4">
            <a
              href="https://share.cyborg-x.ai"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan/30 transition-all border border-white/5"
            >
              <Share2 className="w-4 h-4" />
            </a>
            <a
              href="https://world.cyborg-x.ai"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan/30 transition-all border border-white/5"
            >
              <Globe className="w-4 h-4" />
            </a>
            <a
              href="mailto:connect@cyborg-x.ai"
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan/30 transition-all border border-white/5"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="text-center mt-12 text-[10px] font-mono text-gray-600 tracking-widest uppercase">
          © {new Date().getFullYear()} CYBORG-X. ENGINEERED FOR THE FUTURE.
        </div>
      </footer>

      {/* Watch Demo Modal */}
      <AnimatePresence>
        {demoVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDemoVideoOpen(false)}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl bg-cyber-dark border border-cyber-cyan/25 rounded-2xl overflow-hidden shadow-2xl relative"
            >
              <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/40">
                <span className="font-display font-bold text-cyber-cyan text-sm tracking-wider uppercase">
                  CYBORG-X_DEMO_PROMPT.MP4
                </span>
                <button
                  onClick={() => setDemoVideoOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors text-xs font-mono"
                >
                  [CLOSE]
                </button>
              </div>
              <div className="relative aspect-video bg-black flex flex-col items-center justify-center text-center p-8">
                <BrainCircuit className="w-16 h-16 text-cyber-cyan animate-pulse mb-4" />
                <h3 className="font-display text-2xl font-bold text-white mb-2">
                  Initiating Holographic Demonstration
                </h3>
                <p className="text-sm text-gray-400 max-w-md mb-6 font-light">
                  A high-resolution tactical sync feed is booting up. Telemetry lines are connected directly to your preview stream.
                </p>
                <div className="w-64 bg-white/5 h-1.5 rounded-full overflow-hidden relative">
                  <motion.div
                    animate={{ left: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                    className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
