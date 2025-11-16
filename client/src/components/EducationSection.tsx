import { GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface Education {
  level: string;
  description: string;
  institution: string;
  location?: string;
  year?: string;
  relevantCourses?: string[];
  logoUrl?: string;
}

interface EducationSectionProps {
  educations: Education[];
}

export default function EducationSection({ educations }: EducationSectionProps) {
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
    hidden: { opacity: 0, x: -50, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const getLevelColor = (level: string) => {
    // All education levels use the same gradient color
    return "from-primary to-accent";
  };

  const getLevelBadgeVariant = (level: string) => {
    // All education levels use the same variant
    return "default";
  };

  const getLevelBadgeStyle = (level: string) => {
    // All education levels use the same color scheme
    return "bg-primary text-primary-foreground border-primary font-semibold shadow-sm";
  };

  return (
    <section 
      ref={sectionRef}
      id="education" 
      className="py-16 md:py-24 lg:py-32 px-6 md:px-12 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden"
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
            <GraduationCap className="w-6 h-6 md:w-8 md:h-8 text-primary" strokeWidth={2.5} />
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground font-serif" data-testid="text-education-heading">
            Education
          </h2>
          <motion.div 
            className="flex-1 h-px bg-gradient-to-r from-border to-transparent"
            initial={{ width: 0 }}
            animate={isInView ? { width: "100%" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>
        
        <div className="relative">
          {/* Timeline line */}
          <motion.div 
            className="absolute left-8 md:left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-transparent"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ originY: 0 }}
          />
          
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {educations.map((education, index) => {
              const LogoDisplay = ({ logoUrl, institution }: { logoUrl?: string; institution: string }) => {
                const [imageError, setImageError] = useState(false);
                const [imageLoaded, setImageLoaded] = useState(false);

                // Show fallback if no URL or error occurred
                if (!logoUrl) {
                  return (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-xl blur-sm"></div>
                      <GraduationCap className="w-8 h-8 md:w-10 md:h-10 text-primary relative z-10 drop-shadow-lg" strokeWidth={2.5} fill="currentColor" fillOpacity={0.1} />
                    </>
                  );
                }

                // Show fallback if image error occurred
                if (imageError) {
                  return (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-xl blur-sm"></div>
                      <GraduationCap className="w-8 h-8 md:w-10 md:h-10 text-primary relative z-10 drop-shadow-lg" strokeWidth={2.5} fill="currentColor" fillOpacity={0.1} />
                    </>
                  );
                }

                return (
                  <>
                    {/* Loading placeholder */}
                    {!imageLoaded && !imageError && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 animate-pulse">
                        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                      </div>
                    )}
                    {/* Image */}
                    <img
                      src={logoUrl}
                      alt={`${institution} logo`}
                      className={`w-full h-full object-contain p-2 relative z-10 transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                      onLoad={() => {
                        setImageLoaded(true);
                        setImageError(false);
                      }}
                      onError={(e) => {
                        console.error(`Failed to load logo for ${institution}:`, logoUrl);
                        setImageError(true);
                        setImageLoaded(false);
                      }}
                      loading="lazy"
                      style={{ maxWidth: '100%', maxHeight: '100%' }}
                    />
                  </>
                );
              };

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative pl-20 md:pl-24"
                >
                  {/* Timeline dot */}
                  <motion.div
                    className="absolute left-6 md:left-10 top-6 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent border-4 border-background shadow-lg"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.2 }}
                    whileHover={{ scale: 1.5 }}
                  />
                  
                  <motion.div
                    whileHover={{ scale: 1.02, x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="p-6 md:p-8 hover-elevate transition-all border-l-4 border-l-primary group relative overflow-hidden">
                      <motion.div
                        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${getLevelColor(education.level)} rounded-full blur-2xl -mr-16 -mt-16 opacity-0 group-hover:opacity-20 transition-opacity`}
                        initial={false}
                      />
                      
                      <div className="relative z-10">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge 
                                variant={getLevelBadgeVariant(education.level) as any}
                                className={`text-xs md:text-sm px-3 py-1 border ${getLevelBadgeStyle(education.level)}`}
                                data-testid={`badge-level-${index}`}
                              >
                                {education.level}
                              </Badge>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors" data-testid={`text-institution-${index}`}>
                              {education.institution}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              {education.location && (
                                <p className="text-sm md:text-base text-muted-foreground" data-testid={`text-location-${index}`}>
                                  {education.location}
                                </p>
                              )}
                              {education.year && (
                                <>
                                  {education.location && <span className="text-muted-foreground">•</span>}
                                  <p className="text-sm md:text-base font-medium text-primary" data-testid={`text-year-${index}`}>
                                    {education.year}
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                          <motion.div
                            className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl bg-white dark:bg-card flex items-center justify-center relative shadow-md border border-primary/20 overflow-hidden min-h-[80px] md:min-h-[96px]"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.3 }}
                          >
                            <LogoDisplay logoUrl={education.logoUrl} institution={education.institution} />
                          </motion.div>
                        </div>
                      
                      <p className="text-base md:text-lg leading-relaxed text-foreground/90 mb-3" data-testid={`text-description-${index}`}>
                        {education.description}
                      </p>
                      
                      {education.relevantCourses && education.relevantCourses.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-border/50">
                          <p className="text-sm font-semibold text-muted-foreground mb-2">Relevant Courses:</p>
                          <div className="flex flex-wrap gap-2">
                            {education.relevantCourses.map((course, courseIndex) => (
                              <Badge 
                                key={courseIndex}
                                variant="outline"
                                className="text-xs bg-muted/50 text-foreground border-border"
                              >
                                {course}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
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
              </motion.div>
            );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

