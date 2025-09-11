import React from 'react';
import cvFile from "./assets/RESUME.pdf";
import {
    BriefcaseIcon,
    GraduationCapIcon,
    SchoolIcon,
    HibernateIcon,
    ApiIcon,
    DatabaseIcon,
    AwsIcon,
    MavenIcon,
    PostmanIcon,
    ShieldCheckIcon,
} from './components/Icons';

export const SkillIcons = {
    Java: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M14.15 3.064c-1.25.438-2.25 1.625-2.25 3.063v3.75h-1.875v-3.75c0-1.438-.938-2.625-2.25-3.063C6.438 2.563 5.25 3.5 5.25 4.813v11.624c0 1.313 1.188 2.25 2.531 1.813 1.25-.438 2.25-1.625 2.25-3.063v-1.875h1.875v1.875c0 1.438.938 2.625 2.25 3.063 1.312.5 2.53-.438 2.53-1.813V4.814c0-1.313-1.188-2.25-2.531-1.75zM12 11.25H9.375V9.375H12v1.875z"/></svg>,
    SpringBoot: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M21.5,14.7V9.3c0-0.6-0.4-1-1-1h-2.6c-0.4-1.2-1-2.3-1.9-3.3c-0.4-0.4-1-0.5-1.4-0.1c-1,0.9-2.1,1.6-3.3,1.9 c-0.5,0.1-0.9,0.5-1,1v2.6C9,10.1,7.9,9.5,6.7,8.9C6.2,8.7,5.6,8.9,5.3,9.4C4.3,11,4,12.9,4.3,14.7c0.2,0.5,0.6,0.9,1.2,0.8 c1.2-0.3,2.3,0.1,3.2,0.8c0.4,0.3,0.9,0.3,1.3-0.1c0.9-1,1.6-2.1,1.9-3.3c0.1-0.5,0.5-0.9,1-1h2.6c0.6,0,1,0.4,1,1v5.4 c0,0.6,0.4,1,1,1h2.2C21.1,20.1,21.5,17.6,21.5,14.7z"/></svg>,
    Git: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22.8,10.4c-0.3-0.3-0.7-0.4-1.1-0.4h-3.4C18.1,9,17.4,8,16.5,7.1c-1.2-1.2-2.8-1.8-4.5-1.8 c-1.7,0-3.3,0.7-4.5,1.8c-0.9,0.9-1.6,1.9-1.8,3.2H2.3c-0.4,0-0.8,0.2-1.1,0.4C1,10.7,0.9,11.1,0.9,11.5c0,0.4,0.2,0.8,0.4,1.1 l7.1,7.1c0.3,0.3,0.7,0.4,1.1,0.4h3c0.4,0,0.8-0.2,1.1-0.4l7.1-7.1c0.3-0.3,0.4-0.7,0.4-1.1C23.1,11.1,23,10.7,22.8,10.4z M12,14.7c-1.5,0-2.7-1.2-2.7-2.7c0-1.5,1.2-2.7,2.7-2.7s2.7,1.2,2.7,2.7C14.7,13.5,13.5,14.7,12,14.7z"/></svg>,
    Docker: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22.4,12.3c-0.2-0.7-0.9-1.2-1.7-1.2h-3.3V7.8c0-0.5-0.4-0.9-0.9-0.9h-3.3V3.6c0-0.5-0.4-0.9-0.9-0.9H4.1 c-0.5,0-0.9,0.4-0.9,0.9v10.3c0,0.3,0.1,0.6,0.4,0.8c0.6,0.6,1.4,0.9,2.2,0.9h12.5c1.4,0,2.6-1.2,2.6-2.6 C23.1,13.2,22.9,12.7,22.4,12.3z M8.9,8.7h1.8v1.8H8.9V8.7z M8.9,11.4h1.8v1.8H8.9V11.4z M6.2,8.7h1.8v1.8H6.2V8.7z M6.2,11.4 h1.8v1.8H6.2V11.4z M11.6,8.7h1.8v1.8h-1.8V8.7z"/></svg>,
    Hibernate: () => <HibernateIcon />,
    RESTfulAPIs: () => <ApiIcon />,
    JPA: () => <DatabaseIcon />,
    SQL: () => <DatabaseIcon />,
    AWSS3: () => <AwsIcon />,
    Maven: () => <MavenIcon />,
    Postman: () => <PostmanIcon />,
};

export const ProjectIcons = {
    "Airport Management System": () => <svg className="w-24 h-24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" strokeWidth="1.5"/><path d="M3.27 6.96L12 12.01l8.73-5.05" stroke="currentColor" strokeWidth="1.5"/><path d="M12 22.08V12" stroke="currentColor" strokeWidth="1.5"/></svg>,
    "Spring Auth Server": () => <ShieldCheckIcon />,
    "TuneHub App": () => <svg className="w-24 h-24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="1.5"/><path d="M9 18a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" stroke="currentColor" strokeWidth="1.5"/><path d="M21 16a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" stroke="currentColor" strokeWidth="1.5"/></svg>
};

export const portfolioData = {
    name: "Mohammed Rasheen",
    title: "Java Full-Stack Engineer",
    email: "mohammedrasheen2001@gmail.com",
    location: "Kerala, India",
     linkedin: "https://www.linkedin.com/in/mohammed-rasheen-k-88bb6b289",
    github: "https://github.com/rasheen404",
    cv_url: cvFile,
    summary: "A dynamic Java Full-Stack Engineer with two years of professional experience in engineering enterprise-level applications. My expertise lies in architecting scalable microservices and secure REST APIs with the Spring Framework. I am driven by the challenge of solving complex problems with clean, object-oriented code and am eager to contribute my skills to a forward-thinking team dedicated to innovation.",
    skills: {
        "Tools & Technologies": ["Java", "SpringBoot", "Hibernate", "RESTful APIs", "JPA", "SQL", "AWS S3", "Saml SSO", "OOP", "DSA", "JSP"],
        "Developer Tools": ["Git", "Docker", "Maven", "Postman", "IntelliJ IDEA"],
        "Soft Skills": ["Teamwork", "Problem-solving", "Flexibility", "Communication", "Leadership", "Time Management"]
    },
    journey: [
        { type: 'edu', title: "Completed X Standard", institution: "School Days", period: "2005 - 2017", icon: <SchoolIcon /> },
        { type: 'edu', title: "Completed 12th Standard", institution: "Higher Secondary", period: "2017 - 2019", icon: <SchoolIcon /> },
        { type: 'edu', title: "B.Tech in Computer Science", institution: "APJ Abdul Kalam Technical University", period: "2019 - 2023", icon: <GraduationCapIcon /> },
        { type: 'work', title: "Intern", institution: "KodNest Technologies", period: "Jun 2023 - Jan 2024", points: ["Assisted in the development of Java-based applications.", "Participated in code reviews and learned best practices for writing clean code.", "Collaborated with the team on bug fixing and feature enhancements."], icon: <BriefcaseIcon /> },
        { type: 'work', title: "Java Developer", institution: "Lenok Solutions", period: "Feb 2024 - Present", points: ["Writing efficient, maintainable, and well-documented code adhering to best practices.", "Troubleshooting and resolving complex technical issues to ensure smooth operations.", "Leading backend development for key projects, achieving 100% on-time delivery."], icon: <BriefcaseIcon /> }
    ].reverse(),
    projects: [ 
        { name: "Airport Management System", period: "Feb 2024 - Present", points: ["Translated business requirements into functional, efficient code for application logic.", "Integrated backend systems with external services via RESTful APIs.", "Designed and implemented APIs for the mobile application to enhance accessibility.", "Integrated third-party APIs to streamline operational workflows."]},
        { name: "TuneHub App", period: "Jul 2023 - Jan 2024", points: ["Developed secure user authentication and registration modules.", "Implemented a subscription system using Razorpay for payment processing.", "Created scalable APIs and backend logic with Spring Boot for the web application."]},
        { name: "Spring Auth Server", period: "Jun 2025", points: ["Engineered a centralized authentication server using Spring Security and JWT.", "Implemented OAuth 2.0 and OIDC protocols for secure tokenization.", "Managed client registrations and JWT issuance for microservices.", "Ensured secure, stateless communication across the distributed system."]}
    ]
};

