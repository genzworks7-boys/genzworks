import { resolveMemberPhoto } from '../teamImages.js';

export const INITIAL_TEAM = [
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
