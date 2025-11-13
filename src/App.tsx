import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import NotFound from "@/pages/not-found";
import Favicon from "@/components/Favicon";

import Home from "@/pages/Home";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="light-blue" 
      enableSystem={false}
      themes={[
        "light",
        "dark",
        "light-blue",
        "dark-blue",
        "light-green",
        "dark-green",
        "light-purple",
        "dark-purple",
        "light-fall",
        "dark-fall",
        "light-winter",
        "dark-winter",
        "light-cosmic",
        "dark-cosmic"
      ]}
    >
      <Favicon />
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
