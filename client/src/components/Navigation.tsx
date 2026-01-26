import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [location] = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
          alex.dev
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
        
        {/* Mobile Menu Placeholder - keeping it simple for now, can be expanded */}
        <div className="md:hidden">
          <Link href="/menu" className="p-2 -mr-2">
            <div className="w-6 h-0.5 bg-foreground mb-1.5" />
            <div className="w-6 h-0.5 bg-foreground mb-1.5" />
            <div className="w-6 h-0.5 bg-foreground" />
          </Link>
        </div>
      </div>
    </header>
  );
}
