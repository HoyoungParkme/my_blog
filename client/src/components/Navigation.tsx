import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { profileInfo } from "@/data/portfolio";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
          {profileInfo.name.toLowerCase().replace(" ", ".")}
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <div className="relative group cursor-pointer py-2">
                <span className={cn(
                  "text-sm font-medium transition-colors duration-200",
                  location === link.href ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                )}>
                  {link.label}
                </span>
                {location === link.href && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute left-0 right-0 bottom-0 h-0.5 bg-accent"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </div>
            </Link>
          ))}
        </nav>
        
        <button 
          className="md:hidden p-2 -mr-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border"
          >
            <nav className="flex flex-col px-6 py-4">
              {links.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className={cn(
                    "py-3 text-lg font-medium border-b border-border/50 last:border-0",
                    location === link.href ? "text-accent" : "text-muted-foreground"
                  )}>
                    {link.label}
                  </div>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
