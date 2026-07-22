import { Router as WouterRouter, Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { FloatingNav } from "@/components/layout/FloatingNav";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import Blog from "@/pages/Blog";
import PostDetail from "@/pages/PostDetail";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/projects" component={Projects} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={PostDetail} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const basePath =
    import.meta.env.BASE_URL === "/"
      ? undefined
      : import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <WouterRouter base={basePath}>
      <TooltipProvider>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-background font-sans text-foreground">
          <Navigation />
          <main className="flex-grow">
            <AppRoutes />
          </main>
          <Footer />
          <FloatingNav />
        </div>
        <Toaster />
      </TooltipProvider>
    </WouterRouter>
  );
}

export default App;
