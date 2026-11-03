/**
 * Single source of truth for all portfolio content.
 *
 * Every fact below is taken from the owner's current résumé
 * (public/resume/Mohammed_Rasheen_K_Resume.pdf) or the previous version of this
 * site. Nothing is invented — if you add content, keep it verifiable.
 */

export const RESUME_URL = '/resume/Mohammed_Rasheen_K_Resume.pdf';
export const SITE_URL = 'https://rasheen.netlify.app/';

export const profile = {
  name: 'Mohammed Rasheen K',
  shortName: 'Rasheen',
  initials: 'MR',
  role: 'Java Backend / Full-Stack Developer',
  experienceYears: '3+',
  location: 'Kozhikode, Kerala, India',
  email: 'mohammedrasheen2001@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mohammed-rasheen-k-88bb6b289',
  github: 'https://github.com/rasheen404',
  currentRole: { title: 'Java Developer', company: 'Lenok Solutions', since: 'February 2024' },
  // From the résumé summary.
  summary:
    'Java Backend / Full-Stack Developer with 3+ years of experience developing enterprise applications ' +
    'in the airline and airport domain. Experienced in Java, Spring Boot, Spring Security, Spring Authorization ' +
    'Server, Apache Struts, REST APIs, Oracle, Redis, OAuth2, OpenID Connect, JWT, SAML SSO, Docker and Jenkins, ' +
    'with a strong background in secure application development, CI/CD, API integration, performance ' +
    'optimisation and Agile software delivery.',
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
    'Java and Spring Boot developer building secure REST APIs, single sign-on and enterprise software — ' +
    'currently for the airline and airport domain at Lenok Solutions.',
  meta: [
    { label: 'Currently', value: 'Java Developer, Lenok Solutions' },
    { label: 'Focus', value: 'REST APIs · Security · SSO' },
    { label: 'Based in', value: 'Kozhikode, India' },
    { label: 'Status', value: 'Open to opportunities', status: true },
  ],
};

export const about = {
  heading: 'Dependable software, built from the backend out.',
  paragraphs: [
    'I’m Mohammed Rasheen K, a Java backend and full-stack developer in Kozhikode, Kerala, with 3+ years of experience. Since February 2024 I’ve built enterprise software for the airline and airport domain at Lenok Solutions — Airport Management System modules and the REST APIs behind its web and mobile applications.',
    'Most of my work is in Java, Spring Boot and Apache Struts on Oracle and Redis: modules for airport operations, ground handling and contract management, third-party API integrations, and backend services for business workflows that have to stay reliable.',
    'Security runs through all of it. I’ve implemented Spring Security with OAuth2, JWT, SAML single sign-on and Azure AD login, resolved CSRF, IDOR and dependency vulnerabilities following OWASP practices, and kept code quality high with SonarQube, SonarLint and PMD.',
  ],
  glance: [
    { label: 'Role', value: 'Java Developer, Lenok Solutions' },
    { label: 'Experience', value: '3+ years · at Lenok since Feb 2024' },
    { label: 'Domain', value: 'Airline & airport — enterprise web, API and mobile' },
    { label: 'Core stack', value: 'Java · Spring Boot · Spring Security · REST' },
    { label: 'Education', value: 'B.Tech CSE, APJ Abdul Kalam Technological University (2019 — 2023)' },
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
    scope: 'Enterprise applications for the airline and airport domain — web, API and mobile.',
    // Qualitative highlights: the current résumé states no figures, so none are shown.
    impact: [
      { value: 'SSO', label: 'OAuth2, JWT, SAML and Azure AD login' },
      { value: 'OWASP', label: 'CSRF, IDOR and dependency fixes' },
      { value: 'Struts 7', label: 'legacy modules migrated, backward compatible' },
      { value: 'REST', label: 'APIs for web and mobile apps' },
      { value: 'CI/CD', label: 'Maven, Jenkins and Docker' },
    ],
    points: [
      'Developed enterprise Airport Management System modules using Java, Spring Boot, Apache Struts and Oracle Database.',
      'Implemented Spring Security authentication, OAuth2, JWT, SAML single sign-on and Azure AD login integration.',
      'Designed and maintained REST APIs for web and mobile applications consumed across airport operational systems.',
      'Resolved security vulnerabilities including CSRF, IDOR and dependency issues following OWASP secure coding practices.',
      'Migrated legacy modules to Apache Struts 7 and upgraded enterprise dependencies while maintaining backward compatibility.',
      'Developed backend services using Redis and Oracle for scalable and reliable business workflows.',
      'Used SonarQube, SonarLint and PMD to improve code quality and reduce technical debt.',
      'Built and deployed applications using Maven, Jenkins and Docker within Agile Scrum teams.',
    ],
    stack: ['Java', 'Spring Boot', 'Spring Security', 'Apache Struts 7', 'Oracle', 'Redis', 'OAuth2', 'JWT', 'SAML SSO', 'Azure AD', 'Jenkins', 'Docker', 'SonarQube'],
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
    org: 'APJ Abdul Kalam Technological University, Kerala',
    period: '2019 — 2023',
    kind: 'Education',
  },
  {
    title: 'Java Full Stack Engineer Trainee',
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
    category: 'Aviation · Enterprise software',
    context: 'Professional project',
    period: '2024 — Present',
    diagram: 'ams',
    summary:
      'Enterprise modules for airport operations, ground handling and contract management, with REST APIs serving web and mobile applications.',
    problem:
      'Airport teams needed dependable modules for operations, ground handling and contracts — integrated with third-party systems, secured, and auditable.',
    contribution: [
      'Developed AMS modules for airport operations, ground handling and contract management using Java, Spring Boot, Apache Struts and Oracle.',
      'Designed and maintained REST APIs for the web and mobile applications.',
      'Integrated third-party APIs and optimised backend workflows.',
      'Implemented audit logging, secure authentication and API enhancements.',
    ],
    challenges: [
      'Integrating third-party APIs into airport workflows while keeping backend processing efficient.',
      'Adding audit logging and secure authentication to operational modules where every action matters.',
      'Serving one set of REST APIs reliably to both web and mobile applications.',
    ],
    highlights: ['Audit logging', 'Secure authentication', 'Third-party API integration'],
    stack: ['Java', 'Spring Boot', 'Apache Struts', 'Oracle', 'REST APIs', 'Docker'],
    links: [],
    linkNote: 'Client work — source code and screenshots are confidential.',
  },
  {
    id: 'auth',
    name: 'Spring Authorization Server',
    shortName: 'Auth Server',
    category: 'Security · Identity',
    context: 'Backend project',
    period: '2026',
    diagram: 'auth',
    summary:
      'An OAuth2 and OpenID Connect authorization server with JWT authentication, refresh tokens and role-based access control.',
    problem:
      'Applications needed one secure, standards-based place for login, registration and tokens instead of re-implementing authentication in every service.',
    contribution: [
      'Built an OAuth2 / OpenID Connect authorization server using Spring Authorization Server.',
      'Implemented JWT authentication, refresh tokens and role-based access control.',
      'Developed secure login, registration and token management APIs.',
    ],
    challenges: [
      'Implementing OAuth2 and OpenID Connect flows correctly on Spring Authorization Server.',
      'Managing the token lifecycle — issuing JWTs and renewing sessions with refresh tokens.',
      'Enforcing role-based access control consistently across protected APIs.',
    ],
    highlights: ['Refresh tokens', 'Role-based access control', 'Token management APIs'],
    stack: ['Java', 'Spring Boot', 'Spring Authorization Server', 'Spring Security', 'OAuth2', 'OpenID Connect', 'JWT'],
    links: [],
    linkNote: 'Source is not public.',
  },
  {
    id: 'tunehub',
    name: 'TuneHub',
    shortName: 'TuneHub',
    category: 'Full-stack web application',
    context: 'Training project',
    period: '2023 — 2024',
    diagram: 'tunehub',
    summary:
      'A music web application with user accounts, playlist management and paid premium subscriptions.',
    problem:
      'Listeners needed secure accounts and personal playlists, and premium features had to be unlocked through real payments.',
    contribution: [
      'Built authentication, playlist and subscription modules using Spring Boot and JPA.',
      'Integrated the Razorpay payment gateway for premium subscriptions.',
      'Implemented an exception-handling framework and request validation across the API.',
    ],
    challenges: [
      'Gating premium features behind a payment flow that had to complete reliably.',
      'Handling errors consistently through a shared exception-handling framework.',
      'Modelling users, playlists and songs with Spring Data JPA on MySQL.',
    ],
    highlights: ['Razorpay payments', 'Exception-handling framework', 'Playlist management'],
    stack: ['Java 17', 'Spring Boot', 'Spring Data JPA', 'MySQL', 'Thymeleaf', 'Razorpay'],
    links: [],
    linkNote: null,
  },
];

export const coreStrengths = [
  { name: 'Java', note: 'Primary language across every role and project' },
  { name: 'Spring Boot', note: 'Enterprise services, data access and integration' },
  { name: 'Spring Security', note: 'OAuth2, JWT, SAML SSO and Azure AD login' },
  { name: 'REST APIs', note: 'Designed for web, mobile and third-party consumers' },
];

export const skillGroups = [
  {
    id: 'backend',
    title: 'Backend Engineering',
    icon: 'server',
    items: ['Java', 'Spring Boot', 'Spring Framework', 'Hibernate', 'JPA', 'Apache Struts 7', 'Microservices', 'Spring AI'],
  },
  {
    id: 'api',
    title: 'APIs & Security',
    icon: 'api',
    items: ['REST APIs', 'Spring Security', 'Spring Authorization Server', 'OAuth2', 'OpenID Connect', 'JWT', 'SAML SSO', 'Azure AD integration', 'Secure coding (OWASP)'],
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
    items: ['React.js', 'JavaScript', 'JSP', 'jQuery', 'Bootstrap', 'HTML', 'CSS'],
  },
  {
    id: 'cloud',
    title: 'DevOps',
    icon: 'cloud',
    items: ['Maven', 'Jenkins', 'Docker', 'Git', 'CI/CD'],
  },
  {
    id: 'tools',
    title: 'Tools & Practices',
    icon: 'tools',
    items: ['Postman', 'Swagger', 'JUnit', 'SonarQube', 'SonarLint', 'PMD', 'SDLC', 'Agile Scrum'],
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
