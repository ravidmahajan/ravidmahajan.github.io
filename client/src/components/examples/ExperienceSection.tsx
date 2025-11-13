import ExperienceSection from "../ExperienceSection";
import type { Experience } from "@shared/schema";

export default function ExperienceSectionExample() {
  const experiences: Experience[] = [
    {
      id: "1",
      position: "Senior Developer",
      company: "Tech Company",
      period: "2021 - Present",
      description: "Leading development of innovative web applications and mentoring junior developers in modern technologies.",
    },
    {
      id: "2",
      position: "Full Stack Developer",
      company: "Digital Agency",
      period: "2019 - 2021",
      description: "Built responsive web applications using React and Node.js, working closely with design teams.",
    },
    {
      id: "3",
      position: "Frontend Developer",
      company: "Startup Inc",
      period: "2017 - 2019",
      description: "Developed user interfaces for SaaS products, focusing on performance and user experience.",
    },
    {
      id: "4",
      position: "Junior Developer",
      company: "Software Solutions",
      period: "2015 - 2017",
      description: "Started my career building websites and learning best practices in software development.",
    },
  ];

  return <ExperienceSection experiences={experiences} />;
}
