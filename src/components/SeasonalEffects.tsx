import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

interface Particle {
  id: number;
  left: number;
  top?: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
  rotationSpeed?: number;
  driftAmount?: number;
  scale?: number;
  type?: "star" | "planet" | "shooting-star";
  planetColor?: string;
  planetDetailX?: number;
  planetDetailY?: number;
  planetName?: string;
  starName?: string;
  orbitRadius?: number;
  orbitDuration?: number;
  verticalDrift?: number;
  twinkleOffset?: number;
}

export default function SeasonalEffects() {
  const { theme } = useTheme();
  const [season, setSeason] = useState<"fall" | "winter" | "cosmic" | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Check if theme is fall, winter, or cosmic
    const currentTheme = theme || "";
    let currentSeason: "fall" | "winter" | "cosmic" | null = null;
    
    if (currentTheme.includes("fall")) {
      currentSeason = "fall";
    } else if (currentTheme.includes("winter")) {
      currentSeason = "winter";
    } else if (currentTheme.includes("cosmic")) {
      currentSeason = "cosmic";
    }
    
    setSeason(currentSeason);

    if (!currentSeason) {
      setParticles([]);
      return;
    }

    // Generate particles - increased frequency
    let particleCount = 0;
    if (currentSeason === "winter") {
      particleCount = 60;
    } else if (currentSeason === "fall") {
      particleCount = 35;
    } else if (currentSeason === "cosmic") {
      particleCount = 300; // Many stars for realistic starfield
    }
    
    const newParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => {
      let color = "";
      let type: "star" | "planet" | "shooting-star" = "star";
      let planetColor = "";
      let starName: string | undefined = undefined;
      let planetName: string | undefined = undefined;
      let orbitRadius: number | undefined = undefined;
      let orbitDuration: number | undefined = undefined;
      let verticalDrift: number | undefined = undefined;
      let twinkleOffset: number | undefined = undefined;
      
      if (currentSeason === "fall") {
        // Realistic fall maple leaf colors - more natural variations
        const colors = [
          "#8B4513", // Saddle brown (dried)
          "#A0522D", // Sienna
          "#CD853F", // Peru
          "#D2691E", // Chocolate
          "#B8860B", // Dark goldenrod
          "#DAA520", // Goldenrod
          "#FF8C00", // Dark orange
          "#FF6347", // Tomato
          "#DC143C", // Crimson
          "#B22222", // Fire brick
          "#8B0000", // Dark red
          "#CD5C5C", // Indian red
          "#FF4500", // Orange red
          "#FF7F50", // Coral
          "#FFA500", // Orange
          "#228B22", // Forest green (still transitioning)
          "#2E8B57", // Sea green
          "#6B8E23", // Olive drab
        ];
        color = colors[Math.floor(Math.random() * colors.length)];
      } else if (currentSeason === "cosmic") {
        // Cosmic elements - more realistic distribution
        if (i < 5) {
          // First 5 are planets
          type = "planet";
          const planetData = [
            { name: "Mars", color: "#CD5C5C", size: 35 },
            { name: "Neptune", color: "#4169E1", size: 50 },
            { name: "Saturn", color: "#FAD5A5", size: 60 },
            { name: "Jupiter", color: "#D2691E", size: 65 },
            { name: "Venus", color: "#FFC649", size: 40 },
          ];
          const planet = planetData[i % planetData.length];
          planetName = planet.name;
          planetColor = planet.color;
          color = planetColor;
          orbitRadius = 12 + Math.random() * 24;
          orbitDuration = 28 + Math.random() * 25;
          verticalDrift = 6 + Math.random() * 12;
        } else if (i < 12) {
          // Next 7 are shooting stars
          type = "shooting-star";
          color = "#FFFFFF";
        } else {
          // Rest are stars - realistic star colors (blue, white, yellow, orange, red)
          type = "star";
          const starType = Math.random();
          if (starType < 0.05) {
            // Blue stars (hot, rare)
            color = "#9BB0FF";
          } else if (starType < 0.15) {
            // White-blue stars
            color = "#AABFFF";
          } else if (starType < 0.50) {
            // White stars (most common)
            color = "#FFFFFF";
          } else if (starType < 0.75) {
            // Blue-white stars
            color = "#E6F3FF";
          } else if (starType < 0.90) {
            // Light blue stars
            color = "#B0D4FF";
          } else if (starType < 0.98) {
            // Medium blue stars
            color = "#87CEEB";
          } else {
            // Cool blue-white stars
            color = "#B0C4DE";
          }
          // Assign names to some bright stars
          const starNames = ["Sirius", "Vega", "Polaris", "Betelgeuse", "Rigel", "Arcturus", "Capella", "Altair", "Spica", "Antares"];
          if (i < 20) {
            starName = starNames[(i - 12) % 10];
          } else {
            starName = undefined;
          }
          twinkleOffset = Math.random() * 1.5;
        }
      }
      
      // More realistic size variation
      let size = 0;
      if (currentSeason === "winter") {
        size = 4 + Math.random() * 10; // Snow: 4-14px
      } else if (currentSeason === "fall") {
        size = 20 + Math.random() * 30; // Leaves: 20-50px
      } else if (currentSeason === "cosmic") {
        if (type === "planet") {
          const planetData = [
            { name: "Mars", size: 35 },
            { name: "Neptune", size: 50 },
            { name: "Saturn", size: 60 },
            { name: "Jupiter", size: 65 },
            { name: "Venus", size: 40 },
          ];
          size = planetData[i % planetData.length].size + Math.random() * 5; // Planets with specific sizes
        } else if (type === "shooting-star") {
          size = 2 + Math.random() * 2; // Shooting stars: 2-4px
        } else {
          // Realistic star sizes - most are tiny, few are larger
          const starSizeRand = Math.random();
          if (starSizeRand < 0.70) {
            size = 0.5 + Math.random() * 1; // Tiny stars: 0.5-1.5px (most common)
          } else if (starSizeRand < 0.90) {
            size = 1.5 + Math.random() * 1.5; // Small stars: 1.5-3px
          } else if (starSizeRand < 0.98) {
            size = 3 + Math.random() * 2; // Medium stars: 3-5px
          } else {
            size = 5 + Math.random() * 3; // Bright stars: 5-8px (rare)
          }
        }
      }
      
      // More realistic duration variation
      let duration = 0;
      if (currentSeason === "winter") {
        duration = 8 + Math.random() * 15; // Snow: 8-23 seconds
      } else if (currentSeason === "fall") {
        duration = 12 + Math.random() * 18; // Leaves: 12-30 seconds
      } else if (currentSeason === "cosmic") {
        if (type === "planet") {
          duration = 20 + Math.random() * 30; // Planets: slow rotation
        } else if (type === "shooting-star") {
          duration = 2 + Math.random() * 3; // Shooting stars: fast
        } else {
          duration = 3 + Math.random() * 5; // Stars: twinkling
        }
      }
      
      return {
        id: i,
        left: Math.random() * 100,
        top: currentSeason === "cosmic" 
          ? (type === "planet" ? 20 + Math.random() * 60 : Math.random() * 100)
          : undefined,
        delay: currentSeason === "cosmic" && type === "shooting-star" 
          ? Math.random() * 10 
          : Math.random() * 8,
        duration: duration,
        size: size,
        color: color,
        type: type,
        planetColor: planetColor,
        planetName: planetName,
        starName: starName,
        planetDetailX: currentSeason === "cosmic" && type === "planet" ? 30 + Math.random() * 40 : undefined,
        planetDetailY: currentSeason === "cosmic" && type === "planet" ? 30 + Math.random() * 40 : undefined,
        rotationSpeed: currentSeason === "winter" 
          ? 0.5 + Math.random() * 1.5
          : currentSeason === "cosmic" && type === "planet"
          ? 0.05 + Math.random() * 0.2
          : 0.3 + Math.random() * 0.7,
        driftAmount: currentSeason === "winter"
          ? 15 + Math.random() * 20
          : currentSeason === "cosmic"
          ? 0
          : 25 + Math.random() * 40,
        scale: 0.8 + Math.random() * 0.4,
        orbitRadius,
        orbitDuration,
        verticalDrift,
        twinkleOffset,
      };
    });
    
    setParticles(newParticles);
  }, [theme]);

  if (!season) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {season === "fall" && (
        <>
          {particles.map((particle) => {
            const drift = particle.driftAmount || 30;
            const rotationSpeed = particle.rotationSpeed || 0.5;
            const scale = particle.scale || 1;
            const isGreen = particle.color.includes("22") || particle.color.includes("32") || particle.color.includes("2E");
            
            return (
            <motion.div
              key={particle.id}
              className="absolute top-0"
              style={{
                left: `${particle.left}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
              initial={{ 
                y: -100,
                rotateX: 0,
                rotateY: 0,
                rotateZ: 0,
                opacity: 0.8,
                scale: scale,
              }}
              animate={{
                y: window.innerHeight + 100,
                rotateX: [0, 180, 360, 180, 0],
                rotateY: [0, 90, 180, 270, 360],
                rotateZ: [0, 25 * rotationSpeed, -25 * rotationSpeed, 15 * rotationSpeed, -15 * rotationSpeed, 5 * rotationSpeed, -5 * rotationSpeed, 0],
                x: [0, drift * 0.3, -drift * 0.2, drift * 0.4, -drift * 0.3, drift * 0.2, -drift * 0.1, 0],
                opacity: [0.8, 0.95, 0.88, 0.92, 0.9, 0.93, 0.85],
                scale: [scale, scale * 1.05, scale * 0.95, scale * 1.02, scale],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1],
              }}
            >
              {/* Realistic Maple Leaf SVG - Enhanced with natural texture and depth */}
              <svg
                viewBox="0 0 100 120"
                fill="none"
                className="w-full h-full"
                style={{
                  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
                }}
              >
                <defs>
                  {/* Gradient for natural leaf color variation */}
                  <linearGradient id={`leafGrad-${particle.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={particle.color} stopOpacity="1" />
                    <stop offset="50%" stopColor={particle.color} stopOpacity="0.98" />
                    <stop offset="100%" stopColor={isGreen ? "#1a5f1a" : "#8B0000"} stopOpacity="0.92" />
                  </linearGradient>
                  {/* Highlight gradient */}
                  <radialGradient id={`leafHighlight-${particle.id}`} cx="45%" cy="35%" r="60%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.25)" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="rgba(255,255,255,0.1)" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                  </radialGradient>
                  {/* Shadow gradient */}
                  <radialGradient id={`leafShadow-${particle.id}`} cx="55%" cy="65%" r="50%">
                    <stop offset="0%" stopColor="transparent" stopOpacity="0" />
                    <stop offset="100%" stopColor={isGreen ? "#0d3d0d" : "#5a0000"} stopOpacity="0.3" />
                  </radialGradient>
                </defs>
                
                {/* Classic Maple Leaf Shape - Exact match to reference images */}
                {/* 5-lobed palmate shape with deep indentations and serrated edges */}
                <path
                  d="M50 0
                     L48 0.5 L46 1.2 L44 2.5 L42 4.2 L40 6.5 L38 9.5 L36 13.5 L34 18.5 L32 24.5 L30 31.5 L28 39.5 L26 48.5 L24 58 L22 67.5 L20 76.5 L19 84.5 L20 91 L22 95.5 L25 98 L28 99 L32 99 L36 98 L40 96 L44 93 L48 89 L50 85
                     L52 89 L56 93 L60 96 L64 98 L68 99 L72 99 L75 98 L78 95.5 L80 91 L81 84.5 L80 76.5 L78 67.5 L76 58 L74 48.5 L72 39.5 L70 31.5 L68 24.5 L66 18.5 L64 13.5 L62 9.5 L60 6.5 L58 4.2 L56 2.5 L54 1.2 L52 0.5 L50 0 Z
                     M50 85
                     L48 87 L46 89 L45 91 L46 93 L48 94.5 L50 95 L52 94.5 L54 93 L55 91 L54 89 L52 87 L50 85 Z"
                  fill={`url(#leafGrad-${particle.id})`}
                  opacity="0.98"
                />
                
                {/* Natural highlight overlay */}
                <path
                  d="M50 0
                     L48 0.5 L46 1.2 L44 2.5 L42 4.2 L40 6.5 L38 9.5 L36 13.5 L34 18.5 L32 24.5 L30 31.5 L28 39.5 L26 48.5 L24 58 L22 67.5 L20 76.5 L19 84.5 L20 91 L22 95.5 L25 98 L28 99 L32 99 L36 98 L40 96 L44 93 L48 89 L50 85
                     L52 89 L56 93 L60 96 L64 98 L68 99 L72 99 L75 98 L78 95.5 L80 91 L81 84.5 L80 76.5 L78 67.5 L76 58 L74 48.5 L72 39.5 L70 31.5 L68 24.5 L66 18.5 L64 13.5 L62 9.5 L60 6.5 L58 4.2 L56 2.5 L54 1.2 L52 0.5 L50 0 Z
                     M50 85
                     L48 87 L46 89 L45 91 L46 93 L48 94.5 L50 95 L52 94.5 L54 93 L55 91 L54 89 L52 87 L50 85 Z"
                  fill={`url(#leafHighlight-${particle.id})`}
                />
                
                {/* Natural shadow overlay */}
                <path
                  d="M50 0
                     L48 0.5 L46 1.2 L44 2.5 L42 4.2 L40 6.5 L38 9.5 L36 13.5 L34 18.5 L32 24.5 L30 31.5 L28 39.5 L26 48.5 L24 58 L22 67.5 L20 76.5 L19 84.5 L20 91 L22 95.5 L25 98 L28 99 L32 99 L36 98 L40 96 L44 93 L48 89 L50 85
                     L52 89 L56 93 L60 96 L64 98 L68 99 L72 99 L75 98 L78 95.5 L80 91 L81 84.5 L80 76.5 L78 67.5 L76 58 L74 48.5 L72 39.5 L70 31.5 L68 24.5 L66 18.5 L64 13.5 L62 9.5 L60 6.5 L58 4.2 L56 2.5 L54 1.2 L52 0.5 L50 0 Z
                     M50 85
                     L48 87 L46 89 L45 91 L46 93 L48 94.5 L50 95 L52 94.5 L54 93 L55 91 L54 89 L52 87 L50 85 Z"
                  fill={`url(#leafShadow-${particle.id})`}
                />
                
                {/* Serrated edges - subtle serrations along the lobes */}
                <path
                  d="M22 67.5 Q21 68.5, 22 69.5 Q21 70.5, 22 71.5 Q21 72.5, 22 73.5
                     M78 67.5 Q79 68.5, 78 69.5 Q79 70.5, 78 71.5 Q79 72.5, 78 73.5
                     M24 58 Q23 59.5, 24 61 Q23 62.5, 24 64
                     M76 58 Q77 59.5, 76 61 Q77 62.5, 76 64
                     M26 48.5 Q25 50, 26 51.5 Q25 53, 26 54.5
                     M74 48.5 Q75 50, 74 51.5 Q75 53, 74 54.5
                     M28 39.5 Q27 41, 28 42.5 Q27 44, 28 45.5
                     M72 39.5 Q73 41, 72 42.5 Q73 44, 72 45.5
                     M30 31.5 Q29 33, 30 34.5 Q29 36, 30 37.5
                     M70 31.5 Q71 33, 70 34.5 Q71 36, 70 37.5
                     M32 24.5 Q31 26, 32 27.5 Q31 29, 32 30.5
                     M68 24.5 Q69 26, 68 27.5 Q69 29, 68 30.5
                     M34 18.5 Q33 20, 34 21.5 Q33 23, 34 24.5
                     M66 18.5 Q67 20, 66 21.5 Q67 23, 66 24.5
                     M36 13.5 Q35 15, 36 16.5 Q35 18, 36 19.5
                     M64 13.5 Q65 15, 64 16.5 Q65 18, 64 19.5
                     M38 9.5 Q37 11, 38 12.5 Q37 14, 38 15.5
                     M62 9.5 Q63 11, 62 12.5 Q63 14, 62 15.5
                     M40 6.5 Q39 8, 40 9.5 Q39 11, 40 12.5
                     M60 6.5 Q61 8, 60 9.5 Q61 11, 60 12.5
                     M20 76.5 Q19 78, 20 79.5 Q19 81, 20 82.5
                     M80 76.5 Q81 78, 80 79.5 Q81 81, 80 82.5"
                  stroke={isGreen ? "#0d3d0d" : "#5a0000"}
                  strokeWidth="0.8"
                  opacity="0.4"
                  fill="none"
                  strokeLinecap="round"
                />
                
                {/* Central vein - prominent, extends from stem to tip of central lobe */}
                <path
                  d="M50 95 L50 85 L50 50 L50 0"
                  stroke={isGreen ? "#0d3d0d" : "#5a0000"}
                  strokeWidth="3.5"
                  opacity="0.9"
                  strokeLinecap="round"
                  fill="none"
                />
                
                {/* Primary veins - branching from base (around 50,85) into each of the 5 lobes */}
                <path
                  d="M50 85 L20 76.5 L19 84.5
                     M50 85 L28 39.5 L26 48.5
                     M50 85 L72 39.5 L74 48.5
                     M50 85 L80 76.5 L81 84.5
                     M50 95 L45 91 L46 93"
                  stroke={isGreen ? "#0d3d0d" : "#5a0000"}
                  strokeWidth="2.5"
                  opacity="0.85"
                  strokeLinecap="round"
                  fill="none"
                />
                
                {/* Secondary veins - branching from primary veins, creating web-like pattern */}
                <path
                  d="M50 60 L42 58 L38 60
                     M50 50 L36 18.5 L34 24.5
                     M50 40 L38 13.5 L36 18.5
                     M50 60 L58 58 L62 60
                     M50 50 L64 18.5 L66 24.5
                     M50 40 L62 13.5 L64 18.5
                     M50 70 L22 67.5 L20 76.5
                     M50 70 L78 67.5 L80 76.5
                     M50 80 L25 98 L22 95.5
                     M50 80 L75 98 L78 95.5
                     M50 85 L48 87 L46 89"
                  stroke={isGreen ? "#0d3d0d" : "#5a0000"}
                  strokeWidth="1.5"
                  opacity="0.7"
                  strokeLinecap="round"
                  fill="none"
                />
                
                {/* Tertiary veins - fine network branching from secondary veins */}
                <path
                  d="M50 30 L45 9.5 L40 6.5
                     M50 35 L48 13.5 L44 9.5
                     M50 30 L55 9.5 L60 6.5
                     M50 35 L52 13.5 L56 9.5
                     M38 18.5 L30 24.5 L26 31.5
                     M62 18.5 L70 24.5 L74 31.5
                     M50 75 L22 95.5 L20 91
                     M50 75 L78 95.5 L80 91
                     M50 82 L44 93 L42 89
                     M50 82 L56 93 L58 89"
                  stroke={isGreen ? "#0d3d0d" : "#5a0000"}
                  strokeWidth="1"
                  opacity="0.55"
                  strokeLinecap="round"
                  fill="none"
                />
                
                {/* Leaf stem - short, dark brown stem extending downward */}
                <path
                  d="M50 95 L50 100"
                  stroke={isGreen ? "#0d3d0d" : "#5a0000"}
                  strokeWidth="4"
                  opacity="0.95"
                  strokeLinecap="round"
                  fill="none"
                />
                
                {/* Subtle texture spots for realism */}
                <circle cx="35" cy="25" r="1.5" fill={isGreen ? "#0d3d0d" : "#5a0000"} opacity="0.3" />
                <circle cx="65" cy="28" r="1.2" fill={isGreen ? "#0d3d0d" : "#5a0000"} opacity="0.25" />
                <circle cx="28" cy="50" r="1" fill={isGreen ? "#0d3d0d" : "#5a0000"} opacity="0.3" />
                <circle cx="72" cy="52" r="1.3" fill={isGreen ? "#0d3d0d" : "#5a0000"} opacity="0.25" />
                <circle cx="32" cy="75" r="1.1" fill={isGreen ? "#0d3d0d" : "#5a0000"} opacity="0.3" />
                <circle cx="68" cy="78" r="1.4" fill={isGreen ? "#0d3d0d" : "#5a0000"} opacity="0.25" />
              </svg>
        </motion.div>
        );
      })}
        </>
      )}

      {season === "winter" && (
        <>
          {particles.map((particle) => {
            const drift = particle.driftAmount || 15;
            const rotationSpeed = particle.rotationSpeed || 1;
            const scale = particle.scale || 1;
            const isLightTheme = theme?.includes("light");
            // Darker snow for light winter theme
            const snowColor = isLightTheme ? "#E0E0E0" : "white";
            const snowOpacity = isLightTheme ? 0.9 : 0.95;
            const borderColor = isLightTheme ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.15)";
            
            return (
            <motion.div
              key={particle.id}
              className="absolute top-0"
              style={{
                left: `${particle.left}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
              initial={{ 
                y: -100,
                rotate: 0,
                opacity: isLightTheme ? 0.9 : 0.85,
                scale: scale,
              }}
              animate={{
                y: window.innerHeight + 100,
                rotate: 360 * rotationSpeed,
                x: [0, drift * 0.4, -drift * 0.3, drift * 0.5, -drift * 0.4, drift * 0.2, -drift * 0.1, 0],
                opacity: isLightTheme 
                  ? [0.9, 0.98, 0.94, 0.97, 0.95, 0.98, 0.92]
                  : [0.85, 0.98, 0.92, 0.96, 0.94, 0.97, 0.88],
                scale: [scale, scale * 1.1, scale * 0.9, scale * 1.05, scale],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1],
              }}
            >
              {/* Snowflake SVG */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-full h-full"
                style={{
                  filter: isLightTheme 
                    ? "drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
                    : "drop-shadow(0 1px 2px rgba(0,0,0,0.2))",
                }}
              >
                <path
                  d="M12 2L12.5 8L18.5 7L14.5 12L20.5 13L14.5 14L18.5 19L12.5 18L12 24L11.5 18L5.5 19L9.5 14L3.5 13L9.5 12L5.5 7L11.5 8L12 2Z"
                  stroke={borderColor}
                  strokeWidth={isLightTheme ? "0.8" : "0.5"}
                  fill={snowColor}
                  opacity={snowOpacity}
                />
                <circle 
                  cx="12" 
                  cy="12" 
                  r="1.5" 
                  fill={snowColor} 
                  stroke={borderColor} 
                  strokeWidth={isLightTheme ? "0.5" : "0.3"} 
                  opacity={snowOpacity} 
                />
                <path
                  d="M12 2L12 22M2 12L22 12M5 5L19 19M19 5L5 19"
                  stroke={snowColor}
                  strokeWidth={isLightTheme ? "1" : "0.8"}
                  opacity={isLightTheme ? 0.9 : 0.8}
                />
                <path
                  d="M12 2L12 22M2 12L22 12M5 5L19 19M19 5L5 19"
                  stroke={borderColor}
                  strokeWidth={isLightTheme ? "0.6" : "0.4"}
                  opacity={isLightTheme ? 0.7 : 0.6}
                />
              </svg>
            </motion.div>
            );
          })}
        </>
      )}

      {season === "cosmic" && (
        <>
          {/* Deep Space Background - Multiple layers for depth */}
          <div 
            className="absolute inset-0"
            style={{
              background: theme?.includes("light")
                ? `linear-gradient(180deg, #88bfff 0%, #3a7bd5 35%, #0f2657 100%),
                   radial-gradient(ellipse at 20% 25%, rgba(255,255,255,0.35) 0%, transparent 45%),
                   radial-gradient(ellipse at 80% 30%, rgba(173, 216, 230, 0.25) 0%, transparent 50%),
                   radial-gradient(ellipse at 40% 75%, rgba(135, 206, 250, 0.2) 0%, transparent 55%)`
                : `linear-gradient(180deg, #020824 0%, #041a3a 45%, #010b1f 100%),
                   radial-gradient(ellipse at 20% 20%, rgba(72, 149, 239, 0.25) 0%, transparent 50%),
                   radial-gradient(ellipse at 75% 35%, rgba(46, 118, 209, 0.2) 0%, transparent 55%),
                   radial-gradient(ellipse at 35% 70%, rgba(21, 61, 139, 0.18) 0%, transparent 60%)`,
            }}
          />
          
          {/* Distant Star Clusters - Subtle background stars */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`cluster-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
                background: `radial-gradient(circle, rgba(255,255,255,${0.3 + Math.random() * 0.4}) 0%, transparent 70%)`,
                boxShadow: `0 0 ${2 + Math.random() * 3}px rgba(255,255,255,0.5)`,
                opacity: 0.4 + Math.random() * 0.3,
              }}
            />
          ))}
          
          {/* Stars - Realistic twinkling and glow */}
          {particles.filter(p => p.type === "star").map((particle) => {
            const brightness = particle.size > 3 ? 1 : 0.6 + (particle.size / 3) * 0.4;
            const glowIntensity = particle.size > 3 ? 1.5 : 0.8;
            
            return (
            <motion.div
              key={particle.id}
              className="absolute rounded-full group cursor-pointer"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top || 0}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
              initial={{ opacity: brightness * 0.4 }}
              animate={{
                opacity: [
                  brightness * 0.4, 
                  brightness * 1.0, 
                  brightness * 0.6, 
                  brightness * 0.9, 
                  brightness * 0.5,
                  brightness * 1.0,
                  brightness * 0.4
                ],
                scale: [1, 1.15, 0.88, 1.08, 0.95, 1.05, 1],
                x: [-1, 1.5, -2, 1, -0.5, 2, -1],
                y: [-1, 0.5, -1.5, 0.8, -0.3, 1, -1],
              }}
              transition={{
                duration: particle.duration,
                delay: (particle.delay || 0) + (particle.twinkleOffset || 0),
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.15, 0.3, 0.45, 0.6, 0.8, 1],
              }}
            >
              {/* Star core */}
              <div
                className="w-full h-full rounded-full absolute"
                style={{
                  background: `radial-gradient(circle, ${particle.color} 0%, ${particle.color}CC 30%, transparent 70%)`,
                  filter: `brightness(${brightness})`,
                }}
              />
              {/* Star glow - multiple layers for realism */}
              <div
                className="w-full h-full rounded-full absolute"
                style={{
                  background: `radial-gradient(circle, transparent 0%, ${particle.color}40 40%, transparent 80%)`,
                  boxShadow: `
                    0 0 ${particle.size * glowIntensity}px ${particle.color}CC,
                    0 0 ${particle.size * glowIntensity * 2}px ${particle.color}99,
                    0 0 ${particle.size * glowIntensity * 3}px ${particle.color}66
                  `,
                  filter: `blur(${Math.max(0.5, particle.size * 0.3)}px)`,
                }}
              />
              {/* Bright star spikes for larger stars */}
              {particle.size > 3 && (
                <div
                  className="absolute inset-0"
                  style={{
                    background: `
                      linear-gradient(0deg, transparent 45%, ${particle.color}80 50%, transparent 55%),
                      linear-gradient(90deg, transparent 45%, ${particle.color}80 50%, transparent 55%),
                      linear-gradient(45deg, transparent 45%, ${particle.color}60 50%, transparent 55%),
                      linear-gradient(135deg, transparent 45%, ${particle.color}60 50%, transparent 55%)
                    `,
                    opacity: 0.6,
                  }}
                />
              )}
              {particle.starName && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 backdrop-blur-sm text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg border border-white/20">
                  {particle.starName}
                </div>
              )}
            </motion.div>
            );
          })}

          {/* Planets */}
          {particles.filter(p => p.type === "planet").map((particle) => {
            const isSaturn = particle.planetName === "Saturn";
            const isJupiter = particle.planetName === "Jupiter";
            const isMars = particle.planetName === "Mars";
            const isNeptune = particle.planetName === "Neptune";
            const isVenus = particle.planetName === "Venus";
            
            return (
            <motion.div
              key={particle.id}
              className="absolute rounded-full group cursor-pointer"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top || 20}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
            initial={{ rotate: 0 }}
              animate={{
              rotate: 360,
              x: [
                -(particle.orbitRadius || 0),
                0,
                (particle.orbitRadius || 0),
                0,
                -(particle.orbitRadius || 0)
              ],
              y: [
                -(particle.verticalDrift || 0) * 0.5,
                (particle.verticalDrift || 0) * 0.3,
                -(particle.verticalDrift || 0) * 0.6,
                (particle.verticalDrift || 0) * 0.2,
                -(particle.verticalDrift || 0) * 0.5
              ],
              scale: [
                particle.scale || 1,
                (particle.scale || 1) * 1.04,
                (particle.scale || 1) * 0.98,
                (particle.scale || 1) * 1.03,
                particle.scale || 1
              ],
            }}
            transition={{
              duration: particle.orbitDuration || particle.duration * 8,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.25, 0.5, 0.75, 1],
            }}
            >
              <div
                className="w-full h-full rounded-full relative overflow-hidden"
                style={{
                  background: isJupiter
                    ? `linear-gradient(0deg, #D2691E 0%, #FF8C42 15%, #D2691E 30%, #CD853F 45%, #D2691E 60%, #FF8C42 75%, #D2691E 90%, #CD853F 100%)`
                    : isMars
                    ? `radial-gradient(circle at 30% 30%, #CD5C5C 0%, #8B4513 30%, #CD5C5C 60%, #A0522D 100%)`
                    : isNeptune
                    ? `radial-gradient(circle at 30% 30%, #4169E1 0%, #1E90FF 30%, #4169E1 60%, #000080 100%)`
                    : isVenus
                    ? `radial-gradient(circle at 30% 30%, #FFC649 0%, #FFA500 30%, #FFC649 60%, #FF8C00 100%)`
                    : `radial-gradient(circle at 30% 30%, #FAD5A5 0%, #F4A460 40%, #FAD5A5 80%)`,
                  boxShadow: `
                    0 0 ${particle.size * 0.8}px ${particle.planetColor}60,
                    0 0 ${particle.size * 1.5}px ${particle.planetColor}40,
                    inset -${particle.size * 0.4}px -${particle.size * 0.4}px ${particle.size * 0.6}px rgba(0,0,0,0.6),
                    inset ${particle.size * 0.2}px ${particle.size * 0.2}px ${particle.size * 0.3}px rgba(255,255,255,0.1)
                  `,
                }}
              >
                {/* Planet surface details */}
                {isJupiter && (
                  <>
                    {/* Jupiter's bands - more realistic */}
                    <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, transparent 0%, rgba(255,140,66,0.4) 18%, transparent 22%, rgba(139,69,19,0.3) 28%, transparent 32%, rgba(255,140,66,0.35) 38%, transparent 42%, rgba(139,69,19,0.25) 48%, transparent 52%, rgba(255,140,66,0.4) 58%, transparent 62%, rgba(139,69,19,0.3) 68%, transparent 72%, rgba(255,140,66,0.35) 78%, transparent 82%, rgba(139,69,19,0.25) 88%, transparent 100%)` }} />
                    <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)` }} />
                  </>
                )}
                {isMars && (
                  <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at ${particle.planetDetailX || 50}% ${particle.planetDetailY || 50}%, transparent 20%, rgba(139,69,19,0.4) 40%, transparent 60%)` }} />
                )}
                {isSaturn && (
                  <>
                    {/* Saturn's rings - more realistic with multiple ring layers */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] h-[25%] rounded-full border-2 border-yellow-200/50" style={{ boxShadow: `0 0 ${particle.size * 0.4}px rgba(255,215,0,0.4), inset 0 0 ${particle.size * 0.2}px rgba(255,215,0,0.2)` }} />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[145%] h-[20%] rounded-full border border-yellow-300/40" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[140%] h-[18%] rounded-full border border-yellow-100/30" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[135%] h-[15%] rounded-full border border-yellow-200/25" />
                  </>
                )}
                {!isJupiter && !isSaturn && (
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(ellipse at ${particle.planetDetailX || 50}% ${particle.planetDetailY || 50}%, transparent 30%, ${particle.planetColor}CC 50%, transparent 70%)`,
                    }}
                  />
                )}
              </div>
              {particle.planetName && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-black/90 text-white text-sm font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
                  {particle.planetName}
                </div>
              )}
            </motion.div>
            );
          })}

          {/* Shooting Stars - More realistic with longer trails */}
          {particles.filter(p => p.type === "shooting-star").map((particle, idx) => {
            const angle = -35 - Math.random() * 10; // Slight variation in angle
            const startY = Math.random() * 30;
            const endY = startY + window.innerHeight * 0.4;
            
            return (
            <motion.div
              key={particle.id}
              className="absolute"
              style={{
                left: `${particle.left}%`,
                top: `${startY}%`,
                width: `${particle.size * 40}px`,
                height: `${particle.size}px`,
              }}
              initial={{
                x: -200,
                y: 0,
                opacity: 0,
              }}
              animate={{
                x: window.innerWidth + 200,
                y: endY - startY,
                opacity: [0, 1, 1, 0.8, 0],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                repeatDelay: 8 + Math.random() * 15,
                ease: "easeOut",
                times: [0, 0.1, 0.5, 0.9, 1],
              }}
            >
              {/* Main streak */}
              <div
                className="w-full h-full absolute"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${particle.color} 30%, ${particle.color} 70%, transparent 100%)`,
                  boxShadow: `0 0 ${particle.size * 4}px ${particle.color}, 0 0 ${particle.size * 8}px ${particle.color}CC`,
                  transform: `rotate(${angle}deg)`,
                  filter: `blur(${particle.size * 0.3}px)`,
                }}
              />
              {/* Bright core */}
              <div
                className="w-full h-full absolute"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${particle.color} 40%, ${particle.color} 60%, transparent 100%)`,
                  transform: `rotate(${angle}deg)`,
                  filter: `blur(${particle.size * 0.1}px)`,
                }}
              />
            </motion.div>
            );
          })}
        </>
      )}
    </div>
  );
}

