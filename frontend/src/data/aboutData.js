// data/aboutData.js
export const personalInfo = {
  name: "John Doe",
  title: "Full-Stack Developer & UI/UX Designer",
  bio: "Passionate developer with 8+ years of experience creating beautiful, functional, and scalable web applications. I love solving complex problems and building innovative solutions that make a difference.",
  longBio: "I started my journey in web development 8 years ago, and since then, I've had the privilege of working with startups, agencies, and enterprise companies. My passion lies in creating seamless user experiences and writing clean, maintainable code. I believe in continuous learning and staying updated with the latest technologies.",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  birthday: "March 15, 1990",
  experience: "8+ Years",
  projects: "50+",
  clients: "100+",
  awards: "15+",
  avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200"
};

export const skills = {
  technical: [
    { name: "React/Next.js", level: 95, years: 6, icon: "Code" },
    { name: "Vue.js/Nuxt", level: 85, years: 4, icon: "Code" },
    { name: "Node.js/Express", level: 90, years: 5, icon: "Code" },
    { name: "Python/Django", level: 85, years: 4, icon: "Code" },
    { name: "TypeScript", level: 90, years: 4, icon: "Code" },
    { name: "TailwindCSS", level: 95, years: 3, icon: "Code" },
    { name: "GraphQL", level: 80, years: 3, icon: "Code" },
    { name: "MongoDB/PostgreSQL", level: 85, years: 5, icon: "Code" }
  ],
  soft: [
    { name: "Communication", level: 95, description: "Excellent verbal and written communication" },
    { name: "Leadership", level: 90, description: "Led teams of 5+ developers" },
    { name: "Problem Solving", level: 98, description: "Complex problem solver" },
    { name: "Time Management", level: 92, description: "Delivered projects on time" },
    { name: "Team Collaboration", level: 95, description: "Great team player" },
    { name: "Adaptability", level: 93, description: "Quick learner of new tech" }
  ]
};

export const experiences = [
  {
    id: 1,
    title: "Senior Full-Stack Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    period: "2022 - Present",
    description: "Leading development of enterprise web applications, mentoring junior developers, and architecting scalable solutions.",
    achievements: [
      "Increased application performance by 40%",
      "Led team of 5 developers",
      "Implemented CI/CD pipeline reducing deployment time by 60%",
      "Received Employee of the Month award"
    ],
    technologies: ["React", "Node.js", "TypeScript", "AWS", "MongoDB"]
  },
  {
    id: 2,
    title: "Full-Stack Developer",
    company: "InnovateLabs",
    location: "New York, NY",
    period: "2019 - 2022",
    description: "Developed and maintained multiple client projects, from e-commerce platforms to analytics dashboards.",
    achievements: [
      "Delivered 20+ successful projects",
      "Reduced bug rate by 35% through testing",
      "Improved client satisfaction score to 98%",
      "Created reusable component library"
    ],
    technologies: ["Vue.js", "Django", "PostgreSQL", "Docker", "Redis"]
  },
  {
    id: 3,
    title: "Junior Web Developer",
    company: "StartupHub",
    location: "Austin, TX",
    period: "2017 - 2019",
    description: "Started career in web development, building responsive websites and learning modern frameworks.",
    achievements: [
      "Built 15+ responsive websites",
      "Implemented SEO best practices",
      "Received Rookie of the Year award",
      "Created internal tools used by 100+ employees"
    ],
    technologies: ["JavaScript", "PHP", "MySQL", "jQuery", "Bootstrap"]
  }
];

export const education = [
  {
    id: 1,
    degree: "Master of Science in Computer Science",
    institution: "Stanford University",
    location: "California, USA",
    period: "2015 - 2017",
    description: "Specialized in Web Technologies and Human-Computer Interaction.",
    achievements: ["GPA: 3.9/4.0", "Teaching Assistant for Web Development course", "Published research paper on Web Performance"]
  },
  {
    id: 2,
    degree: "Bachelor of Engineering in Computer Science",
    institution: "University of Texas",
    location: "Austin, TX",
    period: "2011 - 2015",
    description: "Foundation in computer science principles and software engineering.",
    achievements: ["Graduated with Honors", "Dean's List all semesters", "Led university coding club"]
  }
];

export const certifications = [
  { name: "AWS Certified Solutions Architect", issuer: "Amazon", year: "2023", credential: "AWS-12345" },
  { name: "Meta React Native Specialization", issuer: "Meta", year: "2023", credential: "META-67890" },
  { name: "Google Professional Cloud Developer", issuer: "Google", year: "2022", credential: "GOOG-11111" },
  { name: "MongoDB Certified Developer", issuer: "MongoDB", year: "2022", credential: "MDB-22222" }
];

export const interests = [
  { name: "Open Source", icon: "Code", description: "Contributing to open source projects" },
  { name: "Reading", icon: "Book", description: "Tech blogs and sci-fi novels" },
  { name: "Music", icon: "Music", description: "Playing guitar and producing music" },
  { name: "Photography", icon: "Camera", description: "Street and nature photography" },
  { name: "Coffee", icon: "Coffee", description: "Coffee enthusiast and home brewing" },
  { name: "Travel", icon: "Globe", description: "Exploring new cultures and places" }
];

export const stats = [
  { icon: "Briefcase", value: "8+", label: "Years Experience", color: "from-blue-500 to-cyan-500" },
  { icon: "Code", value: "50+", label: "Projects Completed", color: "from-purple-500 to-pink-500" },
  { icon: "Users", value: "100+", label: "Happy Clients", color: "from-green-500 to-emerald-500" },
  { icon: "Award", value: "15+", label: "Awards Won", color: "from-yellow-500 to-orange-500" },
  { icon: "Coffee", value: "1000+", label: "Coffee Cups", color: "from-brown-500 to-amber-500" },
  { icon: "Heart", value: "∞", label: "Passion", color: "from-red-500 to-rose-500" }
];