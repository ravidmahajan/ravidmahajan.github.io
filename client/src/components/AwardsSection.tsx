import { Award, Trophy, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AwardItem {
  type: "award" | "certification";
  title: string;
  issuer?: string;
  description?: string;
  date?: string;
  organization?: string;
}

interface AwardsSectionProps {
  awards: AwardItem[];
}

export default function AwardsSection({ awards }: AwardsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
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
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const getIcon = (type: string) => {
    if (type === "award") return Trophy;
    return FileText;
  };

  const getTypeColor = (type: string) => {
    if (type === "award") return "from-primary to-accent";
    return "from-accent to-primary";
  };

  return (
    <section 
      ref={sectionRef}
      id="awards" 
      className="py-16 md:py-24 lg:py-32 px-6 md:px-12 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden"
    >
      {/* Creative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          className="flex items-center gap-4 mb-12 md:mb-16"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <Award className="w-6 h-6 md:w-8 md:h-8 text-primary" strokeWidth={2.5} />
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground font-serif" data-testid="text-awards-heading">
            Awards & Certifications
          </h2>
          <motion.div 
            className="flex-1 h-px bg-gradient-to-r from-border to-transparent"
            initial={{ width: 0 }}
            animate={isInView ? { width: "100%" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {awards.map((award, index) => {
            const Icon = getIcon(award.type);
            return (
              <motion.div
                key={index}
                variants={itemVariants}
              >
                <Card className="p-6 md:p-8 hover-elevate transition-all border-l-4 border-l-primary group relative overflow-hidden h-full">
                  <motion.div
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${getTypeColor(award.type)} rounded-full blur-2xl -mr-16 -mt-16 opacity-0 group-hover:opacity-20 transition-opacity`}
                    initial={false}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-4">
                      <motion.div
                        className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center relative shadow-md border border-primary/30"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="w-8 h-8 text-primary z-10" strokeWidth={2.5} style={{ color: 'hsl(var(--primary))', opacity: 1 }} />
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge 
                            variant={award.type === "award" ? "default" : "secondary"}
                            className={`text-xs px-3 py-1 ${
                              award.type === "award" 
                                ? "bg-primary text-primary-foreground border-primary" 
                                : "bg-accent text-accent-foreground border-accent"
                            } font-semibold shadow-sm`}
                          >
                            {award.type === "award" ? "Award" : "Certification"}
                          </Badge>
                          {award.date && (
                            <span className="text-sm text-muted-foreground">{award.date}</span>
                          )}
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {award.title}
                        </h3>
                        {award.issuer && (
                          <p className="text-base text-primary font-medium mb-2">
                            {award.issuer}
                          </p>
                        )}
                        {award.organization && (
                          <p className="text-sm text-muted-foreground mb-2">
                            {award.organization}
                          </p>
                        )}
                        {award.description && (
                          <p className="text-base leading-relaxed text-foreground/90">
                            {award.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ originX: 0 }}
                  />
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

