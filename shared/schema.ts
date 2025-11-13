import { z } from "zod";

export const experienceSchema = z.object({
  id: z.string(),
  position: z.string(),
  company: z.string(),
  period: z.string(),
  description: z.string(),
  logoUrl: z.string().url().optional(),
});

export const socialLinkSchema = z.object({
  platform: z.enum(["github", "linkedin", "instagram", "youtube", "facebook"]),
  url: z.string().url(),
});

export const researchTopicSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
});

export const bioDataSchema = z.object({
  name: z.string(),
  tagline: z.string(),
  about: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  location: z.string().optional(),
  experiences: z.array(experienceSchema),
  socialLinks: z.array(socialLinkSchema),
  researchTopics: z.array(researchTopicSchema).optional(),
});

export type Experience = z.infer<typeof experienceSchema>;
export type SocialLink = z.infer<typeof socialLinkSchema>;
export type ResearchTopic = z.infer<typeof researchTopicSchema>;
export type BioData = z.infer<typeof bioDataSchema>;
