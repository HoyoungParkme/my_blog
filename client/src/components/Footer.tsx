import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary/50 py-16 mt-20 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h3 className="font-serif text-xl font-semibold mb-2">alex.dev</h3>
          <p className="text-muted-foreground text-sm">Building digital experiences that matter.</p>
        </div>
        
        <div className="flex gap-6">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors hover:-translate-y-1 transform duration-200">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors hover:-translate-y-1 transform duration-200">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors hover:-translate-y-1 transform duration-200">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="mailto:hello@example.com" className="text-muted-foreground hover:text-foreground transition-colors hover:-translate-y-1 transform duration-200">
            <Mail className="w-5 h-5" />
          </a>
        </div>
        
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Alex Dev. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
