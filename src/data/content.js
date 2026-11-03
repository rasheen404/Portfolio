/**
 * Single source of truth for all portfolio content.
 *
 * Every fact below is taken from the owner's résumé (public/resume) or the
 * previous version of this site. Nothing is invented — if you add content,
 * keep it verifiable.
 */

export const RESUME_URL = '/resume/Mohammed_Rasheen_K_Resume.pdf';
export const SITE_URL = 'https://rasheen.netlify.app/';

export const profile = {
  name: 'Mohammed Rasheen K',
  shortName: 'Rasheen',
  initials: 'MR',
  role: 'Java Backend Developer',
  location: 'Kozhikode, Kerala, India',
  email: 'mohammedrasheen2001@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mohammed-rasheen-k-88bb6b289',
  github: 'https://github.com/rasheen404',
  currentRole: { title: 'Java Developer', company: 'Lenok Solutions', since: 'February 2024' },
  // From the résumé summary.
  summary:
    'Software developer specialising in Java backend and full-stack development since 2024. ' +
    'I design and deploy microservice-based systems with Java, Spring Boot and RESTful APIs, ' +
    'with hands-on experience in CI/CD automation, Docker containerisation, AWS integration and ' +
    'database performance tuning — focused on secure, reliable enterprise applications.',
};

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export const hero = {
  headline: { plain: 'I build the systems behind', accent: 'seamless experiences.' },
  lead:
    'Java and Spring Boot engineer building reliable APIs, microservices and enterprise software — ' +
    'currently for the airline and airport domain at Lenok Solutions.',
  meta: [
    { label: 'Currently', value: 'Java Developer, Lenok Solutions' },
    { label: 'Focus', value: 'APIs · Microservices · Identity' },
    { label: 'Based in', value: 'Kozhikode, India' },
    { label: 'Status', value: 'Open to opportunities', status: true },
  ],
};

export const about = {
  heading: 'Dependable software, built from the backend out.',
  paragraphs: [
    'I’m Mohammed Rasheen K, a Java developer based in Kozhikode, Kerala. Since February 2024 I’ve worked at Lenok Solutions on aviation software for the airline and airport domain — the web platforms, APIs and mobile backends behind day-to-day operations.',
    'Most of my work lives in Spring Boot microservices: designing REST APIs, integrating third-party services for flight scheduling and terminal management, and keeping data consistent across services backed by Oracle and Redis.',
    'I care about software that is dependable before it is clever. That means clean, reviewable code held to SonarLint and PMD standards, issues traced through logs and Swagger instead of guesswork, and CI/CD pipelines that make every release routine.',
  ],
  glance: [
    { label: 'Role', value: 'Java Developer, Lenok Solutions' },
    { label: 'Since', value: 'February 2024' },
    { label: 'Domain', value: 'Airline & airport — web, API and mobile' },
    { label: 'Core stack', value: 'Java · Spring Boot · Microservices · REST' },
    { label: 'Education', value: 'B.Tech, Computer Science & Engineering (2019 — 2023)' },
    { label: 'Location', value: 'Kozhikode, Kerala, India' },
    { label: 'Status', value: 'Open to new opportunities', status: true },
  ],
};

export const experience = [
  {
    id: 'lenok',
    role: 'Java Developer',
    company: 'Lenok Solutions',
    location: 'Kozhikode, India',
    period: 'Feb 2024 — Present',
    start: '2024-02',
    current: true,
    scope: 'Airline and airport domain — web, API and mobile applications.',
    // Figures are the owner's own, as stated on the résumé.
    impact: [
      { value: '99.9%', label: 'uptime for live services' },
      { value: '40%', label: 'shorter release time' },
      { value: '25%', label: 'faster data processing' },
      { value: '20%', label: 'fewer code-review defects' },
      { value: '15%', label: 'fewer sprint delivery delays' },
    ],
    points: [
      'Enhanced aviation software with Java, Spring Boot and microservices, developing and integrating backend modules for 5+ microservices on Redis and Oracle.',
      'Implemented CI/CD pipelines with Jenkins and Docker, working with the frontend team on integration and automated deployment.',
      'Diagnosed and resolved API issues in live services using Postman, Swagger and logs.',
      'Refactored and optimised backend code to SonarLint and PMD standards.',
      'Worked across every SDLC phase in an Agile Scrum team.',
    ],
    stack: ['Java', 'Spring Boot', 'Microservices', 'Oracle', 'Redis', 'Jenkins', 'Docker', 'Swagger', 'Postman', 'SonarLint', 'PMD'],
  },
  {
    id: 'kodnest',
    role: 'Java Full-Stack Engineer Trainee',
    company: 'KodNest Technologies',
    location: null,
    type: 'Internship',
    period: 'Jun 2023 — Jan 2024',
    start: '2023-06',
    current: false,
    scope: 'Internship and Java full-stack training programme, certified January 2024.',
    impact: [],
    points: [
      'Assisted in the development of Java-based applications.',
      'Participated in code reviews and learned best practices for writing clean code.',
      'Collaborated with the team on bug fixing and feature enhancements.',
    ],
    stack: ['Java'],
  },
];

export const education = [
  {
    title: 'B.Tech in Computer Science and Engineering',
    org: 'APJ Abdul Kalam Technical University, Kerala',
    period: '2019 — 2023',
    kind: 'Education',
  },
  {
    title: 'Java Full-Stack Engineer Trainee',
    org: 'KodNest',
    period: 'Issued Jan 2024',
    kind: 'Certification',
  },
];

export const projects = [
  {
    id: 'ams',
    name: 'Airport Management System',
    shortName: 'AMS',
    category: 'Aviation · Enterprise integration',
    context: 'Professional project',
    period: 'Feb 2024 — Jun 2024',
    diagram: 'ams',
    summary:
      'Backend services and APIs connecting airport operations — flight scheduling and terminal management — to web and mobile clients.',
    problem:
      'Flight-scheduling and terminal-management workflows depended on third-party systems, and the web and mobile teams needed stable, well-documented APIs to build on.',
    contribution: [
      'Translated business requirements into functional, efficient application logic.',
      'Designed and implemented APIs for the mobile application.',
      'Integrated third-party APIs for flight scheduling and terminal management.',
      'Collaborated with frontend and mobile teams through Swagger and Postman.',
      'Containerised backend services with Docker for consistent deployments.',
    ],
    challenges: [
      'Keeping API contracts aligned across backend, frontend and mobile teams — documented and exercised through Swagger and Postman.',
      'Turning external flight and terminal services into dependable internal workflows.',
      'Shipping identical builds to every environment by containerising the backend.',
    ],
    outcomes: [
      { value: '40%', label: 'of workflows automated through third-party API integration' },
      { value: '25%', label: 'fewer integration issues with frontend and mobile teams' },
    ],
    stack: ['Java', 'Spring Boot', 'REST APIs', 'Docker', 'Swagger', 'Postman'],
    links: [],
    linkNote: 'Client work — source code and screenshots are confidential.',
  },
  {
    id: 'auth',
    name: 'Spring Authorization Server',
    shortName: 'Auth Server',
    category: 'Security · Identity',
    context: 'Backend project',
    period: 'Jun 2024 — Present',
    diagram: 'auth',
    summary:
      'A centralised OAuth 2.0 and OpenID Connect authorization server that issues JWTs to the microservices in a distributed system.',
    problem:
      'Each microservice needed a secure, standards-based way to authenticate clients without sharing session state between services.',
    contribution: [
      'Built an OAuth 2.0 / OpenID Connect authorization server on Spring Authorization Server.',
      'Applied JWT-based authentication with configurable expiry and logout management.',
      'Managed client registrations and token issuance for consuming microservices.',
      'Configured Maven and Jenkins pipelines for automated builds and deployments.',
    ],
    challenges: [
      'Implementing OAuth 2.0 and OIDC flows correctly, including per-service client registration.',
      'Handling the JWT lifecycle — expiry and logout — while keeping communication stateless.',
      'Automating build and deployment so security changes ship safely and repeatably.',
    ],
    outcomes: [
      { value: '30%', label: 'less manual build and deployment work with Maven and Jenkins' },
    ],
    stack: ['Java', 'Spring Authorization Server', 'Spring Security', 'OAuth 2.0', 'OpenID Connect', 'JWT', 'Maven', 'Jenkins'],
    links: [],
    linkNote: 'Source is not public.',
  },
  {
    id: 'tunehub',
    name: 'TuneHub',
    shortName: 'TuneHub',
    category: 'Full-stack web application',
    context: 'Training project',
    period: 'Jul 2023 — Jan 2024',
    diagram: 'tunehub',
    summary:
      'A music web application with user accounts, playlist and music management, and paid premium subscriptions.',
    problem:
      'Listeners needed secure accounts and personal playlists, and premium features had to be unlocked through real payments.',
    contribution: [
      'Developed secure user authentication and registration modules.',
      'Built playlist and music management modules with Spring Boot and JPA.',
      'Integrated the Razorpay payment gateway for premium subscriptions.',
      'Implemented request validation and exception handling across the API.',
    ],
    challenges: [
      'Gating premium features behind a payment flow that had to succeed reliably.',
      'Validating requests and handling exceptions consistently for a stable, maintainable codebase.',
      'Modelling users, playlists and songs with Spring Data JPA on MySQL.',
    ],
    outcomes: [
      { value: '100%', label: 'transaction success for premium subscriptions via Razorpay' },
    ],
    stack: ['Java 17', 'Spring Boot', 'Spring Data JPA', 'MySQL', 'Thymeleaf', 'Razorpay'],
    links: [],
    linkNote: null,
  },
];

export const coreStrengths = [
  { name: 'Java', note: 'Primary language across every role and project' },
  { name: 'Spring Boot', note: 'Services, data access, security and integration' },
  { name: 'Microservices', note: 'Backend modules for 5+ services in production' },
  { name: 'REST APIs', note: 'Designed for web, mobile and third-party consumers' },
];

export const skillGroups = [
  {
    id: 'backend',
    title: 'Backend Engineering',
    icon: 'server',
    items: ['Java', 'Spring Boot', 'Spring', 'Microservices', 'Hibernate', 'JPA', 'Struts2', 'OOP', 'Data Structures & Algorithms'],
  },
  {
    id: 'api',
    title: 'APIs & Security',
    icon: 'api',
    items: ['RESTful APIs', 'Spring Authorization Server', 'OAuth 2.0 / OIDC', 'JWT', 'SAML SSO', 'Swagger', 'XML'],
  },
  {
    id: 'data',
    title: 'Databases',
    icon: 'database',
    items: ['Oracle', 'MySQL', 'Redis', 'SQL'],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: 'layout',
    items: ['React.js', 'JavaScript', 'HTML', 'CSS', 'JSP'],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    icon: 'cloud',
    items: ['AWS S3', 'Docker', 'Jenkins', 'Maven', 'CI/CD pipelines'],
  },
  {
    id: 'tools',
    title: 'Tools & Practices',
    icon: 'tools',
    items: ['Git', 'Postman', 'JUnit', 'IntelliJ IDEA', 'Eclipse', 'SonarLint', 'PMD', 'Agile Scrum'],
  },
];

export const workingStyle = [
  'Cross-functional collaboration',
  'Analytical problem-solving',
  'Clear communication',
  'Adaptability',
  'Leadership',
  'Time management',
];
