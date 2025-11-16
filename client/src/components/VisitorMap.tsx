import { useEffect, useState } from "react";

// Convert HSL to Hex
const hslToHex = (h: number, s: number, l: number): string => {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

// Get theme-specific color for map
const getThemeColor = (): string => {
  const root = document.documentElement;
  const isDark = root.classList.contains("dark");
  const theme = root.getAttribute("data-theme") || "default";
  
  // Theme-specific color mappings
  const themeColors: Record<string, { light: string; dark: string }> = {
    default: {
      light: "2d2d2d", // Dark gray for light mode
      dark: "e0e0e0",  // Light gray for dark mode
    },
    blue: {
      light: "1e40af", // Deep blue
      dark: "60a5fa",  // Light blue
    },
    green: {
      light: "166534", // Deep green
      dark: "4ade80",  // Light green
    },
    purple: {
      light: "6b21a8", // Deep purple
      dark: "a78bfa",  // Light purple
    },
    fall: {
      light: "b45309", // Deep orange/amber
      dark: "fbbf24",  // Light amber
    },
    winter: {
      light: "0369a1", // Deep sky blue
      dark: "7dd3fc",  // Light sky blue
    },
    cosmic: {
      light: "581c87", // Deep violet
      dark: "c084fc",  // Light violet
    },
  };
  
  const themeConfig = themeColors[theme] || themeColors.default;
  return isDark ? themeConfig.dark : themeConfig.light;
};

export default function VisitorMap() {
  const [mapColor, setMapColor] = useState(getThemeColor());
  const [isDark, setIsDark] = useState(() => 
    document.documentElement.classList.contains("dark")
  );
  const [theme, setTheme] = useState(() => 
    document.documentElement.getAttribute("data-theme") || "default"
  );

  useEffect(() => {
    // Update color when theme changes
    const updateColor = () => {
      const root = document.documentElement;
      setMapColor(getThemeColor());
      setIsDark(root.classList.contains("dark"));
      setTheme(root.getAttribute("data-theme") || "default");
    };

    // Watch for theme changes (both class and data-theme attribute)
    const observer = new MutationObserver(updateColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    // Load MapMyVisitors tracking script
    if (document.getElementById("mapmyvisitors")) {
      return () => observer.disconnect();
    }

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.id = "mapmyvisitors";
    script.src = `//mapmyvisitors.com/map.js?d=6eF17bavwNJFz7ix-ybZVcge_bMw5FFZJGD11Z-U-y8&cl=${mapColor}`;
    script.async = true;
    document.body.appendChild(script);

    // Hide any maps that the script might inject
    const hideInjectedMaps = () => {
      const injectedMaps = document.querySelectorAll('[id*="mapmyvisitors"], [class*="mapmyvisitors"]');
      injectedMaps.forEach((map) => {
        if (map instanceof HTMLElement) {
          map.style.display = "none";
        }
      });
    };

    const interval = setInterval(hideInjectedMaps, 500);
    script.onload = () => {
      setTimeout(hideInjectedMaps, 1000);
    };

    return () => {
      observer.disconnect();
      clearInterval(interval);
      const existingScript = document.getElementById("mapmyvisitors");
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [mapColor]);

  // Use higher resolution and better quality parameters
  const mapUrl = `https://mapmyvisitors.com/map.png?d=6eF17bavwNJFz7ix-ybZVcge_bMw5FFZJGD11Z-U-y8&cl=${mapColor}&w=800`;

  return (
    <div className="w-full flex flex-col items-center mt-8">
      <div className="w-full max-w-5xl">
        <a 
          href="https://mapmyvisitors.com/web/1c0or" 
          title="Visit tracker"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-lg overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-colors shadow-lg hover:shadow-xl bg-card/50"
        >
          <img 
            key={`${mapColor}-${isDark}-${theme}`}
            src={mapUrl}
            alt="Visitor map"
            className="w-full h-auto"
            style={{ 
              minHeight: '450px',
              maxHeight: '600px',
              objectFit: 'contain',
              imageRendering: '-webkit-optimize-contrast',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
              WebkitBackfaceVisibility: 'hidden',
              filter: isDark 
                ? 'brightness(0.9) contrast(1.1) saturate(1.2)' 
                : 'brightness(1) contrast(1.05) saturate(1.1)',
              WebkitFilter: isDark 
                ? 'brightness(0.9) contrast(1.1) saturate(1.2)' 
                : 'brightness(1) contrast(1.05) saturate(1.1)'
            }}
            loading="eager"
            decoding="async"
          />
        </a>
      </div>
      <p className="text-center text-xs text-muted-foreground mt-4">
        Visitor statistics at{" "}
        <a
          href="https://mapmyvisitors.com/web/1c0or"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          mapmyvisitors.com
        </a>
      </p>
    </div>
  );
}

