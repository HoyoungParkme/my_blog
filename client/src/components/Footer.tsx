import { Mail } from "lucide-react";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";
import { profileInfo } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="bg-secondary/50 py-16 mt-20 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h3 className="font-serif text-xl font-semibold mb-2">{profileInfo.name}</h3>
          <p className="text-muted-foreground text-sm">Building digital experiences that matter.</p>
        </div>
        
        <div className="flex gap-6">
          <a 
            href={profileInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors hover:-translate-y-1 transform duration-200"
            data-testid="footer-link-github"
          >
            <SiGithub className="w-5 h-5" />
          </a>
          <a 
            href={profileInfo.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors hover:-translate-y-1 transform duration-200"
            data-testid="footer-link-twitter"
          >
            <SiX className="w-5 h-5" />
          </a>
          <a 
            href={profileInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors hover:-translate-y-1 transform duration-200"
            data-testid="footer-link-linkedin"
          >
            <SiLinkedin className="w-5 h-5" />
          </a>
          <a 
            href={`mailto:${profileInfo.email}`}
            className="text-muted-foreground hover:text-foreground transition-colors hover:-translate-y-1 transform duration-200"
            data-testid="footer-link-email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
        
        <div className="text-sm text-muted-foreground">
          {new Date().getFullYear()} {profileInfo.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
