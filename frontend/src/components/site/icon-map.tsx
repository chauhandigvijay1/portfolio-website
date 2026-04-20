import { Blocks, Database, Mail, ShieldCheck, Waypoints } from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiExpress,
  SiGit,
  SiGithub,
  SiJavascript,
  SiJsonwebtokens,
  SiMongodb,
  SiNetlify,
  SiNextdotjs,
  SiNodedotjs,
  SiPostman,
  SiReact,
  SiRedis,
  SiRedux,
  SiRender,
  SiRazorpay,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

import type { TechnologyCategory } from "@/types/portfolio";

type IconComponent = IconType | typeof Blocks;

export const techIconMap: Record<string, IconComponent> = {
  reactjs: SiReact,
  nextjs: SiNextdotjs,
  javascript: SiJavascript,
  typescript: SiTypescript,
  nodejs: SiNodedotjs,
  expressjs: SiExpress,
  mongodb: SiMongodb,
  tailwindcss: SiTailwindcss,
  redux: SiRedux,
  jwt: SiJsonwebtokens,
  "rest-apis": Waypoints,
  git: SiGit,
  github: SiGithub,
  postman: SiPostman,
  render: SiRender,
  vercel: SiVercel,
  netlify: SiNetlify,
  redis: SiRedis,
  oauth: ShieldCheck,
  razorpay: SiRazorpay,
  nodemailer: Mail,
};

export const categoryLabelMap: Record<TechnologyCategory, string> = {
  frontend: "frontend",
  backend: "backend",
  data: "data",
  state: "state",
  deployment: "deployment",
  integration: "integrations",
  tooling: "tooling",
};

export const categoryToneMap: Record<TechnologyCategory, string> = {
  frontend: "text-sky-500 dark:text-sky-300",
  backend: "text-emerald-600 dark:text-emerald-300",
  data: "text-amber-600 dark:text-amber-300",
  state: "text-violet-600 dark:text-violet-300",
  deployment: "text-rose-600 dark:text-rose-300",
  integration: "text-cyan-600 dark:text-cyan-300",
  tooling: "text-zinc-700 dark:text-zinc-200",
};

export const fallbackTechIcon = Database;
