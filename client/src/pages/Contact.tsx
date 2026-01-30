import { Mail, Phone, ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { profileInfo } from "@/data/portfolio";

export default function Contact() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-5xl font-bold mb-6">Contact</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            새로운 프로젝트 제안이나 협업 문의는 언제든 환영합니다.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-card p-8 md:p-12 rounded-3xl border border-border"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary rounded-lg text-foreground">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Email</h3>
                  <a 
                    href={`mailto:${profileInfo.email}`} 
                    className="text-muted-foreground hover:text-accent transition-colors"
                    data-testid="link-email"
                  >
                    {profileInfo.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary rounded-lg text-foreground">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Phone</h3>
                  <p className="text-muted-foreground">
                    {profileInfo.phone}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col justify-center">
              <h3 className="font-semibold text-lg mb-4">Github</h3>
              <div className="flex gap-4">
                <a 
                  href={profileInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  data-testid="link-github"
                >
                  <SiGithub className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border text-center">
            <Button 
              asChild
              size="lg" 
              className="px-8"
            >
              <a href={`mailto:${profileInfo.email}`} data-testid="button-send-email">
                이메일 보내기 <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
