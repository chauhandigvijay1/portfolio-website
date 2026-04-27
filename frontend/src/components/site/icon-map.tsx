import { Blocks, Database, Mail, ShieldCheck, Waypoints } from "lucide-react";
import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa6";
import {
  SiExpress,
  SiGit,
  SiGithub,
  SiJavascript,
  SiJsonwebtokens,
  SiLangchain,
  SiMongodb,
  SiNetlify,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiRedis,
  SiRedux,
  SiRender,
  SiRazorpay,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

type IconComponent = IconType | typeof Blocks;

export interface TechVisual {
  color: string;
  glow: string;
  icon: IconComponent;
}

export const techVisualMap: Record<string, TechVisual> = {
  reactjs: { icon: SiReact, color: "#61DAFB", glow: "rgba(97, 218, 251, 0.2)" },
  nextjs: { icon: SiNextdotjs, color: "#F8FAFC", glow: "rgba(248, 250, 252, 0.16)" },
  javascript: { icon: SiJavascript, color: "#F7DF1E", glow: "rgba(247, 223, 30, 0.18)" },
  typescript: { icon: SiTypescript, color: "#3178C6", glow: "rgba(49, 120, 198, 0.2)" },
  nodejs: { icon: SiNodedotjs, color: "#5FA04E", glow: "rgba(95, 160, 78, 0.18)" },
  expressjs: { icon: SiExpress, color: "#E5E7EB", glow: "rgba(229, 231, 235, 0.14)" },
  mongodb: { icon: SiMongodb, color: "#47A248", glow: "rgba(71, 162, 72, 0.18)" },
  tailwindcss: { icon: SiTailwindcss, color: "#38BDF8", glow: "rgba(56, 189, 248, 0.18)" },
  redux: { icon: SiRedux, color: "#764ABC", glow: "rgba(118, 74, 188, 0.2)" },
  jwt: { icon: SiJsonwebtokens, color: "#F59E0B", glow: "rgba(245, 158, 11, 0.18)" },
  "rest-apis": { icon: Waypoints, color: "#93C5FD", glow: "rgba(147, 197, 253, 0.18)" },
  git: { icon: SiGit, color: "#F05032", glow: "rgba(240, 80, 50, 0.2)" },
  github: { icon: SiGithub, color: "#F8FAFC", glow: "rgba(248, 250, 252, 0.16)" },
  postman: { icon: SiPostman, color: "#FF6C37", glow: "rgba(255, 108, 55, 0.18)" },
  render: { icon: SiRender, color: "#B7A6FF", glow: "rgba(183, 166, 255, 0.18)" },
  vercel: { icon: SiVercel, color: "#F8FAFC", glow: "rgba(248, 250, 252, 0.16)" },
  netlify: { icon: SiNetlify, color: "#14B8A6", glow: "rgba(20, 184, 166, 0.18)" },
  redis: { icon: SiRedis, color: "#DC382D", glow: "rgba(220, 56, 45, 0.2)" },
  oauth: { icon: ShieldCheck, color: "#60A5FA", glow: "rgba(96, 165, 250, 0.18)" },
  razorpay: { icon: SiRazorpay, color: "#3395FF", glow: "rgba(51, 149, 255, 0.2)" },
  nodemailer: { icon: Mail, color: "#7DD3FC", glow: "rgba(125, 211, 252, 0.18)" },
  python: { icon: SiPython, color: "#3776AB", glow: "rgba(55, 118, 171, 0.2)" },
  postgresql: { icon: SiPostgresql, color: "#4169E1", glow: "rgba(65, 105, 225, 0.18)" },
  langchain: { icon: SiLangchain, color: "#00C389", glow: "rgba(0, 195, 137, 0.18)" },
  aws: { icon: FaAws, color: "#FF9900", glow: "rgba(255, 153, 0, 0.18)" },
};

export const fallbackTechVisual: TechVisual = {
  icon: Database,
  color: "#CBD5F5",
  glow: "rgba(203, 213, 245, 0.18)",
};
