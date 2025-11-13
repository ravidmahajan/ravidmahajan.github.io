import { Github, Linkedin, Instagram, Youtube, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SocialLink } from "@shared/schema";

interface SocialLinksProps {
  links: SocialLink[];
}

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
};

const labelMap = {
  github: "GitHub",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  youtube: "YouTube",
  facebook: "Facebook",
};

export default function SocialLinks({ links }: SocialLinksProps) {
  return (
    <div className="fixed bottom-8 right-8 z-50 hidden md:flex flex-col gap-3" data-testid="container-social-links">
      <div className="bg-background/80 backdrop-blur-xl border rounded-2xl p-3 shadow-lg">
        {links.map((link) => {
          const Icon = iconMap[link.platform];
          return (
            <Button
              key={link.platform}
              size="icon"
              variant="ghost"
              asChild
              className="w-12 h-12 hover:text-primary hover:bg-primary/10 transition-all relative group"
              data-testid={`link-${link.platform}`}
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={labelMap[link.platform]}
              >
                <div className="absolute inset-0 bg-primary/10 blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Icon className="w-6 h-6 relative drop-shadow-md group-hover:drop-shadow-lg" strokeWidth={2.5} />
              </a>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
