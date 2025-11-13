import PersonalSection from "../PersonalSection";

export default function PersonalSectionExample() {
  const images = [
    { url: "https://via.placeholder.com/400", alt: "Personal moment 1" },
    { url: "https://via.placeholder.com/400", alt: "Personal moment 2" },
    { url: "https://via.placeholder.com/400", alt: "Personal moment 3" },
    { url: "https://via.placeholder.com/400", alt: "Personal moment 4" },
    { url: "https://via.placeholder.com/400", alt: "Personal moment 5" },
    { url: "https://via.placeholder.com/400", alt: "Personal moment 6" },
  ];

  return <PersonalSection images={images} />;
}
