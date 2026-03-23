import {
  mobile,
  backend,
  web,
  fullstack,
  javascript,
  java,
  reactjs,
  tailwind,
  postgresql,
  otu,
  rhhs,
  wonderland,
  google,
  aws,
  python,
  cplusplus,
  typescript,
  campuscodeImage,
  bikeImage,
  protfilioImage,
  github,
  mongodb,
  microsoft,
  ibm,
} from "../assets";

export const navLinks = [
  { id: "about", title: "About" },
  { id: "education", title: "Education" },
  { id: "extracurricular", title: "Certifications" },
  { id: "skills", title: "Technical Skills" },
  { id: "projects", title: "Projects" },
  { id: "contact", title: "Contact" },
];

const services = [
  { title: "Full-Stack Developer", icon: fullstack },
  { title: "Frontend Developer", icon: web },
  { title: "Backend Developer", icon: backend },
  { title: "Problem Solver", icon: mobile },
];

const education = [
  {
    title: "B.Tech in Computer Science and Engineering",
    company_name: "Lovely Professional University, Punjab, India",
    icon: otu,
    iconBg: "#ffffff",
    date: "Aug 2023 - Present",
    points: [
      "CGPA: 7.03",
      "Focused on core CS fundamentals and software development.",
    ],
  },
  {
    title: "Intermediate (Class 12)",
    company_name: "Kendriya Vidyalaya BSF, Jodhpur, Rajasthan",
    icon: rhhs,
    iconBg: "#ffffff",
    date: "Apr 2021 - Mar 2022",
    points: ["Percentage: 70%"],
  },
  {
    title: "Matriculation (Class 10)",
    company_name: "Kendriya Vidyalaya BSF, Jodhpur, Rajasthan",
    icon: wonderland,
    iconBg: "#ffffff",
    date: "Apr 2019 - Mar 2020",
    points: ["Percentage: 86%"],
  },
];

const technologies = [
  { name: "C++", icon: cplusplus },
  { name: "JavaScript", icon: javascript },
  { name: "Python", icon: python },
  { name: "Java", icon: java },
  { name: "React JS", icon: reactjs },
  { name: "Tailwind CSS", icon: tailwind },
  { name: "MongoDB", icon: mongodb },
  { name: "MySQL", icon: postgresql },
  { name: "TypeScript", icon: typescript },
  { name: "AWS", icon: aws },
];

const itTools = [
  { name: "GitHub", icon: github },
  { name: "Node.js", icon: javascript },
  { name: "Express.js", icon: backend },
  { name: "REST APIs", icon: web },
];

const cybersecurityTools = [
  { name: "Problem Solving", icon: fullstack },
  { name: "Team Player", icon: mobile },
  { name: "Adaptability", icon: web },
  { name: "Time Management", icon: backend },
];

const designTools = [
  { name: "Frontend UI", icon: tailwind },
  { name: "Component Design", icon: reactjs },
  { name: "Responsive Layout", icon: web },
];

const experiences = [
  {
    title: "Full-Stack MERN Developer",
    company_name: "CodeArena (Project)",
    icon: ibm,
    iconBg: "#ffffff",
    date: "Jan 2026",
    points: [
      "Built a MERN competitive coding platform with role-based dashboards and contest workflow.",
      "Developed 60+ REST APIs with JWT authentication and real-time coding features.",
      "Implemented AI-driven learning assistance and analytics-focused admin workflows.",
    ],
  },
  {
    title: "Full-Stack MERN Developer",
    company_name: "BikeHub (Project)",
    icon: mongodb,
    iconBg: "#ffffff",
    date: "Sep 2025",
    points: [
      "Built a complete bike e-commerce app with authentication, admin panel, and order management.",
      "Implemented 14+ APIs for products, reviews, coupons, flash sales, and loyalty features.",
      "Delivered a responsive React and Tailwind UI with cart, wishlist, and checkout modules.",
    ],
  },
  {
    title: "DSA Trainee",
    company_name: "Lovely Professional University",
    icon: google,
    iconBg: "#ffffff",
    date: "Jun 2023 - Jul 2023",
    points: [
      "Completed Basic DSA training using C++ with OOP and algorithmic problem solving.",
      "Practiced debugging and writing efficient, structured code for real-world scenarios.",
    ],
  },
];

const extracurricular = [
  {
    title: "Cloud Computing",
    type: "NPTEL",
    icon: aws,
    iconBg: "#ffffff",
    date: "Jan 2025 - Apr 2025 (12 weeks)",
    points: [
      "Credits Recommended: 3 or 4.",
      "Project Title: Cloud Computing Concepts and Applications.",
      "Tools/Platforms: Cloud platforms (AWS/Azure) and Virtual Machines.",
    ],
    credential: "https://nptel.ac.in/",
  },
  {
    title: "Build and Deploy Apps with Google AI Studio",
    type: "HCL GUVI",
    icon: google,
    iconBg: "#ffffff",
    date: "Feb 2026",
    points: ["Hands-on exposure to AI-powered app workflows and deployment practices."],
    credential: "https://www.guvi.in/",
  },
  {
    title: "Python Basic",
    type: "HackerRank",
    icon: microsoft,
    iconBg: "#ffffff",
    date: "Jun 2025",
    points: ["Validated Python fundamentals through practical coding challenges."],
    credential: "https://www.hackerrank.com/",
  },
  {
    title: "Packet Switching Networks and Algorithm",
    type: "Coursera",
    icon: aws,
    iconBg: "#ffffff",
    date: "Nov 2024",
    points: ["Learned network fundamentals and algorithmic approaches for packet routing."],
    credential: "https://www.coursera.org/",
  },
];

const projects = [
  {
    name: "CampusCode - Competitive Coding Platform",
    description:
      "A full-stack MERN coding platform with 1000+ problems, contest management, discussion forum, and role-based dashboards for students, teachers, and admins.",
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "Node.js", color: "green-text-gradient" },
      { name: "MongoDB", color: "pink-text-gradient" },
      { name: "JWT", color: "blue-text-gradient" },
    ],
    image: campuscodeImage,
    source_code_link: "https://github.com/DhirendraHudda98/CampusCode",
    live_project_link: "https://github.com/DhirendraHudda98/CampusCode",
  },
  {
    name: "BikeHub - Bike E-Commerce Platform",
    description:
      "A MERN e-commerce application with authentication, admin dashboard, product and order management, wishlist, coupon system, and responsive shopping experience.",
    tags: [
      { name: "MERN", color: "blue-text-gradient" },
      { name: "Tailwind", color: "green-text-gradient" },
      { name: "Express", color: "pink-text-gradient" },
      { name: "Context API", color: "blue-text-gradient" },
    ],
    image: bikeImage,
    source_code_link: "https://github.com/DhirendraHudda98/BikeHub",
    live_project_link: "https://github.com/DhirendraHudda98/BikeHub",
  },
  {
    name: "Portfolio Website",
    description:
      "A 3D portfolio built with React and Three.js to present skills, certifications, and project highlights with an interactive user experience.",
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "Three.js", color: "green-text-gradient" },
      { name: "Framer Motion", color: "pink-text-gradient" },
      { name: "Vite", color: "blue-text-gradient" },
    ],
    image: protfilioImage,
    source_code_link: "https://github.com/DhirendraHudda98",
    live_project_link: "https://github.com/DhirendraHudda98",
  },
];

const testimonials = [
  {
    testimonial:
      "Solved 100+ LeetCode problems, consistently improving data structures and algorithms fundamentals.",
    name: "LeetCode Milestone",
    designation: "Achievement",
    company: "LeetCode",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    testimonial:
      "Earned HackerRank C++ Gold Level with a 5-star rating.",
    name: "HackerRank C++",
    designation: "Achievement",
    company: "HackerRank",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    testimonial:
      "Earned HackerRank C Silver Level with a 4-star rating.",
    name: "HackerRank C",
    designation: "Achievement",
    company: "HackerRank",
    image: "https://randomuser.me/api/portraits/men/13.jpg",
  },
];

export {
  services,
  technologies,
  itTools,
  cybersecurityTools,
  designTools,
  experiences,
  extracurricular,
  projects,
  education,
  testimonials,
};
