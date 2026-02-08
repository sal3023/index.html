
export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
  views: number;
  seoTitle?: string;
  seoDescription?: string;
  isAdSenseReady?: boolean;
  affiliateLink?: string;
  securityHash?: string;
  sentiment?: 'إيجابي' | 'محايد' | 'تحليلي' | 'نقد';
  strategicScore?: number; // من 1 إلى 100
  tags?: string[];
}

export interface Comment {
  id: string;
  postId: string;
  userName: string;
  text: string;
  date: string;
  isVerified?: boolean;
  ipHash?: string;
}

export enum ViewMode {
  HOME = 'HOME',
  POST = 'POST',
  EDITOR = 'EDITOR',
  DASHBOARD = 'DASHBOARD',
  SITEMAP = 'SITEMAP',
  BUSINESS_PLAN = 'BUSINESS_PLAN',
  WORKFLOW = 'WORKFLOW',
  POLICIES = 'POLICIES',
  CONTACT = 'CONTACT',
  ABOUT = 'ABOUT',
  TERMS = 'TERMS',
  SECURITY_AUTH = 'SECURITY_AUTH',
  SOCIAL_MANAGER = 'SOCIAL_MANAGER'
}
