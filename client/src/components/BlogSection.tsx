import { BookOpen, Calendar, ExternalLink, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime?: string;
  url?: string;
}

interface BlogSectionProps {
  posts: BlogPost[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  if (posts.length === 0) {
    return null;
  }

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
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="blog" 
      className="py-16 md:py-24 lg:py-32 px-6 md:px-12 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden"
    >
      {/* Creative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
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
          <h2 className="text-3xl md:text-5xl font-bold text-foreground font-serif" data-testid="text-blog-heading">
            Blog
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
          {posts.map((post) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="p-6 md:p-8 hover-elevate transition-all border-l-4 border-l-accent group relative overflow-hidden h-full flex flex-col">
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-2xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                />
                
                <div className="relative z-10 flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <motion.div
                      className="flex-shrink-0 w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center relative shadow-md border border-accent/30"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <BookOpen className="w-7 h-7 text-accent relative z-10" strokeWidth={2.5} style={{ opacity: 1 }} />
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="secondary" className="text-xs bg-accent/10 text-accent border-accent/20">
                          {post.category}
                        </Badge>
                        {post.readTime && (
                          <span className="text-xs text-muted-foreground">{post.readTime}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground mb-3">
                        <div className="relative">
                          <div className="absolute inset-0 bg-accent/10 blur-sm rounded"></div>
                          <Calendar className="w-5 h-5 relative drop-shadow-sm" strokeWidth={2.5} />
                        </div>
                        <span className="text-sm">{post.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors" data-testid={`text-post-title-${post.id}`}>
                    {post.title}
                  </h3>
                  
                  <p className="text-base leading-relaxed text-foreground/90 mb-4 flex-1" data-testid={`text-post-excerpt-${post.id}`}>
                    {post.excerpt}
                  </p>
                  
                  {post.url && (
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Button
                          variant="ghost"
                          className="gap-2 p-0 h-auto text-primary hover:text-primary/80"
                          onClick={() => window.open(post.url, '_blank')}
                          data-testid={`button-read-post-${post.id}`}
                        >
                          Read More
                          <ArrowRight className="w-5 h-5 relative drop-shadow-sm" strokeWidth={2.5} />
                        </Button>
                    </motion.div>
                  )}
                </div>
                
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-primary"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: 0 }}
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

