import React from 'react';

export const STUDIO_TOOLS = [
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

export const FLOATING_3D_ICONS = [
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
