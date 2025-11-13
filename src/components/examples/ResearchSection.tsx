import ResearchSection from "../ResearchSection";
import type { ResearchTopic } from "@shared/schema";

export default function ResearchSectionExample() {
  const topics: ResearchTopic[] = [
    {
      id: "1",
      title: "Cloud-Native Architecture",
      description: "Exploring scalable microservices patterns and serverless computing paradigms for modern applications.",
      tags: ["AWS", "Kubernetes", "Microservices"],
    },
    {
      id: "2",
      title: "AI/ML in Production",
      description: "Bridging the gap between ML models and production systems through MLOps best practices.",
      tags: ["MLOps", "TensorFlow", "PyTorch"],
    },
  ];

  return <ResearchSection topics={topics} />;
}
