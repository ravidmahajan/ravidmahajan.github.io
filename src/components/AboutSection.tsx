import { Award, Users, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AboutSectionProps {
  about: string;
}

export default function AboutSection({ about }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const highlights = [
    { icon: TrendingUp, label: "30-50% Performance", sublabel: "Improvements" },
    { icon: Users, label: "Led Teams of 6+", sublabel: "Developers" },
    { icon: Award, label: "Innovation Star", sublabel: "Award Winner" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="about" 
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
          <h2 className="text-3xl md:text-5xl font-bold text-foreground font-serif" data-testid="text-about-heading">
            About Me
          </h2>
          <motion.div 
            className="flex-1 h-px bg-gradient-to-r from-border to-transparent"
            initial={{ width: 0 }}
            animate={isInView ? { width: "100%" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>
        
        <motion.div 
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div 
            className="relative"
            variants={itemVariants}
          >
            <div className="relative">
              <motion.p 
                className="text-base md:text-lg leading-relaxed text-foreground font-serif relative z-10" 
                data-testid="text-about-content"
              >
                {about}
              </motion.p>
              <motion.div
                className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-primary rounded-full opacity-50"
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{ originY: 0 }}
              />
            </div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6"
            variants={containerVariants}
          >
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="p-6 text-center hover-elevate transition-all border-primary/20 relative overflow-hidden group" data-testid={`card-highlight-${index}`}>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                  />
                  <motion.div
                    className="relative z-10"
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="w-20 h-20 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 flex items-center justify-center relative shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl blur-sm"></div>
                      <item.icon className="w-10 h-10 text-primary relative drop-shadow-xl" strokeWidth={2.5} fill="currentColor" fillOpacity={0.1} />
                    </motion.div>
                  </motion.div>
                  <div className="relative z-10">
                    <div className="text-sm font-semibold text-foreground mb-1">{item.label}</div>
                    <div className="text-sm text-muted-foreground">{item.sublabel}</div>
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
            ))}
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="p-6 md:p-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 mt-12">
            <h3 className="text-lg md:text-xl font-semibold mb-4 text-foreground">Technical Expertise</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Cloud & DevOps", desc: "AWS, Azure, GCP, Docker, Kubernetes, Terraform" },
                { title: "Development", desc: "Java, Spring Boot, Angular, React, TypeScript" },
                { title: "AI/ML & Data", desc: "PyTorch, LangChain, NLP, CV, GenAI, MLOps" }
              ].map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <h4 className="font-medium text-primary mb-2">{tech.title}</h4>
                  <p className="text-sm text-muted-foreground">{tech.desc}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
