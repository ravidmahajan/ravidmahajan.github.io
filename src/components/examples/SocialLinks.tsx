import SocialLinks from "../SocialLinks";
import type { SocialLink } from "@shared/schema";

export default function SocialLinksExample() {
  const links: SocialLink[] = [
    { platform: "github", url: "https://github.com" },
    { platform: "linkedin", url: "https://linkedin.com" },
    { platform: "instagram", url: "https://instagram.com" },
    { platform: "youtube", url: "https://youtube.com" },
  ];

  return <SocialLinks links={links} />;
}
