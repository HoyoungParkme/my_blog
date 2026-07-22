import { useState } from "react";
import { profileInfo } from "@/content/portfolio";

export function Footer() {
  const [copiedType, setCopiedType] = useState<"Email" | "Phone" | null>(null);

  const copyToClipboard = async (text: string, type: "Email" | "Phone") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2000);
    } catch {
      // 클립보드 접근이 차단된 환경에서는 조용히 무시한다.
    }
  };

  return (
    <footer className="py-8 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-[13px] text-muted-foreground">
          {new Date().getFullYear()} {profileInfo.name}. All rights reserved.
        </div>

        <div className="flex items-center gap-7">
          <a
            href={profileInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
            data-testid="footer-link-github"
          >
            GitHub
          </a>

          {profileInfo.blog && (
            <a
              href={profileInfo.blog}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
              data-testid="footer-link-blog"
            >
              Blog
            </a>
          )}

          <button
            onClick={() => copyToClipboard(profileInfo.email, "Email")}
            className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
            data-testid="footer-copy-email"
          >
            {copiedType === "Email" ? "복사됨 ✓" : profileInfo.email}
          </button>

          <button
            onClick={() => copyToClipboard(profileInfo.phone!, "Phone")}
            className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
            data-testid="footer-copy-phone"
          >
            {copiedType === "Phone" ? "복사됨 ✓" : profileInfo.phone}
          </button>
        </div>
      </div>
    </footer>
  );
}
