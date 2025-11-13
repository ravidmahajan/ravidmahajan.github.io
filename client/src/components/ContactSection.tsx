import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ContactSectionProps {
  email: string;
  phone?: string;
  location?: string;
}

export default function ContactSection({ email, phone, location }: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

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
      id="contact" 
      className="py-16 md:py-24 lg:py-32 px-6 md:px-12 bg-gradient-to-b from-background to-muted/50 relative overflow-hidden"
    >
      {/* Creative connecting lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <motion.path
            d="M 0,50 Q 200,100 400,50 T 800,50"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-primary"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
          <motion.path
            d="M 0,150 Q 300,200 600,150 T 1200,150"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-accent"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 2, delay: 0.8 }}
          />
        </svg>
      </div>
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent font-serif" data-testid="text-contact-heading">
            Let's Connect
          </h2>
          <motion.p 
            className="text-lg text-muted-foreground font-serif italic"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Open to exciting opportunities and collaborations
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="flex flex-col items-center space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="w-full max-w-md space-y-4">
            <motion.div variants={itemVariants}>
              <Card className="p-6 bg-gradient-to-br from-card to-primary/5 border-primary/20">
                <motion.div
                  whileHover={{ scale: 1.02, x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-4 h-auto py-4 px-0 text-left hover:bg-transparent"
                    onClick={() => copyToClipboard(email, "Email")}
                    data-testid="button-email"
                  >
                    <motion.div 
                      className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 flex items-center justify-center flex-shrink-0 relative shadow-md"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-xl blur-sm"></div>
                      <Mail className="w-6 h-6 text-primary relative drop-shadow-lg" strokeWidth={2.5} fill="currentColor" fillOpacity={0.1} />
                    </motion.div>
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground mb-1">Email</div>
                      <div className="text-base font-medium text-foreground">{email}</div>
                    </div>
                  </Button>
                </motion.div>
              </Card>
            </motion.div>
            
            {phone && (
              <motion.div variants={itemVariants}>
                <Card className="p-6 bg-gradient-to-br from-card to-accent/5 border-accent/20">
                  <motion.div
                    whileHover={{ scale: 1.02, x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-4 h-auto py-4 px-0 text-left hover:bg-transparent"
                      onClick={() => copyToClipboard(phone, "Phone")}
                      data-testid="button-phone"
                    >
                      <motion.div 
                        className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 via-accent/10 to-primary/20 flex items-center justify-center flex-shrink-0 relative shadow-md"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-primary/30 rounded-xl blur-sm"></div>
                        <Phone className="w-6 h-6 text-accent relative drop-shadow-lg" strokeWidth={2.5} fill="currentColor" fillOpacity={0.1} />
                      </motion.div>
                      <div className="flex-1">
                        <div className="text-xs text-muted-foreground mb-1">Phone</div>
                        <div className="text-base font-medium text-foreground">{phone}</div>
                      </div>
                    </Button>
                  </motion.div>
                </Card>
              </motion.div>
            )}
            
            {location && (
              <motion.div variants={itemVariants}>
                <Card className="p-6 border-primary/20">
                  <motion.div 
                    className="flex items-center gap-4"
                    whileHover={{ scale: 1.02, x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div 
                      className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 flex items-center justify-center flex-shrink-0 relative shadow-md"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-xl blur-sm"></div>
                      <MapPin className="w-6 h-6 text-primary relative drop-shadow-lg" strokeWidth={2.5} fill="currentColor" fillOpacity={0.1} />
                    </motion.div>
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground mb-1">Location</div>
                      <div className="text-base font-medium text-foreground" data-testid="text-location">{location}</div>
                    </div>
                  </motion.div>
                </Card>
              </motion.div>
            )}
          </div>
          
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity mt-4"
              data-testid="button-schedule"
              asChild
            >
              <a
                href="https://calendly.com/ravi-d-mahajan/30min"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Calendar className="w-5 h-5 drop-shadow-md" strokeWidth={2.5} />
                Schedule a Chat
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
