import { Code2, Cloud, Cpu, Github, Linkedin, Instagram, Facebook } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import type { SocialLink } from "@shared/schema";

interface HeroSectionProps {
  name: string;
  tagline: string;
  imageUrl: string;
  socialLinks?: SocialLink[];
}

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
};

const labelMap = {
  github: "GitHub",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  facebook: "Facebook",
};

export default function HeroSection({ name, tagline, imageUrl, socialLinks = [] }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  const [showTooltip, setShowTooltip] = useState(false);

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const skills = ["Full Stack", "Cloud", "AI/ML", "DevOps"];

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10"
    >
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y }}
      >
        <motion.div 
          className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        {/* Creative floating shapes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
      
      <motion.div 
        className="grid md:grid-cols-2 gap-12 md:gap-16 max-w-6xl mx-auto items-center relative z-10"
        style={{ opacity, scale }}
      >
        <motion.div 
          className="space-y-8 order-2 md:order-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="space-y-4">
            <motion.div 
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge variant="secondary" className="text-sm px-3 py-1 bg-primary/10 text-primary border-primary/20" data-testid={`badge-skill-${skill.toLowerCase().replace(/\//g, '-')}`}>
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent" 
              data-testid="text-hero-name"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {name}
            </motion.h1>
          </div>
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground leading-relaxed font-serif" 
            data-testid="text-hero-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {tagline}
          </motion.p>
          <motion.div 
            className="flex flex-wrap gap-6 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <motion.div 
              className="flex items-center gap-3 text-muted-foreground"
              whileHover={{ scale: 1.05, x: 5 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-md rounded-lg"></div>
                <Cloud className="w-6 h-6 text-primary relative drop-shadow-lg" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-medium">Multi-Cloud</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-3 text-muted-foreground"
              whileHover={{ scale: 1.05, x: 5 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-md rounded-lg"></div>
                <Code2 className="w-6 h-6 text-primary relative drop-shadow-lg" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-medium">6+ Years</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-3 text-muted-foreground"
              whileHover={{ scale: 1.05, x: 5 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-md rounded-lg"></div>
                <Cpu className="w-6 h-6 text-primary relative drop-shadow-lg" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-medium">AI/ML Expert</span>
            </motion.div>
          </motion.div>
          
          {/* Social Links */}
          {socialLinks.length > 0 && (
            <motion.div 
              className="flex flex-wrap gap-3 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              {socialLinks.map((link) => {
                const Icon = iconMap[link.platform];
                if (!Icon) return null;
                return (
                  <motion.div
                    key={link.platform}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="icon"
                      variant="ghost"
                      asChild
                      className="w-10 h-10 hover:text-primary hover:bg-primary/10 transition-all relative group"
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={labelMap[link.platform]}
                      >
                        <div className="absolute inset-0 bg-primary/10 blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <Icon className="w-5 h-5 relative drop-shadow-md group-hover:drop-shadow-lg" strokeWidth={2.5} />
                      </a>
                    </Button>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </motion.div>
        
        <motion.div 
          className="order-1 md:order-2 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
            <motion.div 
              className="relative group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={() => setShowTooltip(!showTooltip)}
          >
            <motion.div 
              className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <div className="relative cursor-pointer overflow-visible">
              <motion.img
                src={imageUrl}
                alt={name}
                className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-full object-cover border-4 border-background relative z-10"
                data-testid="img-hero-portrait"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                loading="eager"
              />
            </div>
            
            {/* Hover/Click tooltip */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-full -mt-4 pointer-events-none z-50 md:top-0 md:-translate-y-full md:-translate-x-1/2 md:mt-0 md:-mt-6 rotate-0"
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={showTooltip ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="relative inline-flex items-center justify-center">
                <div className="bg-primary text-primary-foreground px-4 py-2 sm:px-5 sm:py-2.5 rounded-full shadow-2xl whitespace-nowrap font-semibold text-xs sm:text-sm md:text-base tracking-wide">
                  Hi! I&apos;m Ravi
                </div>
                <div className="absolute left-1/2 top-full -translate-x-1/2 -mt-0.5 sm:-mt-1 flex items-center justify-center">
                  <div
                    className="w-0 h-0 border-x-[6px] border-x-transparent border-t-[8px] sm:border-x-[7px] sm:border-t-[9px]"
                    style={{ borderTopColor: "hsl(var(--primary))" }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
