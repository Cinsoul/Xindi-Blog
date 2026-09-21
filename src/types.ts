export interface TimelineItem {
  id: string;
  year: string;
  company: string;
  role: string;
  description: string;
  highlight?: boolean;
  category?: 'internship' | 'founder' | 'research';
}

export interface ValueCard {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description?: string;
}

export interface CareItem {
  id: string;
  title: string;
  subtitle: string;
  iconName: 'plane' | 'camera' | 'dumbbell' | 'coffee' | 'cat' | 'gamepad';
  tag?: string;
  detail?: string;
}

export interface ThoughtEssay {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  content: string;
}

export interface ProjectInfo {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  tags: string[];
  features: {
    icon: string;
    title: string;
    desc: string;
  }[];
  links?: {
    demo?: string;
    github?: string;
    docs?: string;
  };
}
