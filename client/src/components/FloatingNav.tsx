import { Link, useLocation } from "wouter";
import { Home, FolderOpen, FileText, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/projects", icon: FolderOpen, label: "Projects" },
  { href: "/blog", icon: FileText, label: "Blog" },
  { href: "/contact", icon: Mail, label: "Contact" },
];

export function FloatingNav() {
  const [location] = useLocation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="flex flex-col gap-2 p-2 bg-card/90 backdrop-blur-md rounded-2xl border border-border shadow-lg">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "p-3 rounded-xl transition-all duration-200 cursor-pointer group relative",
                  isActive 
                    ? "bg-accent text-accent-foreground" 
                    : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                )}
                data-testid={`floating-nav-${item.label.toLowerCase()}`}
              >
                <Icon className="w-5 h-5" />
                <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 text-xs font-medium bg-foreground text-background rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}
