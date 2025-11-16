import { Code2, Cloud, Cpu } from "lucide-react";
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

const labelMap = {
  github: "GitHub",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  facebook: "Facebook",
};

// Real brand logo SVGs
const getBrandLogo = (platform: string) => {
  const logos: Record<string, string> = {
    github: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
    linkedin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    instagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
    facebook: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
  };
  return logos[platform] || '';
};

const getBrandColor = (platform: string) => {
  const colors: Record<string, string> = {
    github: '#181717',
    linkedin: '#0077B5',
    instagram: '#E4405F',
    facebook: '#1877F2',
  };
  return colors[platform] || 'currentColor';
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

  const skills = ["Full Stack", "Cloud", "AI/ML", "DevOps", "NLP", "CV"];

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
          className="space-y-6 order-2 md:order-1 pt-12 md:pt-16"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="space-y-3">
            <div>
              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent" 
                data-testid="text-hero-name"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {name}
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl lg:text-2xl mt-2 font-medium tracking-wide bg-gradient-to-r from-foreground/70 via-primary/80 to-foreground/70 bg-clip-text text-transparent leading-relaxed"
                style={{
                  fontFamily: "'Noto Sans Devanagari', 'Mukta', 'Poppins', system-ui, sans-serif",
                  lineHeight: '1.5',
                  paddingTop: '0.25rem',
                  paddingBottom: '0.25rem',
                  display: 'block'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                रवि महाजन
              </motion.p>
            </div>
          </div>
          <motion.p 
            className="text-base md:text-lg text-muted-foreground leading-relaxed font-serif" 
            data-testid="text-hero-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {tagline}
          </motion.p>
          <motion.div 
            className="flex flex-wrap gap-2 mt-6 md:mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge variant="secondary" className="text-xs px-2.5 py-0.5 bg-primary/10 text-primary border-primary/20" data-testid={`badge-skill-${skill.toLowerCase().replace(/\//g, '-')}`}>
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
          <motion.div 
            className="flex flex-wrap gap-4 md:gap-6 pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <motion.div 
              className="flex items-center gap-2 text-muted-foreground"
              whileHover={{ scale: 1.05, x: 5 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-md rounded-lg"></div>
                <Cloud className="w-5 h-5 text-primary relative drop-shadow-lg" strokeWidth={2.5} />
              </div>
              <span className="text-xs md:text-sm font-medium">Multi-Cloud</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2 text-muted-foreground"
              whileHover={{ scale: 1.05, x: 5 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-md rounded-lg"></div>
                <Code2 className="w-5 h-5 text-primary relative drop-shadow-lg" strokeWidth={2.5} />
              </div>
              <span className="text-xs md:text-sm font-medium">6+ Years</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2 text-muted-foreground"
              whileHover={{ scale: 1.05, x: 5 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-md rounded-lg"></div>
                <Cpu className="w-5 h-5 text-primary relative drop-shadow-lg" strokeWidth={2.5} />
              </div>
              <span className="text-xs md:text-sm font-medium">AI/ML Expert</span>
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
                const logoSvg = getBrandLogo(link.platform);
                const brandColor = getBrandColor(link.platform);
                if (!logoSvg) return null;
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
                      className="w-10 h-10 hover:bg-primary/10 transition-all relative group"
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={labelMap[link.platform]}
                      >
                        <div className="absolute inset-0 bg-primary/10 blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div 
                          className="w-5 h-5 relative drop-shadow-md group-hover:drop-shadow-lg"
                          dangerouslySetInnerHTML={{ __html: logoSvg }}
                          style={{ color: brandColor }}
                        />
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
