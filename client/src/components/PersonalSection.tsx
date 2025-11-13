import { Card } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32 px-6 md:px-12 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden"
    >
      {/* Creative geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border-2 border-primary/10 rounded-lg"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              top: `${20 + i * 25}%`,
              right: `${10 + i * 15}%`,
              rotate: `${45 + i * 30}deg`,
            }}
            animate={{
              rotate: [45 + i * 30, 45 + i * 30 + 360],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          className="flex items-center gap-4 mb-12 md:mb-16"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.6 }}
        >
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
          className="text-base md:text-lg text-muted-foreground mb-12 max-w-3xl font-serif italic"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Exploring vibrant cities, enjoying life's moments, and finding inspiration wherever the journey leads.
        </motion.p>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card
                className="overflow-hidden hover-elevate transition-all border-primary/20 group cursor-pointer relative"
                data-testid={`card-personal-${index}`}
              >
                <div className="aspect-square relative overflow-hidden">
                  <motion.img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    data-testid={`img-personal-${index}`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                    initial={false}
                  >
                    <p className="text-sm font-medium">{image.alt}</p>
                  </motion.div>
                  <motion.div
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                    whileHover={{ scale: 1.2, rotate: 90 }}
                  >
                    <span className="text-white text-xs">+</span>
                  </motion.div>
                </div>
                <motion.div
                  className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 transition-colors rounded-lg"
                  initial={false}
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
