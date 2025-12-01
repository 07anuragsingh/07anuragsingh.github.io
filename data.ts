import { Experience, Project, Education, SkillCategory, SocialLink } from './types';

export const personalInfo = {
  name: "Anurag Kumar Singh",
  role: "Web Developer",
  location: "Dhanbad, Jharkhand",
  email: "anuragsingh8434845379@gmail.com",
  phone: "+91 8434845379",
  summary: "Enthusiastic BCA student with a strong foundation in web development fundamentals and programming. Eager to learn modern technologies like React and SEO, and to apply problem-solving and teamwork skills in real-world projects.",
  // Placeholder image for the user's profile picture as requested
  profileImage: "/phtoto.jpg", 
};

export const skills: SkillCategory[] = [
  {
    title: "Frontend",
    skills: ["HTML5", "CSS3", "JavaScript", "React.js", "Bootstrap", "Tailwind CSS"]
  },
  {
    title: "Backend & Database",
    skills: ["Python", "Java", "Django (Learning)", "SQL", "MySQL"]
  },
  {
    title: "Tools & Others",
    skills: ["VS Code", "GitHub", "MS Office", "Responsive Design", "SEO Basics"]
  }
];

export const experiences: Experience[] = [
  {
    company: "BroTech Pvt. Solution",
    role: "Website Developer",
    date: "Feb 2025",
    type: "Freelance",
    description: [
      "Developed and launched the company's official website ensuring modern standards and cross-device compatibility.",
      "Optimized site performance and SEO structure."
    ]
  },
  {
    company: "Yhills",
    role: "Web Development Intern",
    date: "Mar 2024 – May 2024",
    type: "Internship",
    description: [
      "Enhanced front-end responsiveness and collaborated on client projects using GitHub.",
      "Worked with a team to debug and optimize web applications."
    ]
  }
];

export const projects: Project[] = [
  {
    title: "Sangwan Trading Institute Website",
    role: "Freelance Developer",
    date: "Apr 2025",
    description: [
      "Designed and deployed a responsive, SEO-optimized website using HTML5, CSS3, Bootstrap 5, and JavaScript.",
      "Handled full deployment: domain registration, hosting setup, and SSL configuration."
    ],
    tech: ["HTML5", "CSS3", "Bootstrap", "JavaScript"],
    github: "github.com/07anuragsingh/Sangwan.git"
  }
];

export const education: Education[] = [
  {
    institution: "Guru Nanak College",
    degree: "BCA",
    date: "Sep 2022 – Sep 2025",
    score: "74.5%",
    location: "Dhanbad, Jharkhand"
  },
  {
    institution: "RKS Vidya Mandir",
    degree: "Intermediate",
    date: "Apr 2019 – May 2021",
    score: "92.50%",
    location: "Dhanbad, Jharkhand"
  },
  {
    institution: "St. Thomas High School",
    degree: "Matriculation",
    date: "Apr 2018 – May 2019",
    score: "91.33%",
    location: "Dhanbad, Jharkhand"
  }
];

export const certifications = [
  "Web Development – ICS",
  "Python – GDSC",
  "Java – Infosys Springboard",
  "SQL – Udemy"
];

export const extracurricular = {
  role: "Secretary",
  org: "Rotaract Club, Guru Nanak College",
  date: "Apr 2024 – May 2025",
  description: [
    "Organized and coordinated college-wide social and community events.",
    "Managed communication, event planning, and budgeting to improve engagement."
  ]
};
