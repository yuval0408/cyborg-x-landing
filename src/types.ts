export interface FeatureCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  colSpan: string; // e.g. "md:col-span-8" or "md:col-span-4"
}

export interface TechnologyChip {
  name: string;
  category: string;
}

export interface StatItem {
  value: string;
  targetNumber: number;
  suffix: string;
  label: string;
}

export interface TimelineMilestone {
  id: string;
  title: string;
  description: string;
  status: 'past' | 'present' | 'future';
  color: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  quote: string;
  avatar: string;
  borderColor: string;
}
