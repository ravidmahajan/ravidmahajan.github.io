import { Building2, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import type { Experience } from "@shared/schema";

interface ExperienceSectionProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section 
      ref={sectionRef}
      id="experience" 
      className="py-16 md:py-24 lg:py-32 px-6 md:px-12 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          className="flex items-center gap-4 mb-12 md:mb-16"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground font-serif" data-testid="text-experience-heading">
            Experience
          </h2>
          <motion.div 
            className="flex-1 h-px bg-gradient-to-r from-border to-transparent"
            initial={{ width: 0 }}
            animate={isInView ? { width: "100%" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>
        
        <div className="relative">
          <motion.div 
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent md:transform md:-translate-x-1/2"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ originY: 0 }}
          />
          {/* Creative dots on timeline */}
          {experiences.map((_, index) => (
            <motion.div
              key={index}
              className="absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent border-4 border-background md:transform md:-translate-x-1/2"
              style={{ top: `${(index + 1) * (100 / (experiences.length + 1))}%` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.2 }}
              whileHover={{ scale: 1.5 }}
            />
          ))}
          
          <div className="space-y-8">
            {experiences.map((exp, index) => {
              const cardRef = useRef<HTMLDivElement>(null);
              const cardInView = useInView(cardRef, { once: true, amount: 0.3 });
              const [logoError, setLogoError] = useState(false);
              
              return (
                <motion.div
                  key={exp.id}
                  ref={cardRef}
                  className={`flex gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={cardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Card
                        className="p-6 md:p-8 hover-elevate transition-all bg-card border-l-4 border-l-primary group relative overflow-hidden"
                        data-testid={`card-experience-${exp.id}`}
                      >
                        <motion.div
                          className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity"
                          initial={false}
                        />
                        <div className="flex items-start gap-4 mb-4">
                          <motion.div 
                            className="flex-shrink-0 w-20 h-20 rounded-xl bg-white dark:bg-card flex items-center justify-center relative shadow-lg overflow-hidden border-2 border-primary/20"
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            transition={{ duration: 0.3 }}
                          >
                            {exp.logoUrl && !logoError ? (
                              <img
                                src={exp.logoUrl}
                                alt={`${exp.company} logo`}
                                className="w-full h-full object-contain p-3"
                                loading="lazy"
                                onError={() => setLogoError(true)}
                                style={{ imageRendering: 'high-quality' }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10">
                                <Building2 className="w-8 h-8 text-primary relative drop-shadow-xl" strokeWidth={2.5} fill="currentColor" fillOpacity={0.1} />
                              </div>
                            )}
                          </motion.div>
                          <div className="flex-1">
                            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors" data-testid={`text-position-${exp.id}`}>
                              {exp.position}
                            </h3>
                            <p className="text-lg font-medium text-primary" data-testid={`text-company-${exp.id}`}>
                              {exp.company}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-4 text-muted-foreground">
                          <div className="relative">
                            <div className="absolute inset-0 bg-primary/10 blur-sm rounded"></div>
                            <Calendar className="w-5 h-5 relative drop-shadow-sm" strokeWidth={2.5} />
                          </div>
                          <p className="text-sm" data-testid={`text-period-${exp.id}`}>
                            {exp.period}
                          </p>
                        </div>
                        
                        <p className="text-base leading-relaxed text-foreground/90" data-testid={`text-description-${exp.id}`}>
                          {exp.description}
                        </p>
                      </Card>
                    </motion.div>
                  </div>
                  <div className="hidden md:block w-12 flex-shrink-0"></div>
                  <div className="flex-1 hidden md:block"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
