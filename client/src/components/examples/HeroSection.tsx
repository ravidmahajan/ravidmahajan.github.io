import HeroSection from "../HeroSection";
import heroImage from "@assets/generated_images/Professional_hero_portrait_headshot_d5023c34.png";

export default function HeroSectionExample() {
  return (
    <HeroSection
      name="Your Name"
      tagline="Creative Developer & Designer | Building Beautiful Digital Experiences"
      imageUrl={heroImage}
    />
  );
}
