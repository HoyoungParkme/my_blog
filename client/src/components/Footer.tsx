import { Mail, Phone, Copy, Check } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { profileInfo } from "@/data/portfolio";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function Footer() {
  const { toast } = useToast();
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
      toast({
        title: "Copied!",
        description: `${type} has been copied to clipboard.`,
      });
      setTimeout(() => setCopiedType(null), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <footer className="bg-secondary/50 py-16 mt-20 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-8">
        <div className="flex gap-4">
          <a 
            href={profileInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-background rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-accent/50 transition-all hover:-translate-y-1 transform duration-200 shadow-sm"
            data-testid="footer-link-github"
          >
            <SiGithub className="w-6 h-6" />
          </a>

          <button
            onClick={() => copyToClipboard(profileInfo.email, "Email")}
            className="p-3 bg-background rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-accent/50 transition-all hover:-translate-y-1 transform duration-200 shadow-sm relative group"
            data-testid="footer-copy-email"
          >
            {copiedType === "Email" ? <Check className="w-6 h-6 text-green-500" /> : <Mail className="w-6 h-6" />}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Copy Email
            </span>
          </button>

          <button
            onClick={() => copyToClipboard(profileInfo.phone!, "Phone")}
            className="p-3 bg-background rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-accent/50 transition-all hover:-translate-y-1 transform duration-200 shadow-sm relative group"
            data-testid="footer-copy-phone"
          >
            {copiedType === "Phone" ? <Check className="w-6 h-6 text-green-500" /> : <Phone className="w-6 h-6" />}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Copy Phone
            </span>
          </button>
        </div>
        
        <div className="text-sm text-muted-foreground">
          {new Date().getFullYear()} {profileInfo.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
