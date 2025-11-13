import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import PersonalSection from "@/components/PersonalSection";
import ResearchSection from "@/components/ResearchSection";
import ProjectsSection from "@/components/ProjectsSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import SeasonalEffects from "@/components/SeasonalEffects";
import profileImage from "@assets/IMG-20250330-WA0027 - Copy (2)_1762147986482.jpg";
import personal1 from "@assets/IMG-20241012-WA0032_1762148422293.jpg";
import personal2 from "@assets/IMG-20250329-WA0025_1762148422296.jpg";
import personal3 from "@assets/IMG-20250329-WA0026_1762148422296.jpg";
import personal4 from "@assets/IMG-20250330-WA0026_1762148422297.jpg";
import personal5 from "@assets/IMG-20250330-WA0028_1762148422297.jpg";
import personal6 from "@assets/IMG-20250330-WA0029_1762148422298.jpg";
import type { Experience, SocialLink, ResearchTopic } from "@shared/schema";

export default function Home() {
  const experiences: Experience[] = [
    {
      id: "1",
      position: "Lead Consultant",
      company: "Genpact",
      period: "August 2023 - Present",
      description: "Leading software engineering initiatives, architecting scalable distributed systems, and delivering high-performance solutions across AWS, Azure, and GCP platforms.",
      logoUrl: "https://logo.clearbit.com/genpact.com",
    },
    {
      id: "2",
      position: "Product Manager",
      company: "Growjunction",
      period: "June 2022 - September 2022",
      description: "Conducted market research for TravelSite product, collaborated with UI/UX designers, and increased product launch efficiency by 20% through automation solutions.",
      logoUrl: "https://logo.clearbit.com/growjunction.com",
    },
    {
      id: "3",
      position: "Associate",
      company: "Deutsche Bank",
      period: "December 2020 - June 2022",
      description: "Led full-stack development of Risk Appetite product using Angular, Java, Spring Boot, and Oracle on GCP. Improved efficiency by 50%, reducing document generation time from 2-3 months to 2 weeks.",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/48/Deutsche_Bank-Logo.svg",
    },
    {
      id: "4",
      position: "Software Engineer",
      company: "HSBC",
      period: "April 2018 - November 2020",
      description: "Developed and launched banking applications in 32 global markets using Angular, Java, and AEM. Managed Slack channel for 300+ developers and conducted training sessions for new team members.",
      logoUrl: "https://logo.clearbit.com/hsbc.com",
    },
  ];

  const socialLinks: SocialLink[] = [
    { platform: "facebook", url: "https://facebook.com/raviimahajan" },
    { platform: "instagram", url: "https://www.instagram.com/ravii.mahajan/" },
    { platform: "github", url: "https://github.com/ravidmahajan" },
    { platform: "linkedin", url: "https://www.linkedin.com/in/mahajan-ravi/" },
  ];

  const personalImages = [
    { url: personal1, alt: "Exploring the riverfront" },
    { url: personal2, alt: "City landmarks and skyline moments" },
    { url: personal3, alt: "Fun moments in the city" },
    { url: personal4, alt: "By the harbour in New York" },
    { url: personal5, alt: "Holiday lights in New York" },
    { url: personal6, alt: "Street art and culture in Philadelphia" },
  ];

  const researchTopics: ResearchTopic[] = [
    {
      id: "1",
      title: "Artificial Intelligence & Machine Learning",
      description: "Exploring cutting-edge AI/ML techniques, model architectures, and their applications in solving complex real-world problems.",
      tags: ["AI", "ML", "Deep Learning", "Neural Networks"],
    },
    {
      id: "2",
      title: "Natural Language Processing",
      description: "Researching advanced NLP techniques for text understanding, language generation, and semantic analysis using transformer models and large language models.",
      tags: ["NLP", "LLM", "Transformers", "Text Analytics"],
    },
    {
      id: "3",
      title: "Computer Vision",
      description: "Working on image recognition, object detection, and visual understanding systems using deep learning and convolutional neural networks.",
      tags: ["CV", "Image Processing", "Object Detection", "CNN"],
    },
    {
      id: "4",
      title: "Astronomy",
      description: "Fascinated by the cosmos, studying celestial objects, astrophysics, and the mysteries of the universe through computational methods and data analysis.",
      tags: ["Astrophysics", "Cosmology", "Data Analysis", "Observational Astronomy"],
    },
    {
      id: "5",
      title: "Mathematics",
      description: "Exploring mathematical foundations, algorithms, statistical methods, and their applications in computational sciences and data analysis.",
      tags: ["Statistics", "Linear Algebra", "Calculus", "Discrete Math"],
    },
  ];

  const projects = [
    {
      id: "1",
      title: "CountryPedia",
      description: "A comprehensive Wikipedia for countries providing detailed information about countries worldwide. Built with modern web technologies and deployed on AWS.",
      technologies: ["React", "TypeScript", "AWS", "Amplify", "REST API"],
      liveUrl: "https://master.d265t0m8hlc9w9.amplifyapp.com/",
    },
    {
      id: "2",
      title: "Marketing Analysis for Bookshop",
      description: "Data visualization project analyzing marketing data for a bookshop using Tableau and Power BI. Comprehensive analysis of sales trends, customer behavior, and marketing effectiveness.",
      technologies: ["Tableau", "Power BI", "Data Visualization", "Business Intelligence"],
      liveUrl: "https://docs.google.com/presentation/d/1Wb3eaaqB4sLp8S_jGfHDoqywnBnVSqx_/edit#slide=id.p1",
    },
    {
      id: "3",
      title: "Police Shooting Analysis - United States",
      description: "Comprehensive data analysis and visualization of police shootings in the United States using Google BigQuery, Looker Studio, and Tableau. Interactive dashboards providing insights into patterns and trends.",
      technologies: ["Google BigQuery", "Looker Studio", "Tableau", "Data Analysis", "SQL"],
      liveUrl: "https://lookerstudio.google.com/u/0/reporting/3f5a623e-2964-4927-a8a3-b0ce4340b38c/page/p_0mt2vrem0c",
    },
    {
      id: "4",
      title: "Distributed Cloud Platform",
      description: "Architected and developed a scalable multi-cloud platform supporting AWS, Azure, and GCP with automated deployment pipelines.",
      technologies: ["AWS", "Azure", "GCP", "Kubernetes", "Terraform", "Docker"],
      githubUrl: "https://github.com/ravidmahajan",
      liveUrl: "https://example.com",
    },
    {
      id: "5",
      title: "AI-Powered Analytics Dashboard",
      description: "Built a real-time analytics dashboard with ML-powered insights using React, TypeScript, and Python backend.",
      technologies: ["React", "TypeScript", "Python", "FastAPI", "PostgreSQL", "ML"],
      githubUrl: "https://github.com/ravidmahajan",
    },
    {
      id: "6",
      title: "Microservices Architecture",
      description: "Designed and implemented a microservices-based system using Spring Boot, Java, and event-driven architecture.",
      technologies: ["Java", "Spring Boot", "Kafka", "Redis", "MongoDB"],
      githubUrl: "https://github.com/ravidmahajan",
      liveUrl: "https://example.com",
    },
  ];

  const blogPosts = [
    {
      id: "1",
      title: "Your First Flight into the Cloud: A Beginner's Guide to AWS",
      excerpt: "A comprehensive beginner's guide to getting started with Amazon Web Services (AWS), covering the fundamentals of cloud computing and essential AWS services.",
      date: "2024",
      category: "Cloud",
      readTime: "10 min read",
      url: "https://medium.com/@ravidnya/your-first-flight-into-the-cloud-a-beginners-guide-to-aws-dca26a63a1a2",
    },
    {
      id: "2",
      title: "Building Scalable Distributed Systems",
      excerpt: "Exploring best practices for designing and implementing distributed systems that can handle millions of requests per second while maintaining reliability and performance.",
      date: "March 2024",
      category: "System Design",
      readTime: "5 min read",
      url: "https://example.com/blog/scalable-systems",
    },
    {
      id: "3",
      title: "Multi-Cloud Strategy: Lessons Learned",
      excerpt: "Sharing insights from implementing multi-cloud architectures across AWS, Azure, and GCP, including challenges, solutions, and best practices.",
      date: "February 2024",
      category: "Cloud",
      readTime: "7 min read",
      url: "https://example.com/blog/multi-cloud",
    },
    {
      id: "4",
      title: "AI/ML in Production: MLOps Best Practices",
      excerpt: "A comprehensive guide to deploying and maintaining machine learning models in production environments, covering CI/CD, monitoring, and scaling strategies.",
      date: "January 2024",
      category: "AI/ML",
      readTime: "8 min read",
      url: "https://example.com/blog/mlops",
    },
  ];

  const skillsCategories = [
    {
      title: "Languages",
      skills: ["Java", "Python", "JavaScript", "TypeScript", "Shell scripting", "SQL (Oracle)"],
    },
    {
      title: "Frameworks/Libraries",
      skills: ["Angular 16", "Spring", "Spring Boot", "JDBC", "JPA", "Java MVC", "J2EE", "Microservices", "RESTful APIs", "Bootstrap"],
    },
    {
      title: "Database",
      skills: ["MySQL", "ORACLE", "PostgreSQL"],
    },
    {
      title: "CMS",
      skills: ["AEM"],
    },
    {
      title: "Build Tools",
      skills: ["Webpack", "NPM", "Gulp"],
    },
    {
      title: "Source Control",
      skills: ["Git", "GitHub", "Bitbucket"],
    },
    {
      title: "CI/CD",
      skills: ["Jenkins", "TeamCity"],
    },
    {
      title: "Scripting Language",
      skills: ["HTML", "JavaScript", "Python"],
    },
    {
      title: "Data Visualization Tools",
      skills: ["Power BI", "Tableau"],
    },
    {
      title: "Product Management",
      skills: ["JIRA", "Confluence", "MS Word", "Smartsheet"],
    },
    {
      title: "Cloud Platforms",
      skills: ["AWS", "GCP", "Azure"],
    },
    {
      title: "Other Skills",
      skills: ["Data Structure & Algorithms"],
    },
  ];

  const educations = [
    {
      level: "Masters",
      description: "Master of Science, Management Information Systems",
      institution: "University at Buffalo, The State University of New York",
      location: "New York",
      year: "Jun. 2023",
      relevantCourses: [
        "Digital Product Management",
        "System Analysis & Design",
        "Data Visualization",
        "Database Management",
        "Social Network Analytics"
      ],
    },
    {
      level: "P.g.diploma",
      description: "Post Graduate Diploma, Advanced Computing",
      institution: "University of Pune",
      location: "Pune, India",
      year: "Feb. 2018",
      relevantCourses: [
        "Data Structures & Algorithms",
        "OOPS",
        "Operating Systems",
        "Java (Core + Advanced)",
        "DBMS (SQL)",
        "Advanced Web Technologies"
      ],
    },
    {
      level: "Bachelors",
      description: "Bachelor of Engineering, Electronics and Telecommunication",
      institution: "University of Mumbai",
      location: "Mumbai, India",
      year: "May. 2017",
    },
    {
      level: "High School",
      description: "Computer Science",
      institution: "Birla College",
      location: "Mumbai, India",
      year: "May 2013",
    },
  ];

  return (
    <div className="min-h-screen">
      <SeasonalEffects />
      <ScrollProgress />
      <Navigation />
      <HeroSection
        name="Ravi Mahajan"
        tagline="Lead Consultant | FullStack | DevOps + Multi-Cloud | AI/ML | NLP | CV | GenAI | MLOps"
        imageUrl={profileImage}
        socialLinks={socialLinks}
      />
      <AboutSection
        about="AI Lead Software Engineer with over 6 years of experience architecting and delivering scalable, high-performance distributed systems, Java microservices, and full-stack applications on AWS, Azure, and GCP. Proven expertise in driving 30–50% performance improvements, leading cross-functional teams of 6+, and owning the end-to-end Software Development Life Cycle for mission-critical financial systems. Passionate about system design, cloud architecture, and mentoring teams to deliver innovative, reliable, and fault-tolerant solutions."
      />
      <ExperienceSection experiences={experiences} />
      <SkillsSection categories={skillsCategories} />
      <EducationSection educations={educations} />
      <ProjectsSection projects={projects} />
      <PersonalSection images={personalImages} />
      <ResearchSection topics={researchTopics} />
      <BlogSection posts={blogPosts} />
      <ContactSection
        email="ravi.d.mahajan@gmail.com"
        phone="+1 (716) 292-3111"
        location="Chicago, Illinois"
      />
    </div>
  );
}
