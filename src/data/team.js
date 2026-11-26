import { resolveMemberPhoto } from '../teamImages.js';

export const INITIAL_TEAM = [
  {
    id: "team-1",
    num: "1",
    hashtag: "#teamlead",
    funkyBgRole: "TEAM LEAD",
    role: "Team Lead | Design & Development",
    name: "Mohammed Ali Khan",
    desc: "Leads project planning, team coordination, design direction, and full-stack delivery.",
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
    desc: "Builds backend logic, APIs, and databases that keep applications fast and reliable.",
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
    desc: "Turns concepts into clean interfaces and smooth user-friendly web experiences.",
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
    desc: "Runs quality reviews, catches edge bugs, and validates final launch readiness.",
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
    desc: "Handles usability testing and visual checks for consistent quality across screens.",
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
    desc: "Creates engaging video edits, reels, motion graphics, and visual storytelling assets.",
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
    desc: "Manages build pipelines, hosting environments, and smooth zero-downtime launches.",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=85",
    socials: { linkedin: "https://www.linkedin.com/in/jayasolomon-k-634488319", github: "https://github.com/jayasolomon-dev", instagram: "https://www.instagram.com/_itz_santa_official_/" }
  }
];

export const CAREER_ROLES = [
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

export { resolveMemberPhoto };
