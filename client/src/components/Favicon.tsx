import { useEffect } from "react";
import profileImage from "@assets/IMG-20250330-WA0027 - Copy (2)_1762147986482.jpg";

export default function Favicon() {
  useEffect(() => {
    const createCircularFavicon = (imageUrl: string) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      
      img.onload = () => {
        const size = 64; // Favicon size
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        
        if (!ctx) return;
        
        // Create circular clipping path
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        
        // Draw the image
        ctx.drawImage(img, 0, 0, size, size);
        
        // Convert to data URL
        const dataUrl = canvas.toDataURL("image/png");
        
        // Remove existing favicon links
        const existingLinks = document.querySelectorAll("link[rel*='icon']");
        existingLinks.forEach((link) => link.remove());
        
        // Create new favicon link
        const link = document.createElement("link");
        link.rel = "icon";
        link.type = "image/png";
        link.href = dataUrl;
        document.head.appendChild(link);
        
        // Also add apple-touch-icon for better mobile support
        const appleLink = document.createElement("link");
        appleLink.rel = "apple-touch-icon";
        appleLink.href = dataUrl;
        document.head.appendChild(appleLink);
      };
      
      img.onerror = () => {
        // Fallback to original image if circular conversion fails
        const existingLinks = document.querySelectorAll("link[rel*='icon']");
        existingLinks.forEach((link) => link.remove());
        
        const link = document.createElement("link");
        link.rel = "icon";
        link.type = "image/jpeg";
        link.href = imageUrl;
        document.head.appendChild(link);
      };
      
      img.src = imageUrl;
    };
    
    createCircularFavicon(profileImage);
  }, []);

  return null;
}

