import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  X,
  Copy,
  Sun,
  Moon,
  Plus,
  Send,
  Home,
  Folder,
  Sliders,
  Workflow,
  UserCheck,
  Zap,
  Mail,
  Star,
  Radio,
  Search,
  RefreshCw,
  Globe,
  ShieldCheck,
  FileText,
  Sparkles,
  Clock,
  MapPin,
  Layers,
  Menu,
  Briefcase,
  Code2,
  User,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { resolveMemberPhoto } from './src/teamImages.js';

const Instagram = ({ className = "w-4 h-4", ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Linkedin = ({ className = "w-4 h-4", ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const Github = ({ className = "w-4 h-4", ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const WhatsApp = ({ className = "w-4 h-4", ...props }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const BRAND_CONFIG = {
  brandName: "GENZWORKS",
  shortName: "GZW®",
  roleTitle: "TECHNOLOGY & CREATIVE STUDIO",
  tagline: "We Build Digital. We Design Possibilities.",
  heroHeading: "We craft websites that hustle as hard as you do",
  heroSubheading: "We design innovative solutions that captivate audiences, and every interaction inspires action.",
  heroText: "Ideas are everywhere. What makes the difference is how you bring them to life. GenzWorks is a technology and creative studio where development meets design, and imagination meets execution.",
  location: "Coimbatore, TN — Working Worldwide",
  email: "genzworks7@gmail.com",
  phone: "+91 87542 77982",
  phone2: "+91 95669 80426",
  instagram: "@gen__z__works",
  instagramUrl: "https://www.instagram.com/gen__z__works/",
  githubUrl: "https://github.com/genzworks7-boys",
  availability: "3 Open slots",
  year: "2026®",
  // Google Apps Script Web App Deployment URL for saving inquiries to Google Sheets:
  googleSheetScriptUrl: "https://script.google.com/macros/s/AKfycbxc76o6m2v5zpxyZmFV0xl3KsGt6x5-A1BzHG9XZtASBqyOtKUkuoJXxaerJLhJ0buU/exec",
  // Google Apps Script Web App Deployment URL for Join Our Team applications:
  joinTeamScriptUrl: "https://script.google.com/macros/s/AKfycbxc76o6m2v5zpxyZmFV0xl3KsGt6x5-A1BzHG9XZtASBqyOtKUkuoJXxaerJLhJ0buU/exec"
};

const STUDIO_TOOLS = [
  {
    name: "Figma",
    category: "UI/UX & Systems",
    group: "Design",
    accent: "#1ABCFE",
    proficiency: "Design Systems",
    svg: (
      <svg viewBox="0 0 38 57" className="w-5 h-5">
        <path fill="#1ABCFE" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
        <path fill="#0ACF83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" />
        <path fill="#FF7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" />
        <path fill="#F24E1E" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" />
        <path fill="#A259FF" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" />
      </svg>
    )
  },
  {
    name: "Framer",
    category: "Interactive Web",
    group: "Frontend",
    accent: "#0066FF",
    proficiency: "Motion & Sites",
    svg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
      </svg>
    )
  },
  {
    name: "React",
    category: "Frontend Architecture",
    group: "Frontend",
    accent: "#61DAFB",
    proficiency: "SPA & UI Logic",
    svg: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-5 h-5">
        <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
        <g stroke="#61dafb" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    )
  },
  {
    name: "Next.js",
    category: "Full-Stack Framework",
    group: "Frontend",
    accent: "#FFFFFF",
    proficiency: "SSR & App Router",
    svg: (
      <svg viewBox="0 0 180 180" className="w-5 h-5">
        <circle cx="90" cy="90" r="90" className="fill-black dark:fill-white" />
        <path
          d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
          className="fill-white dark:fill-black"
        />
        <rect x="115" y="54" width="12" height="72" className="fill-white dark:fill-black" />
      </svg>
    )
  },
  {
    name: "Tailwind CSS",
    category: "Styling Engine",
    group: "Frontend",
    accent: "#38BDF8",
    proficiency: "Design Tokens",
    svg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#38BDF8">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    )
  },
  {
    name: "Node.js",
    category: "Backend Runtime",
    group: "Backend & Cloud",
    accent: "#5FA04E",
    proficiency: "REST & Realtime APIs",
    svg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#5FA04E">
        <path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l7.44 4.3c.46.26 1.04.26 1.5 0l7.44-4.3c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.13-.51-.2-.78-.2z" />
      </svg>
    )
  },
  {
    name: "Adobe Photoshop",
    category: "Visual & Poster Art",
    group: "Design",
    accent: "#31A8FF",
    proficiency: "Commercial Retouch",
    svg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <rect width="24" height="24" rx="4" fill="#001E36" />
        <text x="4" y="17" fill="#31A8FF" fontSize="12" fontWeight="800" fontFamily="sans-serif">Ps</text>
      </svg>
    )
  },
  {
    name: "Adobe Illustrator",
    category: "Brand & Vectors",
    group: "Design",
    accent: "#FF9A00",
    proficiency: "Logo & Identity",
    svg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <rect width="24" height="24" rx="4" fill="#330000" />
        <text x="5" y="17" fill="#FF9A00" fontSize="12" fontWeight="800" fontFamily="sans-serif">Ai</text>
      </svg>
    )
  },
  {
    name: "Premiere Pro",
    category: "Video Editing",
    group: "Motion & Media",
    accent: "#9999FF",
    proficiency: "Cinematic Cuts",
    svg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <rect width="24" height="24" rx="4" fill="#00005B" />
        <text x="5" y="17" fill="#9999FF" fontSize="12" fontWeight="800" fontFamily="sans-serif">Pr</text>
      </svg>
    )
  },
  {
    name: "After Effects",
    category: "Motion Graphics",
    group: "Motion & Media",
    accent: "#D9FF3F",
    proficiency: "2D/3D Visual FX",
    svg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <rect width="24" height="24" rx="4" fill="#00005B" />
        <text x="4" y="17" fill="#9999FF" fontSize="12" fontWeight="800" fontFamily="sans-serif">Ae</text>
      </svg>
    )
  },
  {
    name: "GitHub",
    category: "Version Control",
    group: "Backend & Cloud",
    accent: "#A1A1AA",
    proficiency: "CI/CD Workflows",
    svg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
      </svg>
    )
  },
  {
    name: "Cloudflare",
    category: "CDN & Edge Security",
    group: "Backend & Cloud",
    accent: "#F38020",
    proficiency: "Zero-Downtime",
    svg: (
      <svg viewBox="0 0 46 46" className="w-6 h-6">
        <path fill="#F38020" d="M31.612 33.35c.258-.997.153-1.884-.309-2.565-.412-.628-1.135-.994-2.012-.994l-16.605-.21a.28.28 0 0 1-.258-.156c-.052-.104-.052-.21-.052-.313.052-.157.207-.314.362-.314l16.76-.21c2.012-.104 4.126-1.726 4.899-3.713l.979-2.511c.052-.106.052-.211.052-.315-1.081-4.971-5.413-8.632-10.622-8.632-4.798 0-8.87 3.14-10.314 7.48a4.66 4.66 0 0 0-3.456-.94c-2.319.208-4.126 2.092-4.383 4.446-.052.629 0 1.204.103 1.725C2.99 26.235 0 29.375 0 33.195c0 .364.052.68.052 1.044 0 .158.153.263.308.263h30.634c.154 0 .36-.105.413-.314z" />
        <path fill="#FAAD3F" d="M36.873 22.52h-.464c-.104 0-.207.104-.259.21l-.67 2.3c-.258.996-.154 1.884.31 2.564.412.629 1.134.993 2.012.993l3.556.21c.103 0 .207.053.258.158.052.104.052.209.052.313-.052.157-.207.314-.36.314l-3.661.21c-2.012.104-4.127 1.726-4.901 3.713l-.257.68c-.051.106.05.263.205.263H45.33c.155 0 .31-.105.31-.262.205-.786.36-1.622.36-2.511-.051-5.022-4.126-9.156-9.126-9.156" />
      </svg>
    )
  }
];

const FLOATING_3D_ICONS = [
  {
    id: 'center-framer',
    name: 'Framer — Interactive Web',
    role: 'High-craft motion & interactive web publishing',
    href: '#works',
    isCenter: true,
    depth: 1.5,
    pos: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30',
    baseRotate: 'rotate-[-8deg]',
    floatDelay: '0s',
    bgClass: 'bg-gradient-to-br from-[#2E8BFF] via-[#0066FF] to-[#0044CC]',
    svg: (
      <svg viewBox="0 0 24 24" className="w-11 h-11 sm:w-14 sm:h-14 fill-white drop-shadow-md">
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
      </svg>
    )
  },
  {
    id: 'figma',
    name: 'Figma — UI/UX & Systems',
    role: 'Collaborative interface architecture & design tokens',
    href: '#works',
    depth: 0.9,
    pos: 'left-[34%] sm:left-[37%] top-[6%] sm:top-[6%] z-20',
    baseRotate: 'rotate-[12deg]',
    floatDelay: '0.4s',
    bgClass: 'bg-gradient-to-br from-[#2C2C32] to-[#18181B]',
    svg: (
      <svg viewBox="0 0 38 57" className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow">
        <path fill="#1ABCFE" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
        <path fill="#0ACF83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" />
        <path fill="#FF7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" />
        <path fill="#F24E1E" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" />
        <path fill="#A259FF" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" />
      </svg>
    )
  },
  {
    id: 'react',
    name: 'React — Frontend Architecture',
    role: 'Component-driven interactive web applications',
    href: '#works',
    depth: 1.15,
    pos: 'left-[13%] sm:left-[19%] top-[23%] sm:top-[24%] z-20',
    baseRotate: 'rotate-[-14deg]',
    floatDelay: '1.1s',
    bgClass: 'bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364]',
    svg: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1.15" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    )
  },
  {
    id: 'nextjs',
    name: 'Next.js — Full-Stack Framework',
    role: 'Production-grade SSR, routing & API performance',
    href: '#works',
    depth: 0.75,
    pos: 'left-[8%] sm:left-[14%] top-[55%] sm:top-[54%] z-20',
    baseRotate: 'rotate-[-6deg]',
    floatDelay: '0.7s',
    bgClass: 'bg-gradient-to-br from-[#18181B] to-[#000000]',
    svg: (
      <svg viewBox="0 0 180 180" className="w-8 h-8 sm:w-9 sm:h-9">
        <path
          fill="#FFFFFF"
          d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
        />
        <rect x="115" y="54" width="12" height="72" fill="#FFFFFF" />
      </svg>
    )
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS — Styling Engine',
    role: 'Responsive utility-first design systems',
    href: '#works',
    depth: 1.25,
    pos: 'left-[33%] sm:left-[37%] top-[71%] sm:top-[70%] z-20',
    baseRotate: 'rotate-[-15deg]',
    floatDelay: '1.5s',
    bgClass: 'bg-gradient-to-br from-[#38BDF8] to-[#0284C7]',
    svg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-9 sm:h-9 fill-white drop-shadow">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    )
  },
  {
    id: 'nodejs',
    name: 'Node.js — Backend Runtime',
    role: 'Scalable server logic, databases & APIs',
    href: '#services',
    depth: 1.0,
    pos: 'right-[23%] sm:right-[26%] top-[62%] sm:top-[62%] z-20',
    baseRotate: 'rotate-[8deg]',
    floatDelay: '0.9s',
    bgClass: 'bg-gradient-to-br from-[#68A063] to-[#3C873A]',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8 fill-white drop-shadow">
        <path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l7.44 4.3c.46.26 1.04.26 1.5 0l7.44-4.3c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.13-.51-.2-.78-.2z" />
      </svg>
    )
  },
  {
    id: 'photoshop',
    name: 'Adobe Creative Suite (Ps / Ai / Pr)',
    role: 'Commercial poster art, branding & video post-production',
    href: '#services',
    depth: 1.2,
    pos: 'right-[15%] sm:right-[20%] top-[14%] sm:top-[15%] z-20',
    baseRotate: 'rotate-[-12deg]',
    floatDelay: '0.25s',
    bgClass: 'bg-gradient-to-br from-[#001E36] to-[#000B14]',
    svg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-9 sm:h-9">
        <text x="3.5" y="16.5" fill="#31A8FF" fontSize="13" fontWeight="800" fontFamily="sans-serif">Ps</text>
      </svg>
    )
  },
  {
    id: 'github',
    name: 'GitHub & Cloudflare DevOps',
    role: 'Version control, CI/CD & cloud deployment',
    href: '#about',
    depth: 0.85,
    pos: 'right-[9%] sm:right-[14%] top-[43%] sm:top-[42%] z-20',
    baseRotate: 'rotate-[14deg]',
    floatDelay: '1.3s',
    bgClass: 'bg-gradient-to-br from-[#27272A] to-[#09090B]',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8 fill-white">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
      </svg>
    )
  }
];

const CRAFT_TICKER = [
  "Web Development & Web Applications",
  "Visual Identity & Brand Assets",
  "Commercial Poster Design",
  "College & Academic Project Mentorship",
  "Video Editing & Multimedia Storytelling",
  "Purposeful Content & Copywriting",
  "Responsive UI/UX Engineering",
  "DevOps & Smooth Deployment"
];

const SHARP_CRACKERS_STACK = [
  {
    id: "01",
    badge: "01 // LIVE STOREFRONT",
    title: "SHARP CRACKERS — Direct From Sivakasi",
    subtitle: "First Flagship Client Launch • sharpcrackers.com",
    desc: "Full-stack factory-direct Sivakasi fireworks e-commerce platform engineered for high-volume seasonal traffic, featuring festive dark-mode UI and instant order booking.",
    tags: ["https://sharpcrackers.com", "Factory-Direct", "100% Green Crackers"],
    image: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fsharpcrackers.com?w=1600",
    fallbackImage: "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?auto=format&fit=crop&w=1600&q=85",
    isLiveBrowser: true
  },
  {
    id: "02",
    badge: "02 // BILINGUAL CATALOG",
    title: "14 Categories & 76+ Bilingual Products",
    subtitle: "Seamless Tamil & English Shopping Experience",
    desc: "Structured product discovery across Sparklers (கம்பி மத்தாப்பு), Flower Pots (பூந்தொட்டி), Ground Chakkars (சக்கரம்), Sky Shots, and Family Gift Boxes.",
    tags: ["Tamil & English UI", "14 Categories", "76+ Crackers"],
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=85"
  },
  {
    id: "03",
    badge: "03 // SMART CART & PRICING",
    title: "Up to 75% Factory Savings & Dynamic Cart",
    subtitle: "Real-Time Discount & Bulk Estimate Calculator",
    desc: "Interactive price-list table with instant quantity steppers, automated MRP vs. factory-direct savings calculation, and one-click PDF/WhatsApp order summary.",
    tags: ["Up to 75% Off", "Instant Cart Drawer", "Bulk Estimator"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85"
  },
  {
    id: "04",
    badge: "04 // GREEN CERTIFICATION & SAFETY",
    title: "100% CSIR-NEERI Certified Green Fireworks",
    subtitle: "Eco-Conscious Quality & Direct Dispatch Logistics",
    desc: "Built-in trust architecture showcasing certified low-emission Sivakasi fireworks, safe packaging standards, and Tamil Nadu & pan-India transport tracking.",
    tags: ["CSIR-NEERI Certified", "Safe Packaging", "Express Dispatch"],
    image: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?auto=format&fit=crop&w=1600&q=85"
  },
  {
    id: "05",
    badge: "05 // ADMIN & ORDER MANAGEMENT",
    title: "Custom Admin Portal & Inventory Control",
    subtitle: "Built for Peak Diwali Rush Operations",
    desc: "Dedicated backend dashboard allowing the Sharp Crackers team to update live stock status, adjust seasonal discounts, and process customer enquiries effortlessly.",
    tags: ["Admin Dashboard", "Live Inventory", "Coimbatore & Sivakasi"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=85"
  }
];

const WHY_GENZWORKS_PILLARS = [
  {
    title: "Creativity with Direction",
    desc: "We combine fresh ideas with thoughtful execution to create work that is visually distinctive and aligned with your goals.",
    tags: ["Visual Strategy", "Art Direction", "Brand Systems", "UI/UX Polish", "Typography"],
    details: "Every creative decision is anchored in purpose—ensuring your digital presence doesn't just look modern, but communicates clearly and converts visitors into long-term clients."
  },
  {
    title: "Technology That Makes Sense",
    desc: "We focus on practical digital solutions that prioritize functionality, usability, and the needs of real people.",
    tags: ["Modern Web Stack", "Responsive Architecture", "Clean Code", "Fast Load Times", "Scalable Logic"],
    details: "We select reliable, modern frameworks and build clean architectures so your product stays fast, maintainable, and effortless for real users across all devices."
  },
  {
    title: "Multiple Skills. One Team.",
    desc: "From development and design to multimedia, research, and deployment, we deliver complete solutions under one roof.",
    tags: ["Full-Stack Dev", "Graphic Design", "Video Editing", "Copywriting", "Cloud Deployment"],
    details: "Instead of juggling disconnected freelancers, you get a unified studio squad where designers, developers, editors, and researchers collaborate seamlessly from day one."
  },
  {
    title: "Collaboration at Every Step",
    desc: "We value open communication, regular progress feedback, and shared decision-making throughout the project life.",
    tags: ["Transparent Sprints", "Live Previews", "Direct Communication", "Iterative Feedback"],
    details: "You are never left guessing about project status. We share interactive staging links, welcome your feedback early, and refine every milestone together."
  },
  {
    title: "Quality in Every Detail",
    desc: "We pay close attention to functionality, visual consistency, content clarity, and testing to hit every requirement.",
    tags: ["Cross-Browser QA", "Edge-Case Testing", "Pixel Consistency", "Performance Audits"],
    details: "Before any project goes live, our dedicated QA and research team reviews responsiveness, micro-interactions, and system stability across devices."
  },
  {
    title: "Always Learning & Evolving",
    desc: "We continuously explore new tools and techniques to constantly refine our creative and technical capabilities.",
    tags: ["Framer Motion", "Modern UI Trends", "Workflow Automation", "Next-Gen Tooling"],
    details: "Digital standards move fast. We stay ahead of emerging design systems, animation physics, and engineering practices so your brand always feels ahead of the curve."
  }
];

const PROCESS_STEPS = [
  {
    num: ".01",
    tag: "DISCOVER & DEFINE",
    title: "Understand the vision before building",
    desc: "We begin by understanding your goals, target audience, requirements, priorities, and expectations to establish a clear shared direction.",
    deliverables: ["Goal Alignment", "Requirement Mapping", "Target Audience Focus", "Scope Baseline"]
  },
  {
    num: ".02",
    tag: "PLAN & PRIORITIZE",
    title: "Turn ideas into achievable steps",
    desc: "We break the project into manageable tasks, prioritize essential features, and establish clear short-term milestones.",
    deliverables: ["Task Breakdown", "Feature Priority", "Milestone Mapping", "Flexible Roadmap"]
  },
  {
    num: ".03",
    tag: "DESIGN & BUILD",
    title: "Create, develop, and bring to life",
    desc: "Our team translates concepts into functional web features, visual designs, video edits, or content deliverables with steady momentum.",
    deliverables: ["UI/UX Prototyping", "Clean Code Development", "Visual Asset Crafting", "Content Drafts"]
  },
  {
    num: ".04",
    tag: "REVIEW & REFINE",
    title: "Feedback makes the work better",
    desc: "We share progress regularly, gather your input, refine visual designs, tune backend functionality, and polish every detail.",
    deliverables: ["Progress Demos", "Feedback Integration", "Design Refinements", "Feature Iterations"]
  },
  {
    num: ".05",
    tag: "TEST & VALIDATE",
    title: "Check the details before launch",
    desc: "We evaluate the work against requirements including functional testing, responsive layout checks, content reviews, and performance validation.",
    deliverables: ["Responsive Testing", "Cross-Browser QA", "Content Consistency", "Technical Audit"]
  },
  {
    num: ".06",
    tag: "DELIVER & EVOLVE",
    title: "Launch with confidence. Improve with purpose.",
    desc: "We prepare final deliverables and handle deployment. Post-launch maintenance and continuous enhancements are planned as needed.",
    deliverables: ["Final Handoff", "Live Deployment", "System Documentation", "Post-Launch Plan"]
  }
];

const INITIAL_TEAM = [
  {
    id: "team-1",
    num: "1",
    hashtag: "#teamlead",
    funkyBgRole: "TEAM LEAD",
    role: "Team Lead | Design & Development",
    name: "Mohammed Ali Khan",
    desc: "Leads project direction, coordinates team collaboration, and contributes to design and development, keeping work aligned with project goals.",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85",
    socials: { linkedin: "https://www.linkedin.com/in/mohammed-ali-khan-07b59132b?utm_source=share_via&utm_content=profile&utm_medium=member_android", github: "https://github.com/mohammedali2612", instagram: "https://www.instagram.com/mohammedalikhan_._.__?srtk=MXEyZ2JzbWM2NnE2dw==" }
  },
  {
    id: "team-2",
    num: "2",
    hashtag: "#backend",
    funkyBgRole: "BACKEND",
    role: "Backend Engineering | Development Team",
    name: "Paul Joel",
    desc: "Contributes to backend engineering and development, supporting underlying logic, database handling, and application functionality.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85",
    socials: { linkedin: "https://www.linkedin.com/in/paul-joel-18081b363", github: "https://github.com/pauljoelpauljoel", instagram: "https://www.instagram.com/ajoel_0501?rpxt=MW9xam9tcnBjM2JpeA==" }
  },
  {
    id: "team-3",
    num: "3",
    hashtag: "#fullstack",
    funkyBgRole: "FULLSTACK",
    role: "Design & Development Team",
    name: "Esakki",
    desc: "Works across design and software development, helping transform initial concepts into functional, user-friendly digital experiences.",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=85",
    socials: { linkedin: "https://www.linkedin.com/in/esakki-b-10574b32b?utm_source=share_via&utm_content=profile&utm_medium=member_android", github: "https://github.com/esakkisky-spec", instagram: "https://www.instagram.com/esakki_here?dlrf=MW1tNWd5bG1sdTJ3Yw==" }
  },
  {
    id: "team-4",
    num: "4",
    hashtag: "#qalead",
    funkyBgRole: "QA LEAD",
    role: "Quality Assurance & Research Team",
    name: "Kishore",
    desc: "Contributes to technical research, quality checks, and structured project reviews to identify edge issues and polish final outputs.",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85",
    socials: { linkedin: "https://www.linkedin.com/in/kishore-shanthi-b17a2232b?utm_source=share_via&utm_content=profile&utm_medium=member_android", github: "https://github.com/new1micro-coder", instagram: "https://www.instagram.com/2527kishore/" }
  },
  {
    id: "team-5",
    num: "5",
    hashtag: "#researcher",
    funkyBgRole: "RESEARCH",
    role: "Quality Assurance & Research Team",
    name: "Pranav Deepak",
    desc: "Supports research, systematic testing, and usability evaluation to maintain visual consistency and elevate overall work quality.",
    photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=900&q=85",
    socials: { linkedin: "https://www.linkedin.com/in/pranav-deepak-926936421?utm_source=share_via&utm_content=profile&utm_medium=member_android", github: "https://github.com/pranavdeepak4142", instagram: "https://www.instagram.com/__draxxz_?utm_source=qr&dlrf=bmFwbzcyY3g1ODR3" }
  },
  {
    id: "team-6",
    num: "6",
    hashtag: "#multimedia",
    funkyBgRole: "CREATIVE",
    role: "Multimedia & Creative Media Team",
    name: "Muthu Sanjay Kumar",
    desc: "Focuses on multimedia production, visual storytelling, video editing, and creative post-production assets.",
    photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=900&q=85",
    socials: { linkedin: "https://www.linkedin.com/in/muthu-sanjay-kumar-5967a6317?utm_source=share_via&utm_content=profile&utm_medium=member_android", github: "https://github.com/jotaro502", instagram: "https://www.instagram.com/x3ko.ae?mdxt=amp2d2l4c2U2NDl6" }
  },
  {
    id: "team-7",
    num: "7",
    hashtag: "#devops",
    funkyBgRole: "DEVOPS",
    role: "DevOps & Deployment Team",
    name: "Jayasolomon",
    desc: "Supports deployment workflows, server environments, and release preparation, helping move completed projects smoothly to launch.",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=85",
    socials: { linkedin: "https://www.linkedin.com/in/jayasolomon-k-634488319", github: "https://github.com/jayasolomon-dev", instagram: "https://www.instagram.com/_itz_santa_official_/" }
  }
];

const CAREER_ROLES = [
  'Full-Stack Developer',
  'Frontend Engineer',
  'Backend Engineer',
  'UI/UX Designer',
  'DevOps & Cloud',
  'QA & Research',
  'Video & Multimedia',
  'AI & Data Science',
  'Other Creative'
];

const DETAILED_SERVICES = [
  {
    num: "01",
    title: "Web Development",
    subtitle: "Build your digital presence.",
    desc: "We create modern, responsive websites and web applications that combine thoughtful interfaces with practical functionality and reliable implementation.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=85",
    macTag: "macOS Pacific Blue",
    tabGradTop: "#50A6FF",
    tabGradMid: "#1B84FF",
    tabGradBot: "#0B5ED7",
    bodyGradient: "linear-gradient(180deg, #1B84FF 0%, #0D6EFD 42%, #084298 100%)",
    outerBg: "bg-gradient-to-b from-[#0E1F42] via-[#08122A] to-[#040817]",
    outerBorder: "border-blue-500/35 hover:border-blue-400",
    accentColor: "#D0E4FF",
    actionColor: "#BFDBFE",
    glow: "rgba(27, 132, 255, 0.55)",
    textColor: "text-white",
    subTextColor: "text-white/85",
    tagBg: "bg-white/18 text-white border-white/30 hover:bg-white/28",
    bullets: ["Business Websites", "Portfolio Websites", "Landing Pages", "Full-Stack Web Apps"]
  },
  {
    num: "02",
    title: "Graphic Design",
    subtitle: "Visuals that communicate. Designs that connect.",
    desc: "We transform ideas into compelling visual assets through typography, color composition, and deliberate creative direction.",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1000&q=85",
    macTag: "macOS Sunset Coral",
    tabGradTop: "#FFA057",
    tabGradMid: "#FF661F",
    tabGradBot: "#D64200",
    bodyGradient: "linear-gradient(180deg, #FF661F 0%, #E84D0A 42%, #B83400 100%)",
    outerBg: "bg-gradient-to-b from-[#401705] via-[#290E02] to-[#140600]",
    outerBorder: "border-orange-500/35 hover:border-orange-400",
    accentColor: "#FFE2D1",
    actionColor: "#FFEDD5",
    glow: "rgba(255, 102, 31, 0.55)",
    textColor: "text-white",
    subTextColor: "text-white/85",
    tagBg: "bg-white/18 text-white border-white/30 hover:bg-white/28",
    bullets: ["Brand Identity & Assets", "Social Media Creatives", "Logos & Vector Marks", "Banners & Flyers"]
  },
  {
    num: "03",
    title: "Commercial Poster Design",
    subtitle: "Make the first impression count.",
    desc: "We create visually engaging promotional posters that combine bold visuals, clear messaging, and purposeful layouts.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=85",
    macTag: "macOS Royal Purple",
    tabGradTop: "#BF7EFF",
    tabGradMid: "#8E35F7",
    tabGradBot: "#6712CE",
    bodyGradient: "linear-gradient(180deg, #8E35F7 0%, #7219DE 42%, #520CA8 100%)",
    outerBg: "bg-gradient-to-b from-[#2B0A4D] via-[#1B0531] to-[#0D0218]",
    outerBorder: "border-purple-500/35 hover:border-purple-400",
    accentColor: "#EEDBFF",
    actionColor: "#EDE9FE",
    glow: "rgba(142, 53, 247, 0.55)",
    textColor: "text-white",
    subTextColor: "text-white/85",
    tagBg: "bg-white/18 text-white border-white/30 hover:bg-white/28",
    bullets: ["Product Advertisements", "Event & Conference Posters", "Marketing Campaigns", "Launch Announcements"]
  },
  {
    num: "04",
    title: "Academic Mentorship",
    subtitle: "Turn academic concepts into reality.",
    desc: "We provide technical mentorship, architecture guidance, prototype development, and code reviews for college and academic capstone projects.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=85",
    macTag: "macOS Mint Emerald",
    tabGradTop: "#44E9A7",
    tabGradMid: "#10B981",
    tabGradBot: "#047857",
    bodyGradient: "linear-gradient(180deg, #10B981 0%, #059669 42%, #046345 100%)",
    outerBg: "bg-gradient-to-b from-[#083021] via-[#041E15] to-[#020F0A]",
    outerBorder: "border-emerald-500/35 hover:border-emerald-400",
    accentColor: "#C8F6E2",
    actionColor: "#D1FAE5",
    glow: "rgba(16, 185, 129, 0.55)",
    textColor: "text-white",
    subTextColor: "text-white/85",
    tagBg: "bg-white/18 text-white border-white/30 hover:bg-white/28",
    bullets: ["Architecture & Planning", "Full-Stack Prototypes", "Documentation & Viva Prep", "Code Review"]
  },
  {
    num: "05",
    title: "Video & Multimedia",
    subtitle: "Dynamic visual storytelling.",
    desc: "We craft cinematic edits, promotional teasers, social media reels, and motion graphic assets that captivate viewers and retain attention.",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1000&q=85",
    macTag: "macOS Hot Rose",
    tabGradTop: "#FF6FA4",
    tabGradMid: "#F43F5E",
    tabGradBot: "#BE123C",
    bodyGradient: "linear-gradient(180deg, #F43F5E 0%, #E11D48 42%, #9F1239 100%)",
    outerBg: "bg-gradient-to-b from-[#3D0A1B] via-[#260510] to-[#130208]",
    outerBorder: "border-rose-500/35 hover:border-rose-400",
    accentColor: "#FFE0EB",
    actionColor: "#FFE4E6",
    glow: "rgba(244, 63, 94, 0.55)",
    textColor: "text-white",
    subTextColor: "text-white/85",
    tagBg: "bg-white/18 text-white border-white/30 hover:bg-white/28",
    bullets: ["Cinematic Cuts & Reels", "Motion Graphics & VFX", "Brand Teasers", "Audio Engineering"]
  },
  {
    num: "06",
    title: "Content & Copywriting",
    subtitle: "Words that convert and inspire.",
    desc: "We craft deliberate website messaging, brand positioning, and clear value propositions that articulate your offering and drive conversion.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=85",
    macTag: "macOS Warm Amber",
    tabGradTop: "#FFCD47",
    tabGradMid: "#F59E0B",
    tabGradBot: "#B45309",
    bodyGradient: "linear-gradient(180deg, #F59E0B 0%, #D97706 42%, #92400E 100%)",
    outerBg: "bg-gradient-to-b from-[#3D2205] via-[#261502] to-[#130A00]",
    outerBorder: "border-amber-500/35 hover:border-amber-400",
    accentColor: "#FEF0C7",
    actionColor: "#FEF3C7",
    glow: "rgba(245, 158, 11, 0.55)",
    textColor: "text-white",
    subTextColor: "text-white/85",
    tagBg: "bg-white/18 text-white border-white/30 hover:bg-white/28",
    bullets: ["Website Copywriting", "Value Propositions", "Brand Tone & Voice", "Content Strategy"]
  }
];

const LEGAL_DOCS = {
  terms: {
    badge: "LEGAL // TERMS & CONDITIONS",
    title: "Terms of Use & Studio Service Agreement",
    updated: "Effective Date: October 28, 2026",
    summary: "These Terms & Conditions govern your access to the GENZWORKS website and any web development, design, multimedia, or academic mentorship services provided by GENZWORKS Studio (Coimbatore, Tamil Nadu, India).",
    sections: [
      {
        heading: "1. Studio Scope of Services",
        body: "GENZWORKS provides custom Web Development & Full-Stack Web Applications (using React, Next.js, Node.js, Tailwind CSS, and Framer), Visual Identity & Graphic Design, Commercial Poster Design, Video Editing & Motion Graphics, Content Writing, and College/Academic Project Mentorship. Every client engagement is governed by a mutually agreed project proposal or sprint scope outlining specific deliverables, timelines, and milestones."
      },
      {
        heading: "2. Project Workflow, Revisions & Client Collaboration",
        body: "Our 6-step studio process (Discover, Plan, Design & Build, Review & Refine, Test & Validate, Deliver & Evolve) relies on timely client feedback. Each milestone includes up to two (2) structured revision rounds unless otherwise specified in writing. Additional scope changes or feature additions requested after design sign-off are billed separately."
      },
      {
        heading: "3. Intellectual Property & Portfolio Rights",
        body: "Upon full and final settlement of all project invoices, ownership of the final approved client-specific deliverables (such as custom website code, brand logos, or commercial posters) transfers to the client. GENZWORKS retains ownership of pre-existing reusable studio code libraries, frameworks, and internal tooling, and reserves the right to showcase completed work (such as our flagship Sharp Crackers launch) in our studio portfolio and case studies."
      },
      {
        heading: "4. Academic & College Project Mentorship Ethics",
        body: "Our College & Academic Project Development service is designed strictly for technical mentorship, architectural guidance, prototype implementation support, and code review. Students are responsible for understanding the codebase, documentation, and complying with their respective university or institutional academic integrity guidelines."
      },
      {
        heading: "5. Payment Terms, Hosting & Third-Party Tools",
        body: "Projects typically require an upfront commencement deposit (50%) prior to sprint kickoff and balance settlement prior to final production deployment or source-code handoff. Costs for third-party services—including domain registration, cloud hosting, paid font licenses, or external APIs—are borne directly by the client unless bundled in a maintenance plan."
      },
      {
        heading: "6. Limitation of Liability & Governing Law",
        body: "All digital products undergo rigorous cross-browser and responsive QA testing before launch. However, GENZWORKS shall not be liable for indirect damages, third-party hosting outages, or modifications made to code by external parties post-handoff. These Terms are governed by the laws of India, with exclusive jurisdiction in the courts of Coimbatore, Tamil Nadu."
      }
    ]
  },
  privacy: {
    badge: "LEGAL // PRIVACY POLICY",
    title: "Privacy & Data Protection Policy",
    updated: "Effective Date: October 28, 2026",
    summary: "GENZWORKS Studio respects your privacy and is committed to protecting the personal and project information you share with us—in accordance with India's Digital Personal Data Protection Act (DPDP Act) and global best practices.",
    sections: [
      {
        heading: "1. Information We Collect",
        body: "When you submit an enquiry through our 'Let's Make It Happen' contact portal or email us at genzworks7@gmail.com, we collect the information you voluntarily provide: your Full Name, Email Address, Selected Service Category, Estimated Budget/Timeline, and Project Description. We do not use invasive tracking cookies or sell user telemetry."
      },
      {
        heading: "2. How We Use Your Information",
        body: "Your information is used strictly to: (a) evaluate your project requirements and prepare accurate proposals, (b) communicate sprint updates, staging links, and deliverables during active collaborations, and (c) maintain internal studio project records and invoicing."
      },
      {
        heading: "3. Client Project Confidentiality & NDA",
        body: "All unreleased business ideas, brand assets, source code, and proprietary datasets shared with the GENZWORKS 7-member squad during discovery or development are treated as strictly confidential. We happily execute formal Non-Disclosure Agreements (NDAs) prior to project kickoff upon request."
      },
      {
        heading: "4. Interactive Features & Local Media Customization",
        body: "Our portfolio includes interactive features such as custom team portrait uploads/URL previews in the 'Meet The Team' section and theme preferences (Light/Dark mode). Any image files selected via the browser preview remain strictly in your local browser session (via local Object URLs) and are never uploaded to external servers."
      },
      {
        heading: "5. Third-Party Links & External Showcases",
        body: "Our website contains links to external client deployments (such as https://sharpcrackers.com) and social platforms (LinkedIn, GitHub, Instagram, X). Once you leave the GENZWORKS domain, the privacy policies of those respective third-party platforms apply."
      },
      {
        heading: "6. Your Data Rights & Contact Grievance Officer",
        body: "You have the right to request access to, correction of, or complete deletion of any personal enquiry data you have shared with GENZWORKS. To exercise these rights, please email our Studio Lead directly at genzworks7@gmail.com."
      }
    ]
  }
};

export default function App() {
  const [themeChoice, setThemeChoice] = useState('light');
  const [resolvedTheme, setResolvedTheme] = useState('light');
  const [activeNav, setActiveNav] = useState('home');

  const [copied, setCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [toast, setToast] = useState(null);

  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  const processRef = useRef(null);
  const [processFill, setProcessFill] = useState(0.2);

  const [team, setTeam] = useState(() => {
    return INITIAL_TEAM.map((m) => {
      const resolved = resolveMemberPhoto(m.id, m.photo);
      return {
        ...m,
        photo: resolved.photo
      };
    });
  });
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);

  const [activeTooltip, setActiveTooltip] = useState(null);
  const [stackProgress, setStackProgress] = useState([0, 0, 0, 0, 0]);
  const [activeWhyIndex, setActiveWhyIndex] = useState(0);
  const [expandedWhyIndex, setExpandedWhyIndex] = useState(null);
  const [hoveredServiceIdx, setHoveredServiceIdx] = useState(null);
  const [hovered3DIcon, setHovered3DIcon] = useState(null);

  // Dynamic morphing floating dock states
  const [isScrolled, setIsScrolled] = useState(false);
  const [dockHovered, setDockHovered] = useState(false);
  const [dockManuallyOpen, setDockManuallyOpen] = useState(false);
  const dockHoverTimeoutRef = useRef(null);
  const dockRef = useRef(null);

  const isDockCollapsed = isScrolled && !dockHovered && !dockManuallyOpen;

  // Enhanced Tools & Ecosystem interactive states
  const [activeToolCategory, setActiveToolCategory] = useState('All');
  const [ecosystemMouse, setEcosystemMouse] = useState({ x: 0, y: 0, normX: 0, normY: 0, active: false });

  // Senior UI/UX Editorial Contact & Footer States
  const [selectedServices, setSelectedServices] = useState(['Web Development']);
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [coimbatoreTime, setCoimbatoreTime] = useState('');

  // Legal Modal State ('terms' | 'privacy' | null)
  const [activeLegalModal, setActiveLegalModal] = useState(null);

  // Join Our Team Application Modal State
  const [isJoinTeamModalOpen, setIsJoinTeamModalOpen] = useState(false);
  const [joinForm, setJoinForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    role: 'Full-Stack Developer',
    customRole: '',
    experience: 'Fresher / Student',
    availability: 'Full-Time',
    skills: '',
    portfolio: '',
    github: '',
    linkedin: '',
    resumeLink: '',
    pitch: ''
  });
  const [isSubmittingJoin, setIsSubmittingJoin] = useState(false);
  const [joinSubmitted, setJoinSubmitted] = useState(false);
  const [joinError, setJoinError] = useState(null);

  const isFresher = joinForm.experience === 'Fresher / Student';

  // Footer giant text scroll-reveal state
  const footerBrandRef = useRef(null);
  const [footerBrandVisible, setFooterBrandVisible] = useState(false);

  // Full-Screen "Are you ready?" Intro Loader State (Matches video reference)
  const [loaderPhase, setLoaderPhase] = useState('start'); // 'start' -> 'are-you' -> 'ready' -> 'curtain' -> 'done'

  const runIntroLoader = () => {
    setLoaderPhase('start');
    setTimeout(() => setLoaderPhase('are-you'), 120);
    setTimeout(() => setLoaderPhase('ready'), 780);
    setTimeout(() => setLoaderPhase('curtain'), 1850);
    setTimeout(() => setLoaderPhase('done'), 2750);
  };

  useEffect(() => {
    const t1 = setTimeout(() => setLoaderPhase('are-you'), 120);
    const t2 = setTimeout(() => setLoaderPhase('ready'), 780);
    const t3 = setTimeout(() => setLoaderPhase('curtain'), 1850);
    const t4 = setTimeout(() => setLoaderPhase('done'), 2750);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  // Live Coimbatore IST Clock for authentic studio footer
  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }).format(new Date());
        setCoimbatoreTime(`${formatted} IST`);
      } catch (err) {
        setCoimbatoreTime('IST (UTC+5:30)');
      }
    };
    updateClock();
    const interval = setInterval(updateClock, 10000);
    return () => clearInterval(interval);
  }, []);

  // Particle background state for Hero (React Bits ParticleText exact physics)
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({
    x: -9999,
    y: -9999,
    radius: 110,
    strength: 3.5
  });

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      const mode = themeChoice === 'system' ? (media.matches ? 'dark' : 'light') : themeChoice;
      setResolvedTheme(mode);
      if (mode === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, [themeChoice]);

  // High-DPI Retina Particle Text ("GenzWorks")
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    let animationFrameId;

    const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2.5);

    // Deep high-contrast palette so text is crisp and solid in both dark and light modes
    const palette = resolvedTheme === 'dark'
      ? ['#FFFFFF', '#FFFFFF', '#FAFAFA', '#F4F4F5', '#E4E4E7']
      : ['#09090B', '#09090B', '#18181B', '#18181B', '#27272A'];

    const buildParticles = () => {
      const container = canvas.parentElement;
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;

      // Set physical canvas pixel buffer to DPR for 100% razor-sharp Retina clarity
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const isMobile = width < 640;
      // Responsive font sizing: bold, prominent, and perfectly proportioned on mobile
      const fontSize = isMobile
        ? Math.min(Math.max(width * 0.15, 48), 64)
        : Math.min(Math.max(width * 0.125, 56), 140);

      // Offscreen rasterization at logical coordinates
      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
      if (!offCtx) return;

      offCtx.font = `800 ${fontSize}px 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
      offCtx.fillStyle = '#000000';
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      offCtx.fillText('GenzWorks', width / 2, height * 0.5);

      const imageData = offCtx.getImageData(0, 0, width, height).data;

      // Ultra-fine sampling: on mobile step = 2 (high density, smooth letterforms!), desktop step = 2.6
      const step = isMobile ? 2 : 2.6;
      const particleRadius = isMobile ? 0.95 : 1.15;
      const nextParticles = [];

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (Math.floor(y) * width + Math.floor(x)) * 4 + 3;
          const alpha = imageData[index];
          if (alpha > 70) {
            nextParticles.push({
              x: x,
              y: y,
              originX: x,
              originY: y,
              vx: 0,
              vy: 0,
              radius: particleRadius,
              color: palette[Math.floor(Math.random() * palette.length)]
            });
          }
        }
      }

      particlesRef.current = nextParticles;
    };

    const friction = 0.76;
    const ease = 0.055;
    let waveFrame = 0;

    const renderLoop = () => {
      waveFrame += 0.024;
      
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      const list = particlesRef.current;
      const m = mouseRef.current;

      for (let i = 0; i < list.length; i++) {
        const p = list[i];
        const dx = m.x - p.x;
        const dy = m.y - p.y;
        const distSq = dx * dx + dy * dy;
        const radiusSq = m.radius * m.radius;

        if (distSq < radiusSq && distSq > 0.001) {
          const dist = Math.sqrt(distSq);
          const force = (m.radius - dist) / m.radius;
          const angle = Math.atan2(dy, dx);
          p.vx -= Math.cos(angle) * force * m.strength * 7;
          p.vy -= Math.sin(angle) * force * m.strength * 7;
        }

        // Ambient fluid breathing wave
        const ambientX = Math.sin(waveFrame + p.originY * 0.04) * 0.7;
        const ambientY = Math.cos(waveFrame + p.originX * 0.04) * 0.7;

        p.vx += (p.originX + ambientX - p.x) * ease;
        p.vy += (p.originY + ambientY - p.y) * ease;

        p.vx *= friction;
        p.vy *= friction;

        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        buildParticles();
      });
    } else {
      buildParticles();
    }

    renderLoop();
    window.addEventListener('resize', buildParticles);

    return () => {
      window.removeEventListener('resize', buildParticles);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  useEffect(() => {
    const onScroll = () => {
      if (processRef.current) {
        const rect = processRef.current.getBoundingClientRect();
        const vh = window.innerHeight;
        const progress = (vh * 0.65 - rect.top) / (rect.height * 0.85);
        setProcessFill(Math.max(0.05, Math.min(1, progress)));
      }

      const ids = ['home', 'works', 'why-us', 'process', 'about', 'services', 'contact'];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 240 && r.bottom >= 240) {
            setActiveNav(id);
            break;
          }
        }
      }

      // Compute smooth 0..1 overlap progress for each card in the 3D Scroll Stack
      const stackCards = document.querySelectorAll('.product-stack-card');
      if (stackCards.length > 0) {
        const nextProgress = Array.from(stackCards).map((card, idx) => {
          let coveredDepth = 0;
          for (let j = idx + 1; j < stackCards.length; j++) {
            const nextRect = stackCards[j].getBoundingClientRect();
            const nextStickyTop = 104 + j * 22;
            const distance = nextRect.top - nextStickyTop;
            const ratio = Math.max(0, Math.min(1, 1 - distance / 420));
            coveredDepth += ratio;
          }
          return coveredDepth;
        });
        setStackProgress(nextProgress);
      }

      const whyCards = document.querySelectorAll('.why-pillar-card');
      const stickyNav = document.getElementById('why-sticky-nav');
      const triggerY = stickyNav
        ? stickyNav.getBoundingClientRect().top + 90
        : window.innerHeight * 0.34;

      let currentWhy = 0;
      let smallestDist = Infinity;
      whyCards.forEach((card, idx) => {
        const rect = card.getBoundingClientRect();
        if (rect.top <= triggerY + 80) {
          currentWhy = idx;
        } else if (idx === 0 && rect.top > triggerY + 80) {
          currentWhy = 0;
        }
        const dist = Math.abs(rect.top - triggerY);
        if (dist < smallestDist && rect.bottom > triggerY) {
          smallestDist = dist;
        }
      });
      setActiveWhyIndex(currentWhy);

      if (footerBrandRef.current) {
        const fRect = footerBrandRef.current.getBoundingClientRect();
        if (fRect.top <= window.innerHeight * 0.96) {
          setFooterBrandVisible(true);
        } else if (fRect.top > window.innerHeight * 1.12) {
          setFooterBrandVisible(false);
        }
      }

      // Track scroll state for dynamic floating dock collapse smoothly
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (dockHoverTimeoutRef.current) clearTimeout(dockHoverTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dockRef.current && !dockRef.current.contains(e.target)) {
        setDockManuallyOpen(false);
      }
    };
    document.addEventListener('pointerdown', handleOutsideClick);
    return () => document.removeEventListener('pointerdown', handleOutsideClick);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        mouseRef.current.x = e.clientX - rect.left;
        mouseRef.current.y = e.clientY - rect.top;
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Smooth Scroll Reveal Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [loaderPhase]);

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  };

  const copyStudioEmail = () => {
    const input = document.createElement('textarea');
    input.value = BRAND_CONFIG.email;
    document.body.appendChild(input);
    input.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      triggerToast(`Copied ${BRAND_CONFIG.email} to clipboard`);
      setTimeout(() => setCopied(false), 3000);
    } catch (e) {
      triggerToast(BRAND_CONFIG.email);
    }
    document.body.removeChild(input);
  };

  const copyStudioPhone = (numberToCopy = BRAND_CONFIG.phone) => {
    const input = document.createElement('textarea');
    input.value = numberToCopy;
    document.body.appendChild(input);
    input.select();
    try {
      document.execCommand('copy');
      setPhoneCopied(true);
      triggerToast(`Copied ${numberToCopy} to clipboard`);
      setTimeout(() => setPhoneCopied(false), 3000);
    } catch (e) {
      triggerToast(numberToCopy);
    }
    document.body.removeChild(input);
  };

  const jumpTo = (id) => {
    setActiveNav(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };



  const toggleServiceChip = (serviceName) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.length > 1
          ? prev.filter((item) => item !== serviceName)
          : prev
        : [...prev, serviceName]
    );
  };

  const handleSelectServiceFromCard = (serviceTitle) => {
    let chipName = serviceTitle;
    if (serviceTitle.includes('Commercial Poster')) chipName = 'Commercial Posters';
    else if (serviceTitle.includes('Academic')) chipName = 'Academic Mentorship';
    else if (serviceTitle.includes('Video')) chipName = 'Video & Multimedia';
    else if (serviceTitle.includes('Content')) chipName = 'Content & Copywriting';
    else if (serviceTitle.includes('Graphic')) chipName = 'Graphic Design';
    else if (serviceTitle.includes('Web')) chipName = 'Web Development';

    setSelectedServices((prev) => (prev.includes(chipName) ? prev : [...prev, chipName]));
    jumpTo('contact');
    triggerToast(`Selected "${chipName}" for your project inquiry!`);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (isSubmittingForm) return;

    setIsSubmittingForm(true);

    const rawPhone = contactForm.phone.trim();
    const safePhone = rawPhone.startsWith('+') ? `'${rawPhone}` : rawPhone;

    const payload = {
      name: contactForm.name.trim(),
      email: contactForm.email.trim(),
      phone: safePhone,
      services: selectedServices.length > 0 ? selectedServices.join(', ') : 'General Inquiry',
      message: contactForm.message.trim()
    };

    try {
      const scriptUrl = BRAND_CONFIG.googleSheetScriptUrl;

      if (scriptUrl && scriptUrl.trim() !== '') {
        // Send data to Google Apps Script Web App (URL-encoded with mode 'no-cors' prevents CORS errors)
        const formParams = new URLSearchParams();
        formParams.append('name', payload.name);
        formParams.append('email', payload.email);
        formParams.append('phone', payload.phone);
        formParams.append('services', payload.services);
        formParams.append('message', payload.message);

        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formParams.toString()
        });
      }

      setFormSubmitted(true);
      triggerToast("Message sent successfully! Stored to Google Sheets.");
      setContactForm({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setFormSubmitted(false), 5000);
    } catch (err) {
      console.error('Submission error:', err);
      setFormSubmitted(true);
      triggerToast("Thank you! Your message has been received.");
      setContactForm({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setFormSubmitted(false), 5000);
    } finally {
      setIsSubmittingForm(false);
    }
  };

  const handleJoinSubmit = async (e) => {
    e.preventDefault();
    if (isSubmittingJoin) return;

    if (!joinForm.fullName.trim()) {
      setJoinError("Please enter your name.");
      return;
    }
    if (!joinForm.email.trim() || !/\S+@\S+\.\S+/.test(joinForm.email)) {
      setJoinError("Please provide a valid email address.");
      return;
    }
    if (!joinForm.phone.trim() || joinForm.phone.trim().length < 7) {
      setJoinError("Please enter a valid phone or WhatsApp number.");
      return;
    }

    // Resume is ALWAYS mandatory for all applicants (Fresher or Experienced)
    if (!joinForm.resumeLink.trim()) {
      setJoinError("Resume link (Google Drive / Notion) is mandatory.");
      return;
    }

    // Portfolio & LinkedIn are mandatory ONLY if NOT a fresher/student
    if (!isFresher) {
      if (!joinForm.portfolio.trim()) {
        setJoinError("Portfolio or GitHub link is mandatory for experienced applicants.");
        return;
      }
      if (!joinForm.linkedin.trim()) {
        setJoinError("LinkedIn profile link is mandatory for experienced applicants.");
        return;
      }
    }

    setJoinError(null);
    setIsSubmittingJoin(true);

    const resolvedRole = (joinForm.role === 'Other Creative' && joinForm.customRole?.trim())
      ? `Other: ${joinForm.customRole.trim()}`
      : joinForm.role;

    const rawJoinPhone = joinForm.phone.trim();
    const safeJoinPhone = rawJoinPhone.startsWith('+') ? `'${rawJoinPhone}` : rawJoinPhone;

    const payload = {
      formType: 'join_team',
      action: 'join_team',
      fullName: joinForm.fullName.trim(),
      email: joinForm.email.trim(),
      phone: safeJoinPhone,
      location: 'Coimbatore / Remote',
      role: resolvedRole,
      experience: joinForm.experience,
      availability: joinForm.availability || 'Full-Time',
      skills: resolvedRole,
      portfolio: joinForm.portfolio?.trim() || (isFresher ? 'Not provided (Fresher)' : '—'),
      github: joinForm.portfolio?.trim() || (isFresher ? 'Not provided (Fresher)' : '—'),
      linkedin: joinForm.linkedin?.trim() || (isFresher ? 'Not provided (Fresher)' : '—'),
      resumeLink: joinForm.resumeLink.trim(),
      pitch: joinForm.pitch?.trim() || 'Applied via website'
    };

    try {
      const scriptUrl = BRAND_CONFIG.joinTeamScriptUrl || BRAND_CONFIG.googleSheetScriptUrl;

      if (scriptUrl && scriptUrl.trim() !== '') {
        const formParams = new URLSearchParams();
        Object.keys(payload).forEach((key) => {
          formParams.append(key, payload[key]);
        });

        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formParams.toString()
        });
      }

      setJoinSubmitted(true);
      triggerToast("Application submitted successfully! Stored to Google Sheets.");
    } catch (err) {
      console.error('Join team submission error:', err);
      setJoinSubmitted(true);
      triggerToast("Thank you! Your application has been recorded.");
    } finally {
      setIsSubmittingJoin(false);
    }
  };

  const isDark = resolvedTheme === 'dark';

  const filteredStudioTools =
    activeToolCategory === 'All'
      ? STUDIO_TOOLS
      : STUDIO_TOOLS.filter((t) => t.group === activeToolCategory);

  const heroRevealed = loaderPhase === 'curtain' || loaderPhase === 'done';

  return (
    <div
      className={`min-h-screen transition-colors duration-700 selection:bg-[#0E0E10] selection:text-[#D9FF3F] ${
        isDark ? 'dark bg-[#060608] text-[#F5F5F3]' : 'bg-[#FFFFFF] text-[#0E0E10]'
      } antialiased overflow-x-clip relative has-custom-cursor`}
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&family=Syne:wght@800&display=swap');

        .font-editorial { font-family: 'Instrument Serif', Georgia, serif; }
        .font-mono-tech { font-family: 'Space Mono', monospace; }
        .font-funky { font-family: 'Syne', sans-serif; }

        @keyframes blobFloat {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(40px, -60px) scale(1.12); }
          66% { transform: translate(-30px, 30px) scale(0.92); }
        }

        .liquid-blob-1 {
          position: absolute;
          width: 550px;
          height: 550px;
          background: radial-gradient(circle, rgba(217, 255, 63, 0.35) 0%, rgba(255, 79, 24, 0.18) 60%, transparent 100%);
          filter: blur(100px);
          border-radius: 50%;
          top: -120px;
          left: 10%;
          animation: blobFloat 14s ease-in-out infinite;
          pointer-events: none;
          z-index: 0;
        }

        .liquid-blob-2 {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(79, 70, 229, 0.28) 0%, rgba(217, 255, 63, 0.22) 60%, transparent 100%);
          filter: blur(110px);
          border-radius: 50%;
          top: 25%;
          right: 5%;
          animation: blobFloat 18s ease-in-out infinite reverse;
          pointer-events: none;
          z-index: 0;
        }

        /* Ultra-Luxe Liquid Glass Theme */
        .liquid-glass {
          background: ${isDark
            ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(255, 255, 255, 0.05) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0.45) 100%)'};
          backdrop-filter: blur(32px) saturate(210%) contrast(102%);
          -webkit-backdrop-filter: blur(32px) saturate(210%) contrast(102%);
          border: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.85)'};
          box-shadow: ${isDark
            ? '0 25px 50px -10px rgba(0, 0, 0, 0.6), inset 0 1.5px 1px rgba(255, 255, 255, 0.22), inset 0 -1.5px 2px rgba(0, 0, 0, 0.35)'
            : '0 20px 45px -10px rgba(15, 23, 42, 0.06), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.95), inset 0 -1.5px 2px rgba(0, 0, 0, 0.03)'};
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.5s ease;
        }

        .liquid-glass:hover {
          transform: translateY(-4px);
          box-shadow: ${isDark
            ? '0 30px 60px -10px rgba(0, 0, 0, 0.75), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.35)'
            : '0 28px 55px -10px rgba(15, 23, 42, 0.1), inset 0 1.5px 1.5px rgba(255, 255, 255, 1)'};
          border-color: ${isDark ? 'rgba(217, 255, 63, 0.4)' : 'rgba(255, 255, 255, 0.95)'};
        }

        /* Authentic Liquid Glass Navbar (Ultra-Visible & Glossy) */
        .liquid-glass-nav {
          position: relative;
          background: ${isDark
            ? 'linear-gradient(135deg, rgba(28, 28, 36, 0.88) 0%, rgba(16, 16, 22, 0.82) 50%, rgba(22, 22, 30, 0.88) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.78) 50%, rgba(246, 248, 252, 0.88) 100%)'};
          backdrop-filter: blur(28px) saturate(190%) contrast(104%);
          -webkit-backdrop-filter: blur(28px) saturate(190%) contrast(104%);
          border: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(255, 255, 255, 0.95)'};
          box-shadow: ${isDark
            ? '0 24px 50px -12px rgba(0, 0, 0, 0.75), 0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.32), inset 0 -1.5px 2px 0 rgba(0, 0, 0, 0.5), inset 1.5px 0 1.5px 0 rgba(255, 255, 255, 0.12)'
            : '0 20px 40px -10px rgba(15, 23, 42, 0.12), 0 4px 16px -2px rgba(15, 23, 42, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.06), inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 1), inset 0 -1.5px 2px 0 rgba(0, 0, 0, 0.04), inset 1.5px 0 1.5px 0 rgba(255, 255, 255, 0.8)'};
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease;
        }

        .liquid-glass-nav::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(110% 60% at 50% 0%, ${isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.85)'} 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .liquid-glass-nav::after {
          content: '';
          position: absolute;
          top: 0;
          left: 8%;
          right: 8%;
          height: 1px;
          background: linear-gradient(90deg, transparent, ${isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 1)'}, transparent);
          pointer-events: none;
          z-index: 1;
        }

        /* Action Buttons with Liquid Lens Glass */
        .liquid-glass-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: ${isDark
            ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.05) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 242, 248, 0.75) 100%)'};
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(0, 0, 0, 0.08)'};
          box-shadow: ${isDark
            ? '0 3px 10px rgba(0, 0, 0, 0.4), inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.28)'
            : '0 2px 8px rgba(15, 23, 42, 0.07), 0 0 0 1px rgba(0, 0, 0, 0.04), inset 0 1.5px 1px 0 rgba(255, 255, 255, 1)'};
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }

        .liquid-glass-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(circle at 50% 15%, ${isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.9)'}, transparent 65%);
          pointer-events: none;
        }

        .liquid-glass-btn:hover {
          transform: translateY(-2px) scale(1.08);
          background: ${isDark
            ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.1) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(245, 247, 252, 0.9) 100%)'};
          border-color: ${isDark ? 'rgba(217, 255, 63, 0.6)' : 'rgba(0, 0, 0, 0.18)'};
          box-shadow: ${isDark
            ? '0 6px 20px rgba(0, 0, 0, 0.5), inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 0.4), 0 0 12px rgba(217, 255, 63, 0.25)'
            : '0 6px 16px rgba(15, 23, 42, 0.12), inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 1), 0 0 12px rgba(255, 255, 255, 0.8)'};
        }

        .liquid-glass-btn:active {
          transform: translateY(0px) scale(0.95);
        }

        .liquid-glass-badge {
          background: ${isDark ? 'rgba(16, 185, 129, 0.16)' : 'rgba(16, 185, 129, 0.12)'};
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid ${isDark ? 'rgba(16, 185, 129, 0.45)' : 'rgba(16, 185, 129, 0.35)'};
          box-shadow: ${isDark
            ? 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)'
            : '0 1px 4px rgba(16, 185, 129, 0.1), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9)'};
        }

        .liquid-glass-dock {
          background: ${isDark
            ? 'linear-gradient(135deg, rgba(20, 20, 26, 0.88) 0%, rgba(12, 12, 16, 0.82) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0.72) 100%)'};
          backdrop-filter: blur(36px) saturate(220%);
          -webkit-backdrop-filter: blur(36px) saturate(220%);
          border: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.9)'};
          box-shadow: ${isDark
            ? '0 30px 70px rgba(0, 0, 0, 0.55), inset 0 1.5px 1px rgba(255, 255, 255, 0.25), inset 0 -1px 2px rgba(0, 0, 0, 0.4)'
            : '0 25px 60px rgba(0, 0, 0, 0.1), inset 0 1.5px 1px rgba(255, 255, 255, 0.95), inset 0 -1px 2px rgba(0, 0, 0, 0.04)'};
          transition: width 0.48s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.4s ease,
                      transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.35s ease;
          will-change: width, transform;
        }

        @keyframes framerCardExpand {
          0% { opacity: 0; transform: scale(0.7) translateY(45px); filter: blur(12px); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0px); }
        }

        @keyframes framerFadeRise {
          0% { opacity: 0; transform: translateY(28px) scale(0.97); filter: blur(6px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0px); }
        }

        @keyframes framerDockRise {
          0% { opacity: 0; transform: translate(-50%, 50px) scale(0.92); }
          100% { opacity: 1; transform: translate(-50%, 0) scale(1); }
        }

        @keyframes tickerScroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }

        .animate-ticker { display: flex; width: max-content; animation: tickerScroll 30s linear infinite; }
        .animate-ticker:hover { animation-play-state: paused; }

        .hero-visible .framer-hero-card { animation: framerCardExpand 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both; }
        .hero-visible .framer-hero-title { animation: framerFadeRise 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both; }
        .hero-visible .framer-hero-subtitle { animation: framerFadeRise 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both; }
        .hero-visible .framer-hero-cta { animation: framerFadeRise 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both; }
        .hero-visible.framer-floating-dock, .framer-floating-dock { animation: framerDockRise 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.65s both; }

        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .reveal-on-scroll.reveal-active {
          opacity: 1;
          transform: translateY(0);
        }

        @media (min-width: 1024px) {
          .has-custom-cursor, .has-custom-cursor button, .has-custom-cursor a, .has-custom-cursor input {
            cursor: none !important;
          }
        }

        .framer-spring { transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        .work-card { transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
      <style>{`
        @keyframes iconFloat3D {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-16px) rotate(2.5deg); }
        }
        @keyframes orbitPulse {
          0%, 100% { opacity: 0.22; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.45; transform: translate(-50%, -50%) scale(1.03); }
        }
        .icon-3d-shell {
          box-shadow:
            0 20px 38px -10px rgba(0, 0, 0, 0.55),
            0 6px 0 0 ${isDark ? '#cbd5e1' : '#d4d4d8'},
            inset 0 2px 3px rgba(255, 255, 255, 0.95),
            inset 0 -3px 6px rgba(0, 0, 0, 0.22);
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .icon-3d-shell:hover {
          box-shadow:
            0 30px 55px -8px rgba(255, 79, 24, 0.48),
            0 9px 0 0 ${isDark ? '#e2e8f0' : '#a1a1aa'},
            inset 0 2px 4px rgba(255, 255, 255, 1),
            inset 0 -3px 6px rgba(0, 0, 0, 0.28);
        }
        .footer-gradient-text {
          background: linear-gradient(
            180deg,
            #FFFFFF 0%,
            #F5F5F7 20%,
            #D1D1D6 42%,
            #8E8E93 68%,
            #48484A 88%,
            #2C2C2E 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
          padding-bottom: 0.12em;
          margin-bottom: -0.12em;
          will-change: transform, opacity;
        }
        .footer-gradient-text:hover {
          filter: brightness(1.15);
        }
      `}</style>

      {/* Custom Red Point Cursor */}
      <div
        className="fixed pointer-events-none z-[9999] w-4 h-4 rounded-full bg-[#FF4F18] shadow-[0_0_16px_rgba(255,79,24,0.95)] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out hidden lg:block"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          opacity: mousePos.x > 0 ? 1 : 0
        }}
      />

      {/* Full-Screen "Are you ready?" Curtain Loader Animation */}
      {loaderPhase !== 'done' && (
        <div
          style={{
            transform: loaderPhase === 'curtain' ? 'translateY(-100%)' : 'translateY(0%)',
            transition: 'transform 0.88s cubic-bezier(0.76, 0, 0.24, 1)'
          }}
          className="fixed inset-0 z-[9500] bg-[#0B0B0D] text-white flex flex-col items-center justify-center select-none overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1.5 h-24 bg-[#00F0FF] shadow-[0_0_18px_#00F0FF]" />

          <div
            style={{
              opacity: loaderPhase === 'curtain' ? 0 : 1,
              transform: loaderPhase === 'curtain' ? 'translateY(-24px) scale(0.96)' : 'translateY(0px) scale(1)',
              transition: 'opacity 0.38s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className="relative flex flex-col items-center"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 mb-5 flex items-center justify-center">
              <img
                src="/logo.png"
                alt="GENZWORKS Studio"
                className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(0,240,255,0.75)]"
              />
            </div>
            <div className="flex items-baseline gap-2.5 sm:gap-3.5 text-3xl sm:text-5xl md:text-[54px] tracking-[-0.03em] pb-3.5 sm:pb-4">
              <span
                style={{
                  opacity: loaderPhase === 'are-you' || loaderPhase === 'ready' || loaderPhase === 'curtain' ? 1 : 0,
                  transform:
                    loaderPhase === 'are-you' || loaderPhase === 'ready' || loaderPhase === 'curtain'
                      ? 'translateY(0px)'
                      : 'translateY(14px)',
                  transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="font-semibold text-white"
              >
                Are you
              </span>

              <span
                style={{
                  opacity: loaderPhase === 'ready' || loaderPhase === 'curtain' ? 1 : 0.12,
                  transform:
                    loaderPhase === 'ready' || loaderPhase === 'curtain'
                      ? 'translateY(0px)'
                      : 'translateY(10px)',
                  transition: 'opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="font-normal text-white/95"
              >
                ready?
              </span>
            </div>

            <div className="w-full h-[1.5px] bg-white/15 overflow-hidden rounded-full">
              <div
                style={{
                  width:
                    loaderPhase === 'start'
                      ? '0%'
                      : loaderPhase === 'are-you'
                      ? '48%'
                      : '100%',
                  transition: 'width 0.65s cubic-bezier(0.22, 1, 0.36, 1)'
                }}
                className="h-full bg-white"
              />
            </div>
          </div>

          <div className="absolute bottom-0 inset-x-0 h-[1px] bg-white/15" />
        </div>
      )}

      {/* Interactive Legal Modal (Terms of Use & Privacy Policy) */}
      {activeLegalModal && (
        <div
          onClick={() => setActiveLegalModal(null)}
          className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full rounded-[32px] border border-white/15 bg-[#0C0C10] text-white p-6 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.75)] relative max-h-[88vh] flex flex-col framer-hero-card"
          >
            {/* Top Bar with Tab Switcher & Close Button */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
                <button
                  onClick={() => setActiveLegalModal('terms')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all ${
                    activeLegalModal === 'terms'
                      ? 'bg-[#D9FF3F] text-black shadow'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Terms &amp; Conditions</span>
                </button>
                <button
                  onClick={() => setActiveLegalModal('privacy')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all ${
                    activeLegalModal === 'privacy'
                      ? 'bg-[#D9FF3F] text-black shadow'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Privacy Policy</span>
                </button>
              </div>

              <button
                onClick={() => setActiveLegalModal(null)}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-[#FF4F18] text-white text-xs font-mono-tech font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
              >
                <span>Close</span>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Scrollable Document Content */}
            <div className="overflow-y-auto pr-2 py-6 space-y-6 text-left">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4F18]/15 border border-[#FF4F18]/30 text-[#FF4F18] font-mono-tech text-[11px] font-bold">
                  <span>{LEGAL_DOCS[activeLegalModal].badge}</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                  {LEGAL_DOCS[activeLegalModal].title}
                </h2>
                <div className="text-xs font-mono-tech text-zinc-400">
                  {LEGAL_DOCS[activeLegalModal].updated} • GENZWORKS Studio (Coimbatore, TN)
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pt-2 border-t border-white/10">
                  {LEGAL_DOCS[activeLegalModal].summary}
                </p>
              </div>

              <div className="space-y-4">
                {LEGAL_DOCS[activeLegalModal].sections.map((sec, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#D9FF3F]/40 transition-colors"
                  >
                    <h4 className="text-sm sm:text-base font-extrabold text-[#D9FF3F] mb-2">
                      {sec.heading}
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {sec.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Footer Bar */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400 shrink-0">
              <span>Questions about our policies? Reach us at <strong className="text-white">{BRAND_CONFIG.email}</strong></span>
              <button
                onClick={() => {
                  setActiveLegalModal(null);
                  jumpTo('contact');
                }}
                className="px-5 py-2.5 rounded-xl bg-[#D9FF3F] text-black font-extrabold uppercase tracking-wider text-[11px] hover:bg-lime-300 transition-colors"
              >
                Acknowledge &amp; Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Join Our Team Application Modal */}
      {isJoinTeamModalOpen && (
        <div
          onClick={() => {
            if (!isSubmittingJoin) setIsJoinTeamModalOpen(false);
          }}
          className="fixed inset-0 z-[125] bg-black/85 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-xl w-full rounded-[24px] sm:rounded-[32px] border border-white/15 bg-[#0C0C10] text-white p-5 sm:p-7 shadow-[0_30px_90px_rgba(0,0,0,0.85)] relative my-auto max-h-[92vh] flex flex-col framer-hero-card"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 pb-3 sm:pb-4 border-b border-white/10 shrink-0">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-[11px] font-medium text-zinc-300 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D9FF3F] animate-pulse" />
                  <span>Join the Crew</span>
                </div>
                <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                  Build with <span className="font-editorial italic font-normal text-[#D9FF3F]">GENZWORKS.</span>
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                  Fast-track your application in 60 seconds.
                </p>
              </div>

              <button
                onClick={() => {
                  if (!isSubmittingJoin) setIsJoinTeamModalOpen(false);
                }}
                disabled={isSubmittingJoin}
                className="p-2 rounded-full bg-white/10 hover:bg-[#FF4F18] text-white transition-all shrink-0 hover:rotate-90 cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content: Success State vs Form */}
            {joinSubmitted ? (
              <div className="py-12 px-4 sm:px-8 text-center flex flex-col items-center justify-center space-y-5 my-auto">
                <div className="w-16 h-16 rounded-full bg-[#D9FF3F]/20 border border-[#D9FF3F]/40 flex items-center justify-center text-[#D9FF3F] shadow-[0_0_30px_rgba(217,255,63,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2 max-w-md">
                  <h3 className="text-2xl font-extrabold text-white">Application Received!</h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    Thank you, <strong className="text-[#D9FF3F]">{joinForm.fullName}</strong>. Your application for <strong className="text-white">{joinForm.role}</strong> has been successfully recorded in our hiring database.
                  </p>
                  <p className="text-xs text-zinc-400 leading-relaxed pt-2">
                    Our lead team (Mohammed Ali Khan &amp; founders) reviews every application. If your profile matches our requirements, we'll reach out within 48-72 hours.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setJoinSubmitted(false);
                    setIsJoinTeamModalOpen(false);
                    setJoinForm({
                      fullName: '',
                      email: '',
                      phone: '',
                      location: '',
                      role: 'Full-Stack Developer',
                      customRole: '',
                      experience: 'Fresher / Student',
                      availability: 'Full-Time',
                      skills: '',
                      portfolio: '',
                      github: '',
                      linkedin: '',
                      resumeLink: '',
                      pitch: ''
                    });
                  }}
                  className="px-8 py-3 rounded-full bg-[#D9FF3F] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-lime-300 transition-all shadow-lg cursor-pointer"
                >
                  Done &amp; Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleJoinSubmit} className="overflow-y-auto pr-1 sm:pr-2 py-4 space-y-4 sm:space-y-5 text-left">
                {joinError && (
                  <div className="p-3 rounded-2xl bg-[#FF4F18]/15 border border-[#FF4F18]/40 text-[#FF8566] text-xs flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 text-[#FF4F18]" />
                    <span>{joinError}</span>
                  </div>
                )}

                {/* Role Selector Pills */}
                <div className="space-y-1.5">
                  <span className="text-[11px] uppercase tracking-wider text-zinc-400 block font-mono-tech">
                    Role applying for:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {CAREER_ROLES.map((roleName) => {
                      const isSelected = joinForm.role === roleName;
                      return (
                        <button
                          key={roleName}
                          type="button"
                          onClick={() => setJoinForm({ ...joinForm, role: roleName })}
                          className={`px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#D9FF3F] text-[#08080A] border-[#D9FF3F] shadow-sm font-bold'
                              : 'bg-white/[0.05] text-zinc-400 border-white/15 hover:border-white/30 hover:text-white'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '}
                          {roleName}
                        </button>
                      );
                    })}
                  </div>

                  {joinForm.role === 'Other Creative' && (
                    <div className="pt-1.5">
                      <input
                        type="text"
                        required
                        value={joinForm.customRole || ''}
                        onChange={(e) => setJoinForm({ ...joinForm, customRole: e.target.value })}
                        placeholder="Specify your role (e.g. 3D Animator, Sound Designer)"
                        className="w-full bg-transparent border-b border-white/25 focus:border-[#D9FF3F] py-2 text-xs sm:text-sm text-white placeholder:text-zinc-500 focus:outline-none transition-colors"
                      />
                    </div>
                  )}
                </div>

                {/* Experience Level */}
                <div className="space-y-1.5">
                  <span className="text-[11px] uppercase tracking-wider text-zinc-400 block font-mono-tech">
                    Experience:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Fresher / Student', '1-2 Years', '3-5 Years', '5+ Years'].map((exp) => {
                      const isSelected = joinForm.experience === exp;
                      return (
                        <button
                          key={exp}
                          type="button"
                          onClick={() => setJoinForm({ ...joinForm, experience: exp })}
                          className={`px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-medium border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#D9FF3F] text-[#08080A] border-[#D9FF3F] font-bold shadow-sm'
                              : 'bg-white/[0.05] text-zinc-400 border-white/15 hover:border-white/30 hover:text-white'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '}
                          {exp}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Clean Minimalist Inputs */}
                <div className="space-y-3 pt-1">
                  <span className="text-[11px] uppercase tracking-wider text-zinc-400 block font-mono-tech">
                    Your Details:
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3 sm:gap-y-4">
                    <div>
                      <input
                        required
                        type="text"
                        value={joinForm.fullName}
                        onChange={(e) => setJoinForm({ ...joinForm, fullName: e.target.value })}
                        placeholder="Your name *"
                        className="w-full bg-transparent border-b border-white/20 focus:border-[#D9FF3F] py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder:text-zinc-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <input
                        required
                        type="email"
                        value={joinForm.email}
                        onChange={(e) => setJoinForm({ ...joinForm, email: e.target.value })}
                        placeholder="Your email *"
                        className="w-full bg-transparent border-b border-white/20 focus:border-[#D9FF3F] py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder:text-zinc-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <input
                        required
                        type="tel"
                        value={joinForm.phone}
                        onChange={(e) => setJoinForm({ ...joinForm, phone: e.target.value })}
                        placeholder="Phone / WhatsApp *"
                        className="w-full bg-transparent border-b border-white/20 focus:border-[#D9FF3F] py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder:text-zinc-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <input
                        required
                        type="url"
                        value={joinForm.resumeLink}
                        onChange={(e) => setJoinForm({ ...joinForm, resumeLink: e.target.value })}
                        placeholder="Resume link (Drive / Notion) *"
                        className="w-full bg-transparent border-b border-white/20 focus:border-[#D9FF3F] py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder:text-zinc-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <input
                        required={!isFresher}
                        type="url"
                        value={joinForm.portfolio}
                        onChange={(e) => setJoinForm({ ...joinForm, portfolio: e.target.value })}
                        placeholder={isFresher ? "Portfolio or GitHub link (optional)" : "Portfolio or GitHub link *"}
                        className="w-full bg-transparent border-b border-white/20 focus:border-[#D9FF3F] py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder:text-zinc-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <input
                        required={!isFresher}
                        type="url"
                        value={joinForm.linkedin}
                        onChange={(e) => setJoinForm({ ...joinForm, linkedin: e.target.value })}
                        placeholder={isFresher ? "LinkedIn link (optional)" : "LinkedIn link *"}
                        className="w-full bg-transparent border-b border-white/20 focus:border-[#D9FF3F] py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder:text-zinc-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <input
                        type="text"
                        value={joinForm.pitch}
                        onChange={(e) => setJoinForm({ ...joinForm, pitch: e.target.value })}
                        placeholder="Short note or why you want to join (optional)"
                        className="w-full bg-transparent border-b border-white/20 focus:border-[#D9FF3F] py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder:text-zinc-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Row */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={isSubmittingJoin}
                    className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#D9FF3F] hover:bg-lime-300 text-[#08080A] font-extrabold uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl hover:shadow-[0_0_25px_rgba(217,255,63,0.35)] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmittingJoin ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-black" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <div className="liquid-blob-1" />
      <div className="liquid-blob-2" />

      {toast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#0E0E10] text-white text-xs font-bold tracking-wide shadow-2xl border border-white/15 framer-spring">
          <span className="w-2 h-2 rounded-full bg-[#D9FF3F] animate-pulse" />
          <span>{toast}</span>
        </div>
      )}

      <section id="home" className={`relative pt-12 sm:pt-16 pb-20 z-10 px-4 sm:px-10 max-w-[1280px] mx-auto transition-opacity duration-500 ${heroRevealed ? 'hero-visible opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col items-center text-center relative z-10">
          <div className="framer-hero-card w-full max-w-[820px] px-3.5 py-2.5 sm:px-5 sm:py-3.5 rounded-2xl sm:rounded-[28px] liquid-glass-nav mb-3 sm:mb-5">
            <div className="relative z-10 flex items-center justify-between gap-2 sm:gap-4">
              <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                <div className="relative w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl p-1 sm:p-1.5 liquid-glass-btn shadow-sm shrink-0 flex items-center justify-center">
                  <div className="w-full h-full rounded-[10px] sm:rounded-[14px] flex items-center justify-center overflow-hidden">
                    <img src="/logo.png" alt="GENZWORKS Studio Logo" className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,240,255,0.35)]" />
                  </div>
                </div>
                <div className="text-left min-w-0">
                  <h3 className="font-extrabold text-xs sm:text-base tracking-tight text-zinc-950 dark:text-white truncate">{BRAND_CONFIG.brandName}</h3>
                  <p className="text-[10px] sm:text-xs text-zinc-600 dark:text-zinc-300 font-medium truncate">Technology &amp; Creative Studio</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <a
                    href={BRAND_CONFIG.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-7 h-7 sm:w-9 sm:h-9 rounded-full liquid-glass-btn text-zinc-800 hover:text-black dark:text-zinc-100 dark:hover:text-white"
                    title={`Instagram (${BRAND_CONFIG.instagram})`}
                  >
                    <Instagram className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </a>
                  <a
                    href={BRAND_CONFIG.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-7 h-7 sm:w-9 sm:h-9 rounded-full liquid-glass-btn text-zinc-800 hover:text-black dark:text-zinc-100 dark:hover:text-white"
                    title="GitHub (genzworks7-boys)"
                  >
                    <Github className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </a>
                  <button
                    onClick={() => {
                      const next = resolvedTheme === 'dark' ? 'light' : 'dark';
                      setThemeChoice(next);
                      triggerToast(`Theme set to ${next}`);
                    }}
                    className="w-7 h-7 sm:w-9 sm:h-9 rounded-full liquid-glass-btn text-zinc-800 hover:text-black dark:text-zinc-100 dark:hover:text-white"
                    title="Toggle Light / Dark Mode"
                  >
                    {resolvedTheme === 'dark' ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D9FF3F]" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive React Bits Particle Text — High-DPI Retina Sharp with Mobile Touch */}
          <div className="w-full max-w-[1080px] h-[110px] sm:h-[180px] md:h-[230px] my-1 sm:my-3 flex items-center justify-center relative select-none">
            <canvas
              ref={canvasRef}
              onTouchStart={(e) => {
                if (!canvasRef.current || !e.touches || e.touches.length === 0) return;
                const touch = e.touches[0];
                const rect = canvasRef.current.getBoundingClientRect();
                mouseRef.current.x = touch.clientX - rect.left;
                mouseRef.current.y = touch.clientY - rect.top;
              }}
              onTouchMove={(e) => {
                if (!canvasRef.current || !e.touches || e.touches.length === 0) return;
                const touch = e.touches[0];
                const rect = canvasRef.current.getBoundingClientRect();
                mouseRef.current.x = touch.clientX - rect.left;
                mouseRef.current.y = touch.clientY - rect.top;
              }}
              onTouchEnd={() => {
                mouseRef.current.x = -1000;
                mouseRef.current.y = -1000;
              }}
              className="w-full h-full block cursor-pointer touch-none"
            />
          </div>


          <h1 className="framer-hero-title max-w-[940px] text-[2.75rem] sm:text-[4.8rem] lg:text-[5.8rem] font-extrabold tracking-[-0.04em] leading-[0.98] mb-6">
            We craft websites <br className="hidden sm:inline" />
            that hustle as hard <br className="hidden sm:inline" />
            as you do
          </h1>

          <p className="framer-hero-subtitle max-w-[580px] text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium mb-8">
            {BRAND_CONFIG.heroSubheading}
          </p>

          <div className="framer-hero-cta flex items-center gap-4">
            <button
              onClick={() => jumpTo('contact')}
              className="px-8 py-4 rounded-2xl text-xs font-extrabold uppercase tracking-wider bg-[#0E0E10] text-white dark:bg-white dark:text-[#0E0E10] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => jumpTo('works')}
              className="px-8 py-4 rounded-2xl text-xs font-extrabold uppercase tracking-wider liquid-glass hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center gap-3"
            >
              <span>Our Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-20 py-4 liquid-glass overflow-hidden rounded-3xl shadow-xl relative z-10">
          <div className="animate-ticker flex items-center gap-10">
            {[...CRAFT_TICKER, ...CRAFT_TICKER].map((item, idx) => (
              <div key={idx} className="flex items-center gap-10 shrink-0">
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest">{item}</span>
                <span className="w-2 h-2 rounded-full bg-[#0E0E10] dark:bg-white" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREMIUM FRAMER-MOTION STYLE TOOLS & ECOSYSTEM SECTION */}
      <section id="tools" className="py-20 border-y border-current/10 relative z-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 reveal-on-scroll">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#FF4F18]/30 bg-[#FF4F18]/10 text-[#FF4F18] font-mono-tech text-[11px] uppercase tracking-widest font-bold mb-3">
                <Layers className="w-3.5 h-3.5" />
                <span>/ TOOLS &amp; ECOSYSTEM • FRAMER PHYSICS</span>
              </div>
              <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
                Powered by <span className="font-editorial italic font-normal text-[#FF4F18]">Industry-Standard</span> Craft Tools.
              </h3>
            </div>

            {/* Interactive Category Filter Pills with Framer Spring Physics */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl liquid-glass self-start lg:self-end">
              {['All', 'Frontend', 'Design', 'Motion & Media', 'Backend & Cloud'].map((cat) => {
                const active = activeToolCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveToolCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold tracking-tight transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      active
                        ? 'bg-[#0E0E10] text-[#D9FF3F] dark:bg-white dark:text-[#0E0E10] shadow-lg scale-[1.03]'
                        : 'opacity-65 hover:opacity-100 hover:bg-current/5'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Studio Craft Tools Cards Grid (Matches User Screenshot) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-on-scroll">
            {filteredStudioTools.map((tool, index) => (
              <div
                key={tool.name}
                style={{
                  transitionDelay: `${index * 35}ms`
                }}
                className="group relative p-6 sm:p-7 rounded-[28px] bg-white/90 dark:bg-[#111116]/90 border border-black/[0.08] dark:border-white/10 hover:border-[#FF4F18]/40 dark:hover:border-[#FF4F18]/40 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 overflow-hidden flex flex-col justify-between"
              >
                {/* Subtle Radial Glow on Hover */}
                <div
                  className="absolute -right-12 -top-12 w-44 h-44 rounded-full opacity-0 group-hover:opacity-25 transition-opacity duration-500 blur-2xl pointer-events-none"
                  style={{ backgroundColor: tool.accent === '#FFFFFF' ? '#FF4F18' : tool.accent }}
                />

                <div>
                  {/* Top Row: Squircle Icon & Monospace Pill Badge */}
                  <div className="flex items-center justify-between gap-4 mb-7">
                    <div className="w-14 h-14 rounded-2xl bg-black/[0.04] dark:bg-white/[0.08] border border-black/[0.06] dark:border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:rotate-[-2deg] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-sm">
                      {tool.svg}
                    </div>

                    <span className="px-3.5 py-1.5 rounded-full text-[11px] font-mono-tech font-bold uppercase tracking-wider border border-black/10 dark:border-white/15 text-zinc-600 dark:text-zinc-300 bg-black/[0.02] dark:bg-white/[0.05] group-hover:border-[#FF4F18] group-hover:text-[#FF4F18] group-hover:bg-[#FF4F18]/10 transition-all duration-300">
                      {tool.proficiency}
                    </span>
                  </div>

                  {/* Middle Content: Title, Category & Arrow */}
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-snug group-hover:text-[#FF4F18] transition-colors duration-300">
                        {tool.name}
                      </h4>
                      <ArrowUpRight className="w-5 h-5 text-[#FF4F18] opacity-0 -translate-x-1.5 translate-y-1.5 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                    </div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mt-1">
                      {tool.category}
                    </p>
                  </div>
                </div>

                {/* Animated Bottom Progress Accent Bar */}
                <div className="mt-6 h-[2.5px] w-full bg-current/10 rounded-full overflow-hidden">
                  <div
                    className="h-full w-0 group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ backgroundColor: tool.accent === '#FFFFFF' ? '#FF4F18' : tool.accent }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="works" className="py-24 px-4 sm:px-10 max-w-[1280px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-current/10 gap-6 reveal-on-scroll">
          <div>
            <div className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-widest text-[#FF4F18] font-bold mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>[01] / OUR PRODUCTS • FIRST FLAGSHIP PROJECT</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-[-0.04em] leading-none">
              SHARP <span className="font-editorial italic font-normal text-[#FF4F18]">CRACKERS.</span>
            </h2>
          </div>

          <div className="flex flex-col sm:items-end gap-3">
            <p className="max-w-md text-sm opacity-75 leading-relaxed sm:text-right">
              Our very first live client launch (<span className="font-mono-tech font-bold">sharpcrackers.com</span>) — scroll through the stacked showcase cards below to explore how we engineered their Sivakasi factory-direct store.
            </p>
            <a
              href="https://sharpcrackers.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#FF4F18] text-white text-xs font-extrabold uppercase tracking-wider shadow-lg hover:bg-[#e03e0b] hover:scale-105 transition-all"
            >
              <Globe className="w-4 h-4" />
              <span>Visit sharpcrackers.com</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Exact Scroll-Stack Card Animation from Video */}
        <div className="mt-14 relative max-w-[1120px] mx-auto pb-16">
          {SHARP_CRACKERS_STACK.map((slide, index) => {
            const depth = stackProgress[index] || 0;
            const scaleVal = Math.max(0.84, 1 - depth * 0.042);
            const brightnessVal = Math.max(0.45, 1 - depth * 0.16);
            const stickyTop = 104 + index * 22;

            return (
              <div
                key={slide.id}
                style={{
                  top: `${stickyTop}px`,
                  zIndex: index + 10
                }}
                className="product-stack-card sticky mb-10 sm:mb-14"
              >
                <div
                  style={{
                    transform: `scale(${scaleVal})`,
                    filter: `brightness(${brightnessVal})`,
                    transformOrigin: 'top center',
                    transition: 'transform 0.18s ease-out, filter 0.18s ease-out'
                  }}
                  className="relative w-full h-[360px] sm:h-[490px] rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/15 bg-[#0B0B10] shadow-[0_-18px_50px_rgba(0,0,0,0.45),0_30px_70px_rgba(0,0,0,0.4)] group"
                >
                  {slide.isLiveBrowser && (
                    <div className="absolute top-0 inset-x-0 h-10 px-5 bg-[#121218]/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between text-[11px] font-mono-tech text-zinc-300 z-20">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      </div>
                      <div className="px-3 py-0.5 rounded-md bg-black/60 border border-white/10 text-[#D9FF3F] flex items-center gap-1.5">
                        <Globe className="w-3 h-3" />
                        <span>https://sharpcrackers.com</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold hidden sm:inline">LIVE CLIENT PROJECT</span>
                    </div>
                  )}

                  <img
                    src={slide.image}
                    onError={(e) => {
                      if (slide.fallbackImage) {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = slide.fallbackImage;
                      }
                    }}
                    alt={slide.title}
                    className={`w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 ${
                      slide.isLiveBrowser ? 'pt-10' : ''
                    }`}
                  />

                  <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-white/15 via-white/50 to-white/15 pointer-events-none z-30" />

                  <a
                    href="https://sharpcrackers.com"
                    target="_blank"
                    rel="noreferrer"
                    className={`absolute right-5 sm:right-8 ${
                      slide.isLiveBrowser ? 'top-14 sm:top-16' : 'top-5 sm:top-8'
                    } z-30 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D9FF3F] text-[#0E0E10] text-xs font-extrabold uppercase tracking-wider whitespace-nowrap hover:scale-105 transition-transform shadow-xl`}
                  >
                    <span>Explore Live Store</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                  </a>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent p-6 sm:p-10 flex flex-col justify-end text-white z-20">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                      <div className="max-w-2xl space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4F18] text-white font-mono-tech text-[10px] font-bold uppercase tracking-wider shadow">
                          <span>{slide.badge}</span>
                        </div>
                        <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                          {slide.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                          {slide.desc}
                        </p>
                      </div>

                      <div className="flex flex-col items-start sm:items-end justify-end gap-3 shrink-0">
                        <div className="flex flex-wrap gap-1.5">
                          {slide.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-white"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="why-us" className="py-24 border-y border-current/10 relative z-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
          <div className="max-w-3xl mb-16">
            <div className="font-mono-tech text-xs uppercase tracking-widest text-[#FF4F18] font-bold mb-3">[02] / WHY GENZWORKS?</div>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
              Different Minds. One <span className="font-editorial italic font-normal underline decoration-[#FF4F18]">Forward Vision.</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base opacity-80 leading-relaxed">
              We believe great digital experiences emerge when technology, creativity, and collaboration work together.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16 relative">
            <div
              id="why-sticky-nav"
              className="w-full lg:w-[36%] lg:sticky lg:top-28 self-start z-20"
            >
              <div className="relative py-2 space-y-1.5">
                {WHY_GENZWORKS_PILLARS.map((p, i) => {
                  const isCurrent = activeWhyIndex === i;
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        setActiveWhyIndex(i);
                        const el = document.getElementById(`why-card-${i}`);
                        if (el) {
                          const y = el.getBoundingClientRect().top + window.scrollY - 112;
                          window.scrollTo({ top: y, behavior: 'smooth' });
                        }
                      }}
                      className={`group w-full text-left py-2.5 px-3 rounded-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center ${
                        isCurrent
                          ? 'opacity-100 translate-x-2'
                          : 'opacity-70 hover:opacity-100 translate-x-0'
                      }`}
                    >
                      <span
                        className={`text-[#FF4F18] font-extrabold text-lg leading-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center ${
                          isCurrent
                            ? 'opacity-100 translate-x-0 w-5 mr-1.5 scale-110'
                            : 'opacity-0 -translate-x-3 w-0 mr-0 scale-75 overflow-hidden'
                        }`}
                      >
                        ›
                      </span>
                      <span
                        className={`text-base sm:text-[17px] tracking-tight transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isCurrent
                            ? 'font-extrabold scale-[1.03] origin-left'
                            : 'font-medium opacity-80 scale-100'
                        }`}
                      >
                        {p.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="w-full lg:w-[64%] space-y-10 pb-24">
              {WHY_GENZWORKS_PILLARS.map((p, i) => {
                const isCurrent = activeWhyIndex === i;
                const isExpanded = expandedWhyIndex === i;
                return (
                  <div
                    key={i}
                    id={`why-card-${i}`}
                    className={`why-pillar-card scroll-mt-28 rounded-[28px] liquid-glass transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden shadow-lg ${
                      isCurrent
                        ? 'border-[#FF4F18]/50 ring-1 ring-[#FF4F18]/20 scale-[1.01]'
                        : 'opacity-95 scale-[0.99]'
                    }`}
                  >
                    <div className="p-8 sm:p-10">
                      <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">{p.title}</h3>
                      <p className="text-sm sm:text-base opacity-80 leading-relaxed mb-7">{p.desc}</p>

                      <div className="flex flex-wrap gap-2.5">
                        {p.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl liquid-glass text-xs font-semibold shadow-sm"
                          >
                            <ArrowUpRight className="w-3.5 h-3.5 text-[#FF4F18]" />
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-current/10 px-8 sm:px-10 py-5">
                      <button
                        onClick={() => setExpandedWhyIndex(isExpanded ? null : i)}
                        className="w-full flex items-center justify-between text-left group/btn cursor-pointer py-1"
                      >
                        <span className="text-sm font-bold tracking-tight transition-colors duration-300 group-hover/btn:text-[#FF4F18]">
                          {isExpanded ? 'Hide Details' : 'View Details'}
                        </span>
                        <span
                          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-sm ${
                            isExpanded
                              ? 'bg-[#FF4F18] text-white shadow-md shadow-[#FF4F18]/30 scale-105'
                              : 'bg-current/10 text-current group-hover/btn:bg-[#FF4F18] group-hover/btn:text-white group-hover/btn:scale-105'
                          }`}
                        >
                          <Plus
                            className={`w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
                              isExpanded ? 'rotate-45' : 'rotate-0'
                            }`}
                          />
                        </span>
                      </button>

                      {/* Smooth Animated Accordion Dropdown */}
                      <div
                        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isExpanded ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="pt-4 border-t border-current/10 text-xs sm:text-sm opacity-85 leading-relaxed">
                            {p.details}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="process" ref={processRef} className="py-24 px-4 sm:px-10 max-w-[1280px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-14 border-b border-current/10 gap-6 reveal-on-scroll">
          <div>
            <div className="font-mono-tech text-xs uppercase tracking-widest opacity-60 mb-3">[03] / OUR WORK PROCESS</div>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight">A Clear Direction. A <span className="font-editorial italic font-normal">Collaborative</span> Journey.</h2>
          </div>

          <div className="flex items-center gap-3 px-4 py-2.5 rounded-full liquid-glass font-mono-tech text-xs shadow-sm">
            <span>TIMELINE PROGRESS</span>
            <div className="w-24 h-2 rounded-full bg-current/10 overflow-hidden">
              <div className="h-full bg-[#FF4F18] transition-all duration-300" style={{ width: `${Math.round(processFill * 100)}%` }} />
            </div>
            <span className="font-bold">{Math.round(processFill * 100)}%</span>
          </div>
        </div>

        <div className="relative mt-16 max-w-5xl mx-auto">
          <div className="space-y-16 sm:space-y-24">
            {PROCESS_STEPS.map((step, idx) => {
              const stepRatio = (idx + 0.2) / PROCESS_STEPS.length;
              const active = processFill >= stepRatio;
              const cleanNum = step.num.replace('.', '');

              return (
                <div key={step.num} className="relative grid grid-cols-[56px_1fr] sm:grid-cols-[76px_1fr] md:grid-cols-12 gap-3.5 sm:gap-6 md:gap-10 items-stretch md:items-start">
                  {/* Left Column: Number + Vertical Stem + Glowing Pulse Node */}
                  <div className="flex flex-col items-center relative self-stretch md:self-auto md:col-span-3">
                    <div
                      className={`text-3xl sm:text-5xl md:text-7xl font-extrabold font-mono-tech tracking-tighter select-none transition-all duration-700 ${
                        active
                          ? 'text-[#FF4F18] drop-shadow-[0_0_25px_rgba(255,79,24,0.45)] scale-105'
                          : 'opacity-20 scale-95'
                      }`}
                    >
                      {cleanNum}
                    </div>

                    {/* Animated Timeline Connecting Line (Now active on mobile, tablet & desktop) */}
                    {idx < PROCESS_STEPS.length - 1 && (
                      <div className="w-[2px] flex-1 min-h-[90px] md:h-36 md:flex-initial bg-current/10 relative mt-3 md:mt-4 overflow-hidden rounded-full">
                        <div
                          className="w-full bg-gradient-to-b from-[#FF4F18] via-[#D9FF3F] to-transparent transition-all duration-500"
                          style={{
                            height: active ? '100%' : '0%'
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Right Column: Step Content Card */}
                  <div
                    className={`md:col-span-9 rounded-[24px] sm:rounded-[28px] p-5 sm:p-7 md:p-10 liquid-glass transition-all duration-700 ${
                      active
                        ? 'border-[#FF4F18]/50 shadow-[0_25px_60px_rgba(255,79,24,0.1)] translate-y-0 opacity-100'
                        : 'opacity-55 translate-y-3'
                    }`}
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4F18]/15 border border-[#FF4F18]/30 text-[#FF4F18] font-mono-tech text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-3.5 sm:mb-4">
                      <span>STEP {cleanNum}</span>
                      <span>•</span>
                      <span>{step.tag}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight mb-2 sm:mb-3">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm md:text-base opacity-75 leading-relaxed mb-5 sm:mb-6">
                      {step.desc}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5 pt-3.5 sm:pt-4 border-t border-current/10">
                      {step.deliverables.map((d, i) => (
                        <div key={i} className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl liquid-glass text-[10px] sm:text-[11px] font-bold flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF4F18] shrink-0" />
                          <span className="truncate">{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="about" className="py-24 border-t border-current/10 relative z-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20 reveal-on-scroll">
            <div className="lg:col-span-7 space-y-6">
              <div className="font-mono-tech text-xs uppercase tracking-widest opacity-60">[04] / ABOUT GENZWORKS</div>
              <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
                A New Generation of <span className="font-editorial italic font-normal underline decoration-[#FF4F18]">Digital Thinking.</span>
              </h2>
              <p className="text-sm sm:text-base opacity-80 leading-relaxed">
                GenzWorks is a growing technology and creative studio built around one simple idea: bring different skills together to make great ideas happen.
              </p>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl liquid-glass shadow-md">
                <h4 className="font-mono-tech text-xs uppercase font-bold text-[#FF4F18] mb-1">OUR MISSION</h4>
                <p className="text-xs sm:text-sm opacity-85 leading-relaxed">
                  To bring technology and creativity together to create useful, engaging, and accessible digital solutions.
                </p>
              </div>

              <div className="p-6 rounded-2xl liquid-glass shadow-md">
                <h4 className="font-mono-tech text-xs uppercase font-bold text-amber-500 mb-1">OUR VISION</h4>
                <p className="text-xs sm:text-sm opacity-85 leading-relaxed">
                  To become a trusted digital and creative studio recognized for innovative thinking and quality.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center pt-6">
            <div className="lg:col-span-4 flex flex-col items-start text-left space-y-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-current/15 bg-current/[0.03] text-xs font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-current" />
                <span>THE PEOPLE BEHIND GENZWORKS</span>
              </div>

              <h3 className="text-5xl sm:text-6xl font-bold tracking-[-0.04em] leading-[1.02]">
                Meet The <br className="hidden sm:inline" />
                Team
              </h3>

              <p className="text-sm sm:text-base opacity-70 leading-relaxed max-w-sm">
                Our team of talented designers and engineers brings fresh ideas, thoughtful design, and deep expertise to every project.
              </p>

              <button
                onClick={() => setIsJoinTeamModalOpen(true)}
                className="group relative inline-flex items-center h-14 rounded-full bg-[#1C1C1F] dark:bg-white text-white dark:text-[#0E0E10] pr-7 pl-[3.5rem] overflow-hidden shadow-xl transition-all duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-[1.03] hover:shadow-2xl cursor-pointer"
              >
                <span className="absolute left-1.5 w-11 h-11 rounded-full bg-white dark:bg-[#0E0E10] text-[#0E0E10] dark:text-white flex items-center justify-center shadow-sm transition-transform duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105">
                  <ArrowRight className="w-4 h-4 transition-transform duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-0.5" />
                </span>

                <span className="text-xs font-extrabold uppercase tracking-wider ml-1.5 transition-transform duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-1">
                  JOIN OUR TEAM
                </span>
              </button>
            </div>

            <div className="lg:col-span-8 w-full overflow-x-auto lg:overflow-visible pb-2">
              <div className="flex flex-row items-stretch gap-2.5 sm:gap-3.5 h-[430px] sm:h-[490px] min-w-[640px] sm:min-w-0 w-full select-none">
                {team.map((member, idx) => {
                  const isOpen = activeTeamIndex === idx;

                  return (
                    <div
                      key={member.id}
                      onClick={() => setActiveTeamIndex(idx)}
                      onMouseEnter={() => setActiveTeamIndex(idx)}
                      style={{
                        flex: isOpen ? '4.6 1 0%' : '1 1 0%',
                        transition: 'flex 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                      className="group/card relative h-full rounded-[24px] sm:rounded-[28px] overflow-hidden cursor-pointer bg-[#141417] shadow-lg"
                    >
                      <img
                        src={member.photo}
                        alt={member.name}
                        style={{
                          transform: isOpen ? 'scale(1)' : 'scale(1.08)',
                          transition:
                            'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), filter 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                        className={`absolute inset-0 w-full h-full object-cover object-top pointer-events-none ${
                          isOpen
                            ? 'grayscale-0 brightness-100 contrast-100'
                            : 'grayscale brightness-90 contrast-110 group-hover/card:brightness-100'
                        }`}
                      />

                      <div
                        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                          isOpen
                            ? 'bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-100'
                            : 'bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-90'
                        }`}
                      />

                      <div
                        className={`absolute inset-0 flex items-end justify-center pb-6 pointer-events-none z-20 transition-all duration-300 ${
                          isOpen ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                        }`}
                      >
                        <span
                          style={{ writingMode: 'vertical-rl' }}
                          className="rotate-180 text-white font-bold text-base sm:text-lg tracking-tight whitespace-nowrap drop-shadow-md"
                        >
                          {member.name}
                        </span>
                      </div>

                      <div
                        className={`absolute inset-0 z-20 p-5 sm:p-7 flex flex-col justify-between transition-all duration-500 ${
                          isOpen
                            ? 'opacity-100 translate-y-0 pointer-events-auto delay-75'
                            : 'opacity-0 translate-y-4 pointer-events-none'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2" onClick={(e) => e.stopPropagation()}>
                          <span className="px-3.5 py-1.5 rounded-full bg-black/35 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-tight shadow-sm">
                            {member.funkyBgRole.charAt(0) + member.funkyBgRole.slice(1).toLowerCase()}
                          </span>
                        </div>

                        <div className="space-y-3 max-w-md text-left" onClick={(e) => e.stopPropagation()}>
                          <div>
                            <h4 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                              {member.name}
                            </h4>
                            <div className="text-xs sm:text-sm text-white/75 font-medium mt-0.5">
                              {member.role}
                            </div>
                          </div>

                          <p className="text-xs sm:text-sm text-white/85 leading-relaxed line-clamp-2 sm:line-clamp-3">
                            {member.desc}
                          </p>

                          <div className="flex items-center gap-2 pt-1">
                            <a
                              href={member.socials.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              className="w-9 h-9 rounded-full bg-white/15 hover:bg-white hover:text-black backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300"
                              title="LinkedIn"
                            >
                              <Linkedin className="w-3.5 h-3.5" />
                            </a>
                            <a
                              href={member.socials.instagram}
                              target="_blank"
                              rel="noreferrer"
                              className="w-9 h-9 rounded-full bg-white/15 hover:bg-white hover:text-black backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300"
                              title="Instagram"
                            >
                              <Instagram className="w-3.5 h-3.5" />
                            </a>
                            <a
                              href={member.socials.github}
                              target="_blank"
                              rel="noreferrer"
                              className="w-9 h-9 rounded-full bg-white/15 hover:bg-white hover:text-black backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300"
                              title="GitHub"
                            >
                              <Github className="w-3.5 h-3.5" />
                            </a>
                            <a
                              href={`mailto:${BRAND_CONFIG.email}`}
                              className="w-9 h-9 rounded-full bg-white/15 hover:bg-white hover:text-black backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300"
                              title="Email"
                            >
                              <Globe className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-24 px-4 sm:px-10 max-w-[1280px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-current/10 gap-6">
          <div>
            <div className="font-mono-tech text-xs uppercase tracking-widest opacity-60 mb-3">[05] / OUR SERVICES</div>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
              Everything Your Idea Needs to <span className="font-editorial italic font-normal">Move Forward.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm opacity-75">
            We bring development, design, multimedia, and communication together to support projects from concept to completion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-14">
          {DETAILED_SERVICES.map((s, i) => {
            const isCardHovered = hoveredServiceIdx === i;

            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredServiceIdx(i)}
                onMouseLeave={() => setHoveredServiceIdx(null)}
                onClick={() => setHoveredServiceIdx(isCardHovered ? null : i)}
                style={{
                  boxShadow: isCardHovered
                    ? `0 32px 75px -10px ${s.glow}`
                    : '0 16px 40px -10px rgba(0,0,0,0.3)',
                  transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.4s ease'
                }}
                className={`group/folder relative h-[520px] sm:h-[560px] rounded-[34px] p-2.5 ${s.outerBg} ${s.outerBorder} border overflow-hidden cursor-pointer select-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2`}
              >
                <div className="relative w-full h-[320px] sm:h-[360px] rounded-[26px] overflow-hidden bg-black/40">
                  <img
                    src={s.image}
                    alt={s.title}
                    style={{
                      transform: isCardHovered ? 'scale(1.08) translateY(-4px)' : 'scale(1) translateY(0px)',
                      transition: 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/40 pointer-events-none" />
                </div>

                <div
                  style={{
                    transform: isCardHovered ? 'translateY(48px)' : 'translateY(0px)',
                    transition: 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                  className="absolute inset-x-2.5 bottom-2.5 top-[150px] sm:top-[165px] z-20 flex flex-col pointer-events-none"
                >
                  {/* Single Unified macOS Folder Background (Balanced Proportions, Zero Line) */}
                  <div className="absolute inset-0 z-0 pointer-events-none">
                    <svg
                      viewBox="0 0 400 390"
                      preserveAspectRatio="none"
                      className="w-full h-full block drop-shadow-[0_-12px_28px_rgba(0,0,0,0.32)]"
                    >
                      <defs>
                        <linearGradient id={`mac-folder-unified-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor={s.tabGradTop} />
                          <stop offset="14%" stopColor={s.tabGradMid} />
                          <stop offset="55%" stopColor={s.tabGradBot} />
                          <stop offset="100%" stopColor={s.tabGradBot} />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 0,390 L 0,26 Q 0,0 26,0 L 130,0 Q 155,0 168,18 L 180,34 Q 192,48 216,48 L 374,48 Q 400,48 400,74 L 400,364 Q 400,390 374,390 L 26,390 Q 0,390 0,364 Z"
                        fill={`url(#mac-folder-unified-${i})`}
                      />
                    </svg>
                  </div>

                  {/* Folder Tab Header Bar (Pure Bold Number without folder icon) */}
                  <div className="relative z-10 w-full h-[50px] px-5 sm:px-6 flex items-center justify-between shrink-0">
                    <span className={`text-3xl sm:text-4xl font-black font-mono-tech tracking-tighter leading-none ${s.textColor} drop-shadow-sm`}>
                      {s.num}
                    </span>

                    {/* Top-Right Dedicated Interactive Action Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectServiceFromCard(s.title);
                      }}
                      title={`Book ${s.title}`}
                      className="w-9 h-9 rounded-full bg-white text-zinc-950 hover:bg-[#D9FF3F] hover:text-black hover:scale-110 active:scale-95 transition-all duration-300 shadow-xl border border-white/40 flex items-center justify-center pointer-events-auto cursor-pointer group/arrow translate-y-1"
                    >
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/arrow:translate-x-0.5 group-hover/arrow:-translate-y-0.5" />
                    </button>
                  </div>

                  {/* Folder Body Content (Compact, Balanced & Zero Wasted Space, No Scrollbars) */}
                  <div className={`relative z-10 flex-1 px-5 sm:px-6 pt-2 pb-4 sm:pb-5 flex flex-col justify-between ${s.textColor} pointer-events-auto overflow-hidden`}>
                    <div className="space-y-1.5">
                      {/* Main Title */}
                      <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-tight drop-shadow-sm">
                        {s.title}
                      </h3>

                      {/* Subtitle */}
                      <p
                        style={{ color: s.accentColor }}
                        className="text-xs sm:text-[13px] font-semibold tracking-wide leading-snug opacity-95"
                      >
                        {s.subtitle}
                      </p>

                      {/* Description */}
                      <p className={`text-xs leading-relaxed line-clamp-2 sm:line-clamp-3 ${s.subTextColor}`}>
                        {s.desc}
                      </p>
                    </div>

                    <div className="space-y-2.5 pt-2">
                      {/* Interactive Capabilities Chips */}
                      <div className="flex flex-wrap gap-1.5">
                        {s.bullets.map((b, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectServiceFromCard(s.title);
                            }}
                            title={`Inquire about ${b}`}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border transition-all duration-200 pointer-events-auto cursor-pointer hover:scale-[1.03] active:scale-95 flex items-center gap-1.5 ${s.tagBg}`}
                          >
                            <span className="w-1 h-1 rounded-full bg-white/80 shrink-0" />
                            <span>{b}</span>
                          </button>
                        ))}
                      </div>

                      {/* Compact, Sleek Action Button */}
                      <div className="pt-1 flex items-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectServiceFromCard(s.title);
                          }}
                          className="group/btn inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-zinc-950 font-bold text-[10px] tracking-wide uppercase shadow-sm hover:shadow hover:bg-[#D9FF3F] hover:text-black active:scale-95 transition-all duration-200 pointer-events-auto cursor-pointer"
                        >
                          <span>Start Project</span>
                          <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SIMPLE, ULTRA-PREMIUM STUDIO CONTACT & FOOTER */}
      <footer id="contact" className="relative z-10 bg-[#08080A] text-[#F5F5F3] pt-24 sm:pt-32 pb-28 sm:pb-32 rounded-t-[40px] sm:rounded-t-[64px] mt-12 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-12">
          
          {/* Main Contact Split — Clean, Spacious & Refined */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 pb-24 border-b border-white/10 reveal-on-scroll">
            
            {/* Left Side: Statement & Direct Email */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-12">
              <div>
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-medium text-zinc-300 mb-7">
                  <span className="w-2 h-2 rounded-full bg-[#D9FF3F]" />
                  <span>Available for new projects — {BRAND_CONFIG.availability}</span>
                </div>

                <h2 className="text-5xl sm:text-7xl font-extrabold tracking-[-0.04em] leading-[1.15] text-white mb-8">
                  Let’s build <br />
                  something <span className="font-editorial italic font-normal text-[#D9FF3F] inline-block pr-2">great.</span>
                </h2>

                <p className="text-base sm:text-lg text-zinc-400 max-w-md leading-relaxed font-normal">
                  Have a project in mind? Reach out directly or fill out the brief. You’ll hear straight from our studio lead within 24 hours.
                </p>
              </div>

              {/* Clean Direct Contact Info */}
              <div className="space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-widest text-zinc-500 block mb-2 font-mono-tech">
                    Direct Email
                  </span>
                  <button
                    onClick={copyStudioEmail}
                    className="group inline-flex items-center gap-3 text-2xl sm:text-3xl font-bold tracking-tight text-white hover:text-[#D9FF3F] transition-colors"
                  >
                    <span>{BRAND_CONFIG.email}</span>
                    <span className="w-9 h-9 rounded-full bg-white/10 group-hover:bg-[#D9FF3F] group-hover:text-black flex items-center justify-center transition-all">
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </span>
                  </button>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-widest text-zinc-500 block mb-2 font-mono-tech">
                    Studio Phone &amp; WhatsApp
                  </span>
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => copyStudioPhone(BRAND_CONFIG.phone)}
                        className="group inline-flex items-center gap-2.5 text-lg sm:text-xl font-bold tracking-tight text-white hover:text-[#D9FF3F] transition-colors"
                      >
                        <span>{BRAND_CONFIG.phone}</span>
                        <span className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-[#D9FF3F] group-hover:text-black flex items-center justify-center transition-all">
                          {phoneCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        </span>
                      </button>
                      <a
                        href={`https://wa.me/918754277982?text=Hi%20GenzWorks,%20I'd%20like%20to%20discuss%20a%20project.`}
                        target="_blank"
                        rel="noreferrer"
                        title="Chat on WhatsApp (+91 87542 77982)"
                        aria-label="WhatsApp (+91 87542 77982)"
                        className="w-8 h-8 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-[0_2px_10px_rgba(37,211,102,0.35)] shrink-0"
                      >
                        <WhatsApp className="w-4 h-4 fill-current" />
                      </a>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => copyStudioPhone(BRAND_CONFIG.phone2)}
                        className="group inline-flex items-center gap-2.5 text-lg sm:text-xl font-bold tracking-tight text-white hover:text-[#D9FF3F] transition-colors"
                      >
                        <span>{BRAND_CONFIG.phone2}</span>
                        <span className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-[#D9FF3F] group-hover:text-black flex items-center justify-center transition-all">
                          {phoneCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        </span>
                      </button>
                      <a
                        href={`https://wa.me/919566980426?text=Hi%20GenzWorks,%20I'd%20like%20to%20discuss%20a%20project.`}
                        target="_blank"
                        rel="noreferrer"
                        title="Chat on WhatsApp (+91 95669 80426)"
                        aria-label="WhatsApp (+91 95669 80426)"
                        className="w-8 h-8 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-[0_2px_10px_rgba(37,211,102,0.35)] shrink-0"
                      >
                        <WhatsApp className="w-4 h-4 fill-current" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-zinc-400 pt-2">
                  <span>Coimbatore, Tamil Nadu</span>
                  <span className="text-white/20">•</span>
                  <span className="font-mono-tech text-xs text-zinc-300">{coimbatoreTime}</span>
                </div>
              </div>
            </div>

            {/* Right Side: Simple, Effortless Form */}
            <div className="lg:col-span-6 lg:pl-8">
              <form
                onSubmit={handleContactSubmit}
                className="space-y-8"
              >
                {/* Interactive Service Chips */}
                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-widest text-zinc-400 block font-mono-tech">
                    I'm interested in:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Web Development',
                      'Graphic Design',
                      'Commercial Posters',
                      'Academic Mentorship',
                      'Video & Multimedia',
                      'Content & Copywriting'
                    ].map((svc) => {
                      const isSelected = selectedServices.includes(svc);
                      return (
                        <button
                          key={svc}
                          type="button"
                          onClick={() => toggleServiceChip(svc)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all ${
                            isSelected
                              ? 'bg-[#D9FF3F] text-[#08080A] border-[#D9FF3F] shadow-sm font-bold'
                              : 'bg-white/[0.05] text-zinc-400 border-white/15 hover:border-white/30 hover:text-white'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '}
                          {svc}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Clean Minimalist Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div>
                    <input
                      required
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full bg-transparent border-b border-white/25 focus:border-[#D9FF3F] py-3.5 text-base text-white placeholder:text-zinc-400 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      required
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="Your email"
                      className="w-full bg-transparent border-b border-white/25 focus:border-[#D9FF3F] py-3.5 text-base text-white placeholder:text-zinc-400 focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <input
                      required
                      type="tel"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="Phone / WhatsApp"
                      className="w-full bg-transparent border-b border-white/25 focus:border-[#D9FF3F] py-3.5 text-base text-white placeholder:text-zinc-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    required
                    rows={3}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Your message..."
                    className="w-full bg-transparent border-b border-white/25 focus:border-[#D9FF3F] py-3.5 text-base text-white placeholder:text-zinc-400 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmittingForm}
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#D9FF3F] hover:bg-white text-[#08080A] font-extrabold text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-300 hover:scale-[1.02] shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmittingForm ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Sending to Sheets...</span>
                      </>
                    ) : (
                      <>
                        <span>{formSubmitted ? 'Message Sent ✓' : 'Send Message'}</span>
                        <ArrowUpRight className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>


          {/* Minimalist Navigation & Original Brand Social Icons Row */}
          <div className="py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-b border-white/10 text-sm">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 font-medium text-zinc-300">
              {[
                { id: 'home', label: 'Home' },
                { id: 'works', label: 'Products' },
                { id: 'why-us', label: 'Why Us' },
                { id: 'process', label: 'Process' },
                { id: 'about', label: 'Team' },
                { id: 'services', label: 'Services' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => jumpTo(item.id)}
                  className="hover:text-[#D9FF3F] transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Official Original Brand SVG Icons */}
            <div className="flex items-center gap-3">
              {/* Instagram Original SVG */}
              <a
                href={BRAND_CONFIG.instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                title={`Instagram (${BRAND_CONFIG.instagram})`}
                className="group w-11 h-11 rounded-full bg-white/[0.05] border border-white/15 hover:border-pink-500/50 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] flex items-center justify-center text-zinc-300 hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-md"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* GitHub Original SVG */}
              <a
                href={BRAND_CONFIG.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                title="GitHub (genzworks7-boys)"
                className="group w-11 h-11 rounded-full bg-white/[0.05] border border-white/15 hover:border-white hover:bg-white flex items-center justify-center text-zinc-300 hover:text-[#08080A] transition-all duration-300 hover:-translate-y-1 shadow-md"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Clean Legal & Copyright Bar */}
          <div className="pt-8 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
            <div className="flex items-center gap-2.5">
              <img src="/logo.png" alt="GENZWORKS Studio Logo" className="w-5 h-5 object-contain" />
              <span>© {BRAND_CONFIG.year.replace('®', '')} {BRAND_CONFIG.brandName} Studio. All rights reserved.</span>
            </div>

            <div className="flex items-center gap-6">
              <button
                onClick={() => setActiveLegalModal('terms')}
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </button>
              <button
                onClick={() => setActiveLegalModal('privacy')}
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-zinc-300 hover:text-[#D9FF3F] transition-colors font-medium"
              >
                Back to top ↑
              </button>
            </div>
          </div>
        </div>

        {/* Giant Edge-to-Edge Scroll-Triggered Gradient "GenzWorks®" Wordmark Reveal */}
        <div
          ref={footerBrandRef}
          className="relative z-10 w-full pt-6 sm:pt-8 pb-20 sm:pb-28 px-1 sm:px-4 select-none flex items-center justify-center"
        >
          {/* Apple Monochromatic Soft White Spotlight Glow behind Wordmark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-0">
            <div
              style={{
                opacity: footerBrandVisible ? 0.75 : 0,
                transition: 'opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
              }}
              className="w-[88%] h-[160px] sm:h-[240px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.03)_50%,transparent_75%)] blur-[50px] sm:blur-[80px] rounded-full pointer-events-none"
            />
          </div>

          <div className="relative z-10 inline-flex items-start justify-center leading-[1.08] sm:leading-[1.05] tracking-[-0.052em] font-extrabold text-[11.8vw] sm:text-[12.4vw] lg:text-[12.8vw]">
            {"GenzWorks".split("").map((char, index) => {
              const isLast = index === "GenzWorks".length - 1;
              return (
                <span
                  key={index}
                  className={`inline-block py-1 sm:py-2 ${isLast ? 'relative' : ''}`}
                >
                  <span
                    style={{
                      transform: footerBrandVisible ? 'translateY(0px) scale(1)' : 'translateY(52px) scale(0.96)',
                      opacity: footerBrandVisible ? 1 : 0,
                      transition: `transform 1.15s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.045}s, opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.045}s`
                    }}
                    className="inline-block footer-gradient-text hover:scale-[1.03] hover:-translate-y-2 active:scale-95 transition-transform duration-300 ease-out cursor-default"
                  >
                    {char}
                  </span>

                  {isLast && (
                    <span
                      style={{
                        transform: footerBrandVisible ? 'translateY(0px) scale(1)' : 'translateY(24px) scale(0.6)',
                        opacity: footerBrandVisible ? 1 : 0,
                        transition: 'transform 1.15s cubic-bezier(0.16, 1, 0.3, 1) 0.42s, opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.42s'
                      }}
                      className="absolute -top-2 sm:-top-3.5 md:-top-5 -right-1.5 sm:-right-3 text-[2.8vw] sm:text-[2.2vw] lg:text-[1.9vw] font-bold footer-gradient-text hover:scale-125 transition-transform duration-300 cursor-default select-none pointer-events-auto leading-none"
                      title="Copyright © GENZWORKS Studio"
                    >
                      ©
                    </span>
                  )}
                </span>
              );
            })}
          </div>
        </div>
      </footer>

      {/* Dynamic Morphing Floating Dock: Collapses to Menubar Icon during scroll; expands on hover or click */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ${
          heroRevealed ? 'framer-floating-dock' : 'opacity-0 translate-y-12'
        }`}
      >
        <div
          ref={dockRef}
          onMouseEnter={() => {
            if (dockHoverTimeoutRef.current) clearTimeout(dockHoverTimeoutRef.current);
            setDockHovered(true);
          }}
          onMouseLeave={() => {
            if (dockHoverTimeoutRef.current) clearTimeout(dockHoverTimeoutRef.current);
            dockHoverTimeoutRef.current = setTimeout(() => {
              setDockHovered(false);
            }, 90);
          }}
          onClick={() => {
            setDockManuallyOpen(true);
            setDockHovered(true);
          }}
          style={{
            width: isDockCollapsed ? '58px' : 'min(540px, calc(100vw - 24px))',
            height: '58px'
          }}
          className={`liquid-glass-dock rounded-full relative overflow-hidden select-none cursor-pointer flex items-center justify-center ${
            isDockCollapsed
              ? 'shadow-[0_16px_40px_rgba(0,0,0,0.35)] hover:scale-110 active:scale-95'
              : 'shadow-2xl'
          }`}
          title={isDockCollapsed ? 'Menu — Click or hover to open navigation' : ''}
        >
          {/* Collapsed Menubar Icon View */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isDockCollapsed
                ? 'opacity-100 scale-100 rotate-0 pointer-events-auto delay-100'
                : 'opacity-0 scale-50 rotate-90 pointer-events-none'
            }`}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setDockManuallyOpen((prev) => !prev);
                setDockHovered(true);
              }}
              className="w-full h-full flex items-center justify-center cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              <div className="relative flex items-center justify-center">
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-900 dark:text-white group-hover:text-[#D9FF3F] transition-all duration-300" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#D9FF3F] shadow-[0_0_8px_#D9FF3F] animate-pulse" />
              </div>
            </button>
          </div>

          {/* Full Expanded Dock Items View */}
          <div
            className={`w-[520px] max-w-[calc(100vw-36px)] h-full px-2 sm:px-4 flex items-center justify-between shrink-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isDockCollapsed
                ? 'opacity-0 scale-95 pointer-events-none'
                : 'opacity-100 scale-100 pointer-events-auto'
            }`}
          >
            {[
              { id: 'home', label: 'Home', icon: Home },
              { id: 'works', label: 'Products', icon: Folder },
              { id: 'why-us', label: 'Why Us', icon: Sliders },
              { id: 'process', label: 'Process', icon: Workflow },
              { id: 'about', label: 'About', icon: UserCheck },
              { id: 'services', label: 'Services', icon: Zap },
              { id: 'contact', label: 'Contact Us', icon: Mail }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              const isHovered = activeTooltip === item.id;

              return (
                <div
                  key={item.id}
                  className="relative flex items-center"
                  onMouseEnter={() => setActiveTooltip(item.id)}
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.currentTarget.blur();
                      jumpTo(item.id);
                      setDockManuallyOpen(false);
                      setDockHovered(false);
                      if (dockHoverTimeoutRef.current) clearTimeout(dockHoverTimeoutRef.current);
                    }}
                    className={`p-2 sm:p-2.5 md:p-3 rounded-full transition-all flex items-center justify-center ${
                      isActive
                        ? 'bg-[#0E0E10] text-[#D9FF3F] dark:bg-white dark:text-black scale-110 shadow-xl'
                        : 'hover:bg-black/10 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-300 hover:scale-105'
                    }`}
                    title=""
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>

                  {isHovered && (
                    <div className="absolute left-1/2 -top-10 -translate-x-1/2 px-3.5 py-1.5 rounded-full bg-[#0E0E10] text-[#D9FF3F] text-[11px] font-mono-tech font-bold uppercase tracking-wider shadow-2xl border border-[#D9FF3F]/30 whitespace-nowrap z-50 animate-fadeIn pointer-events-none">
                      {item.label}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}