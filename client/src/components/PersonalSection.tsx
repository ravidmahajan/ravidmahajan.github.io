import { Card } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Heart, Star } from "lucide-react";

interface PersonalImage {
  url: string;
  alt: string;
}

interface PersonalSectionProps {
  images: PersonalImage[];
}

export default function PersonalSection({ images }: PersonalSectionProps) {
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

  // Postcard border colors - using theme colors
  const postcardColors = [
    { border: "primary", stamp: "accent" },
    { border: "accent", stamp: "primary" },
    { border: "primary", stamp: "accent" },
    { border: "accent", stamp: "primary" },
    { border: "primary", stamp: "accent" },
    { border: "accent", stamp: "primary" },
  ];

  // Random rotations and positions for scattered postcard layout
  const getPostcardStyle = (index: number) => {
    const rotations = [-2, 3, -3, 2, -1, 4];
    const positionsDesktop = [
      { top: "0%", left: "0%" },
      { top: "8%", left: "50%" },
      { top: "35%", left: "5%" },
      { top: "20%", left: "55%" },
      { top: "55%", left: "0%" },
      { top: "45%", left: "50%" },
    ];
    const positionsMobile = [
      { top: "0%", left: "0%" },
      { top: "40%", left: "0%" },
      { top: "80%", left: "0%" },
      { top: "0%", left: "50%" },
      { top: "40%", left: "50%" },
      { top: "80%", left: "50%" },
    ];
    return {
      rotate: rotations[index % rotations.length],
      desktop: positionsDesktop[index % positionsDesktop.length],
      mobile: positionsMobile[index % positionsMobile.length]
    };
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32 px-6 md:px-12 bg-gradient-to-b from-muted/30 via-background to-muted/20 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 100, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            x: [0, -80, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          className="flex items-center gap-4 mb-12 md:mb-16"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/30"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <Mail className="w-6 h-6 md:w-8 md:h-8 text-primary" strokeWidth={2.5} />
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground font-serif" data-testid="text-personal-heading">
            Beyond Work
          </h2>
          <motion.div 
            className="flex-1 h-px bg-gradient-to-r from-border to-transparent"
            initial={{ width: 0 }}
            animate={isInView ? { width: "100%" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>
        
        <motion.p 
          className="text-base md:text-lg text-muted-foreground mb-12 md:mb-16 font-serif italic text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Exploring vibrant cities, enjoying life's moments, and finding inspiration wherever the journey leads.
        </motion.p>
        
        {/* Postcard collage - scattered layout */}
        <motion.div 
          className="relative min-h-[1600px] md:min-h-[1400px]"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <style>{`
            @media (min-width: 768px) {
              .postcard-0 { top: 0%; left: 0%; width: 480px; }
              .postcard-1 { top: 8%; left: 50%; width: 420px; }
              .postcard-2 { top: 35%; left: 5%; width: 420px; }
              .postcard-3 { top: 20%; left: 55%; width: 480px; }
              .postcard-4 { top: 55%; left: 0%; width: 420px; }
              .postcard-5 { top: 45%; left: 50%; width: 420px; }
            }
          `}</style>
          
          {images.map((image, index) => {
            const style = getPostcardStyle(index);
            const colors = postcardColors[index % postcardColors.length];
            const isLarge = index === 0 || index === 3;
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`absolute postcard-${index}`}
                style={{
                  top: style.mobile.top,
                  left: style.mobile.left,
                  width: isLarge ? "340px" : "300px",
                  transform: `rotate(${style.rotate}deg)`
                }}
                whileHover={{ 
                  scale: 1.05, 
                  zIndex: 30,
                  rotate: style.rotate + (index % 2 === 0 ? 1 : -1)
                }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                {/* Postcard */}
                <Card
                  className="overflow-visible bg-card border-4 shadow-xl hover-elevate transition-all group"
                  data-testid={`card-personal-${index}`}
                  style={{
                    borderColor: `hsl(var(--${colors.border}))`,
                    boxShadow: "0 8px 16px rgba(0,0,0,0.15), 0 4px 8px rgba(0,0,0,0.1)"
                  }}
                >
                  {/* Dashed border line (postal style) */}
                  <div 
                    className="absolute top-12 left-0 right-0 h-px border-t-2 border-dashed opacity-30"
                    style={{
                      borderColor: `hsl(var(--${colors.border}))`
                    }}
                  />

                  {/* Photo area */}
                  <div className="relative bg-muted aspect-[4/3] overflow-hidden mt-2">
                    <motion.img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      data-testid={`img-personal-${index}`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                  
                  {/* Message area */}
                  <div className="p-5 bg-card min-h-[110px]">
                    <div className="flex items-start gap-2 mb-2">
                      <div 
                        className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: `hsl(var(--${colors.border}))` }}
                      />
                      <p className="text-sm md:text-base text-foreground font-medium leading-relaxed">
                        {image.alt}
                      </p>
                    </div>
                    
                    {/* Decorative line */}
                    <div 
                      className="mt-3 h-0.5 w-20"
                      style={{
                        backgroundColor: `hsl(var(--${colors.border}) / 0.3)`
                      }}
                    />
                  </div>

                  {/* Corner decoration */}
                  <div 
                    className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 opacity-40"
                    style={{
                      borderColor: `hsl(var(--${colors.border}))`
                    }}
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
