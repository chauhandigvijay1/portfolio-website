export type TechnologyCategory =
  | "frontend"
  | "backend"
  | "data"
  | "state"
  | "deployment"
  | "integration"
  | "tooling";

export interface Education {
  degree: string;
  duration: string;
  institution: string;
  cgpa: string;
}

export interface Profile {
  name: string;
  preferredName: string;
  role: string;
  tagline: string;
  intro: string;
  heroLines: string[];
  availability: string;
  journey: string[];
  education: Education;
  focusAreas: string[];
  email: string;
  githubUsername: string;
  github: string;
  linkedin: string;
  portfolio: string;
  x: string;
  instagram: string;
  resume: string;
  headshot: string;
}

export interface Highlight {
  label: string;
  value: string;
  note: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface Technology {
  slug: string;
  name: string;
  category: TechnologyCategory;
  summary: string;
  experience: string;
  implementedFeatures: string[];
  projectSlugs: string[];
}

export interface ProjectDeployment {
  frontend: string;
  backend: string;
  database: string;
}

export interface ProjectLinks {
  live: string;
  repository: string;
  api: string;
}

export interface Project {
  slug: string;
  name: string;
  label: string;
  summary: string;
  description: string;
  challenge: string;
  solution: string;
  palette: string[];
  stack: string[];
  highlights: string[];
  frontendDetails: string[];
  backendDetails: string[];
  architectureHighlights: string[];
  deployment: ProjectDeployment;
  links: ProjectLinks;
  images: string[];
}

export interface Certification {
  slug: string;
  title: string;
  issuer: string;
  description: string;
  credentialUrl: string;
  image: string;
}

export interface ContactSocial {
  label: string;
  href: string;
}

export interface ContactContent {
  heading: string;
  description: string;
  email: string;
  socials: ContactSocial[];
}

export interface PortfolioContent {
  profile: Profile;
  highlights: Highlight[];
  timeline: TimelineItem[];
  technologies: Technology[];
  projects: Project[];
  certifications: Certification[];
  contact: ContactContent;
}

export interface GithubRepo {
  name: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  stars: number;
  updatedAt: string;
  url: string;
}

export interface GithubEvent {
  id: string;
  type: string;
  repo: string;
  createdAt: string;
  action: string;
  detail: string;
}

export interface GithubUser {
  login: string;
  name: string;
  publicRepos: number;
  profileUrl: string;
}

export interface GithubSummary {
  user: GithubUser | null;
  topRepos: GithubRepo[];
  recentEvents: GithubEvent[];
}
