import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (!mounted) return;
    
    // Apply theme classes and data attributes
    const currentTheme = theme || "light";
    
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      if (currentTheme.startsWith("light-") || currentTheme.startsWith("dark-")) {
        const parts = currentTheme.split("-");
        const mode = parts[0]; // "light" or "dark"
        const color = parts.slice(1).join("-"); // Handle multi-word colors like "blue"
        
        // Remove all theme classes first
        document.documentElement.classList.remove("light", "dark");
        // Add the mode class
        document.documentElement.classList.add(mode);
        // Set the data-theme attribute
        document.documentElement.setAttribute("data-theme", color);
      } else {
        // Remove data-theme attribute for base themes
        document.documentElement.removeAttribute("data-theme");
        // Remove all theme classes
        document.documentElement.classList.remove("light", "dark");
        // Add the appropriate class
        if (currentTheme === "light" || currentTheme === "dark") {
          document.documentElement.classList.add(currentTheme);
        } else {
          document.documentElement.classList.add("light");
        }
      }
    });
  }, [theme, mounted]);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all ${
          isScrolled ? "bg-background/80 backdrop-blur-xl border-b shadow-sm" : "bg-transparent"
        }`}
        data-testid="nav-main"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover-elevate active-elevate-2 px-2 py-1 rounded-md transition-all"
            data-testid="button-nav-home"
          >
          </button>
          
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-base font-medium text-muted-foreground hover:text-primary transition-colors relative group"
              data-testid="link-nav-about"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all"></span>
            </button>
            <button
              onClick={() => scrollToSection("experience")}
              className="text-base font-medium text-muted-foreground hover:text-primary transition-colors relative group"
              data-testid="link-nav-experience"
            >
              Experience
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all"></span>
            </button>
            <button
              onClick={() => scrollToSection("research")}
              className="text-base font-medium text-muted-foreground hover:text-primary transition-colors relative group"
              data-testid="link-nav-research"
            >
              Research
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all"></span>
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-base font-medium text-muted-foreground hover:text-primary transition-colors relative group"
              data-testid="link-nav-contact"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all"></span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="relative"
                  data-testid="button-theme-toggle"
                >
                  {mounted && (theme === "dark" || theme?.startsWith("dark-")) ? (
                    <Moon className="w-5 h-5 drop-shadow-md" strokeWidth={2.5} />
                  ) : (
                    <Sun className="w-5 h-5 drop-shadow-md" strokeWidth={2.5} />
                  )}
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Theme</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={mounted ? theme : "light"}
                  onValueChange={handleThemeChange}
                >
                  <DropdownMenuRadioItem value="light">
                    <Sun className="w-4 h-4 mr-2 inline drop-shadow-sm" strokeWidth={2.5} />
                    Light
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">
                    <Moon className="w-4 h-4 mr-2 inline drop-shadow-sm" strokeWidth={2.5} />
                    Dark
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Color Variants</DropdownMenuLabel>
                <DropdownMenuRadioGroup
                  value={mounted ? theme : "light"}
                  onValueChange={handleThemeChange}
                >
                  <DropdownMenuRadioItem value="light-blue">
                    <Palette className="w-4 h-4 mr-2 inline drop-shadow-sm" strokeWidth={2.5} />
                    Light Blue
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark-blue">
                    <Palette className="w-4 h-4 mr-2 inline drop-shadow-sm" strokeWidth={2.5} />
                    Dark Blue
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="light-green">
                    <Palette className="w-4 h-4 mr-2 inline drop-shadow-sm" strokeWidth={2.5} />
                    Light Green
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark-green">
                    <Palette className="w-4 h-4 mr-2 inline drop-shadow-sm" strokeWidth={2.5} />
                    Dark Green
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="light-purple">
                    <Palette className="w-4 h-4 mr-2 inline drop-shadow-sm" strokeWidth={2.5} />
                    Light Purple
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark-purple">
                    <Palette className="w-4 h-4 mr-2 inline drop-shadow-sm" strokeWidth={2.5} />
                    Dark Purple
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Seasonal Themes</DropdownMenuLabel>
                <DropdownMenuRadioGroup
                  value={mounted ? theme : "light"}
                  onValueChange={handleThemeChange}
                >
                  <DropdownMenuRadioItem value="light-fall">
                    <Palette className="w-4 h-4 mr-2 inline drop-shadow-sm" strokeWidth={2.5} />
                    Light Fall
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark-fall">
                    <Palette className="w-4 h-4 mr-2 inline drop-shadow-sm" strokeWidth={2.5} />
                    Dark Fall
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="light-winter">
                    <Palette className="w-4 h-4 mr-2 inline drop-shadow-sm" strokeWidth={2.5} />
                    Light Winter
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark-winter">
                    <Palette className="w-4 h-4 mr-2 inline drop-shadow-sm" strokeWidth={2.5} />
                    Dark Winter
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Cosmic Themes</DropdownMenuLabel>
                <DropdownMenuRadioGroup
                  value={mounted ? theme : "light"}
                  onValueChange={handleThemeChange}
                >
                  <DropdownMenuRadioItem value="light-cosmic">
                    <Palette className="w-4 h-4 mr-2 inline drop-shadow-sm" strokeWidth={2.5} />
                    Light Cosmic
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark-cosmic">
                    <Palette className="w-4 h-4 mr-2 inline drop-shadow-sm" strokeWidth={2.5} />
                    Dark Cosmic
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              size="icon"
              variant="ghost"
              className="md:hidden relative"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 drop-shadow-md" strokeWidth={2.5} />
              ) : (
                <Menu className="w-5 h-5 drop-shadow-md" strokeWidth={2.5} />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-background/95 backdrop-blur-xl md:hidden" data-testid="container-mobile-menu">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-2xl font-medium text-foreground hover:text-primary transition-colors"
              data-testid="link-mobile-about"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("experience")}
              className="text-2xl font-medium text-foreground hover:text-primary transition-colors"
              data-testid="link-mobile-experience"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection("research")}
              className="text-2xl font-medium text-foreground hover:text-primary transition-colors"
              data-testid="link-mobile-research"
            >
              Research
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-2xl font-medium text-foreground hover:text-primary transition-colors"
              data-testid="link-mobile-contact"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </>
  );
}
