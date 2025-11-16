import { BookOpen, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ResearchTopic } from "@shared/schema";

interface ResearchSectionProps {
  topics: ResearchTopic[];
}

export default function ResearchSection({ topics }: ResearchSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  if (topics.length === 0) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="research" 
      className="py-16 md:py-24 lg:py-32 px-6 md:px-12 bg-gradient-to-b from-background to-muted/30"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="flex items-center gap-4 mb-12 md:mb-16"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground font-serif" data-testid="text-research-heading">
            Research & Interests
          </h2>
          <motion.div 
            className="flex-1 h-px bg-gradient-to-r from-border to-transparent"
            initial={{ width: 0 }}
            animate={isInView ? { width: "100%" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {topics.map((topic) => (
            <motion.div
              key={topic.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card
                className="p-6 md:p-8 hover-elevate transition-all border-l-4 border-l-accent group"
                data-testid={`card-research-${topic.id}`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <motion.div 
                    className="flex-shrink-0 w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center relative shadow-md border border-accent/30"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <BookOpen className="w-7 h-7 text-accent relative z-10" strokeWidth={2.5} style={{ opacity: 1 }} />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors" data-testid={`text-topic-title-${topic.id}`}>
                      {topic.title}
                    </h3>
                  </div>
                </div>
                
                <p className="text-base leading-relaxed text-foreground/90 mb-4" data-testid={`text-topic-description-${topic.id}`}>
                  {topic.description}
                </p>
                
                {topic.tags && topic.tags.length > 0 && (
                  <motion.div 
                    className="flex flex-wrap gap-2 mt-4"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {topic.tags.map((tag, index) => (
                      <motion.div
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Badge variant="secondary" className="text-xs bg-accent/10 text-accent border-accent/20">
                          {tag}
                        </Badge>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-muted-foreground mb-4">Want to collaborate or discuss these topics?</p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              className="gap-2 border-primary/20 hover:border-primary hover:text-primary"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              data-testid="button-reach-out"
            >
              <ExternalLink className="w-5 h-5 drop-shadow-sm" strokeWidth={2.5} />
              Reach Out
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
