import { FeatureCard, TechnologyChip, StatItem, TimelineMilestone, TestimonialItem } from './types';

export const FEATURE_CARDS: FeatureCard[] = [
  {
    id: 'f1',
    icon: 'BrainCircuit',
    title: 'Neural Intelligence',
    description: 'Real-time synaptic augmentation providing subconscious processing speeds that exceed biological limits by 10,000%.',
    colSpan: 'md:col-span-8',
  },
  {
    id: 'f2',
    icon: 'Eye',
    title: 'AI Vision',
    description: 'Multi-spectrum visual overlay with tactical analysis and thermal mapping.',
    colSpan: 'md:col-span-4',
  },
  {
    id: 'f3',
    icon: 'ShieldAlert',
    title: 'Security',
    description: 'Quantum-encrypted bio-locks preventing unauthorized access to neural nodes.',
    colSpan: 'md:col-span-4',
  },
  {
    id: 'f4',
    icon: 'Cpu',
    title: 'Brain-Link Interface',
    description: 'Non-invasive neural weaving that establishes a zero-latency connection between human consciousness and quantum processing arrays.',
    colSpan: 'md:col-span-8',
  },
  {
    id: 'f5',
    icon: 'Zap',
    title: 'Quantum Processing',
    description: 'Distributed computing power that solves complex variables before they reach the conscious mind.',
    colSpan: 'md:col-span-6',
  },
  {
    id: 'f6',
    icon: 'TrendingUp',
    title: 'Adaptive Learning',
    description: 'Systems that evolve with your personality, mimicking your natural cognitive patterns.',
    colSpan: 'md:col-span-6',
  },
];

export const TECHNOLOGY_CHIPS: TechnologyChip[] = [
  { name: 'AI', category: 'core' },
  { name: 'Machine Learning', category: 'core' },
  { name: 'Robotics', category: 'physical' },
  { name: 'Neural Networks', category: 'neuro' },
  { name: 'Computer Vision', category: 'vision' },
  { name: 'Quantum Computing', category: 'compute' },
  { name: 'Edge AI', category: 'compute' },
  { name: 'Bio Engineering', category: 'neuro' },
];

export const STATS_ITEMS: StatItem[] = [
  { value: '5M+', targetNumber: 5, suffix: 'M+', label: 'SYNAPTIC NODES' },
  { value: '0.2s', targetNumber: 0.2, suffix: 's', label: 'REACTION LATENCY' },
  { value: '128x', targetNumber: 128, suffix: 'x', label: 'MEMORY RECALL' },
  { value: '24/7', targetNumber: 24, suffix: '/7', label: 'Uptime' },
];

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    id: 't1',
    title: 'Prototype Alpha',
    description: 'Initial successful integration of external neural processing units with biological gray matter.',
    status: 'past',
    color: 'cyber-cyan',
  },
  {
    id: 't2',
    title: 'Neural Evolution',
    description: 'Deployment of the CYBORG-X Mesh, allowing global hive-mind computational sharing.',
    status: 'present',
    color: 'cyber-purple',
  },
  {
    id: 't3',
    title: 'Human Integration',
    description: 'Consumer-ready augmentation kits available for verified architectural enhancement.',
    status: 'past',
    color: 'cyber-cyan',
  },
  {
    id: 't4',
    title: 'The Future',
    description: 'Complete digital consciousness transcendence. Reality, redefined.',
    status: 'future',
    color: 'cyber-cyan',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    name: 'Julian Vance',
    role: 'Quantum Analyst',
    quote: '"The cognitive load enhancement is unlike anything I\'ve experienced. I can process multi-vector financial data as easily as breathing."',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEu75cR6ZA1IvOFAgsggiCvDGkHnBxgfutUnObjGk7akzNeGlLFzzrd8bsmb7QPo_1GC5-4mvmxAqnGaIfWdLFLw2k3FfSSXqVEm0M5qOuiqJerSAEjD7YyIayLE7BLiKDdU9b6iskaefEmsHkgU5EIvkrrgLeiw637OrHwUl5SxSZi7KF6cdlwNbWIU62W5dOyCMTUIAHLDjYTWqMgaXe2ReaMEhsCYGRVbAjTDtMWvzjad5kvBD_gma3cgdAVo69HA58rOiF-Zs',
    borderColor: 'border-[#00f5ff]/30',
  },
  {
    name: 'Sora Nakamoto',
    role: 'Neural Architect',
    quote: '"Integration was seamless. Within hours, I forgot where the machine ended and I began. My creativity has no bounds."',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkbMZUTKeiXAcEdfCab3UsDY6KDr14BbunA_hGqLeTd1olc2wZv4N5eKyh1nx-qs8cydG3TWM8oJT-YSRhG5EBj2tLFEu4sIrnEY2YzZ5oWlWQmxl6oQ4FVqmw7s5NbnDY1h1rG_IlM5AM61cwcaAU11J37mNJUh4nF9SuEZ-v9o4fZxguFlk-E3VSjy8uoqeDfVn5B8N9Bb9XZmIsdMBem9asiXvDM1m44_TOAJVnAPh-o4qHtpFlAvKHP0U4tfvah5HO5s1b2RI',
    borderColor: 'border-[#8b5cf6]/30',
  },
  {
    name: 'Dr. Aris Thorne',
    role: 'Bio-Ethics Lead',
    quote: '"CYBORG-X didn\'t just give me my life back; it gave me a future I couldn\'t have imagined. The clarity is absolute."',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEJGVr7iuIY6DD7BtIqfwkAlWa0z9Zath0_CMQNFI0TTZSnwCUNBgyulS62dpvq-K0dLyGWF7o_cbv_HeeXAZ2dMUQ3104QU6HbyEx7OjZRvquNmGVLPiqZJbmBOrlsEfekuerFyLuss8Rx4bqVUEMh02YnYBkH6BRMQC5u_j9raf6wIqNDNceYy3Vu1lEZj1wL7X5VDm7hvCVngxdMdLUijdqhhj6JIravVm31nmimWzSgDTRLzE7VgQ1UVQ0OEvNkbRIYDNg8nU',
    borderColor: 'border-[#00f5ff]/30',
  },
];
