import { useSendMessage } from "@/hooks/use-messages";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function Contact() {
  const { toast } = useToast();
  const sendMessage = useSendMessage();
  
  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    }
  });

  const onSubmit = (data: InsertMessage) => {
    sendMessage.mutate(data, {
      onSuccess: () => {
        form.reset();
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      }
    });
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-serif text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Have a project in mind or just want to say hi? I'm always open to discussing new opportunities and ideas.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary rounded-lg text-foreground">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Email</h3>
                  <a href="mailto:hello@example.com" className="text-muted-foreground hover:text-accent transition-colors">
                    hello@alex.dev
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary rounded-lg text-foreground">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Location</h3>
                  <p className="text-muted-foreground">
                    San Francisco, CA<br/>Available for Remote Work
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card p-8 md:p-10 rounded-3xl border border-border shadow-lg"
          >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  {...form.register("name")} 
                  placeholder="Your name"
                  className="h-12 bg-background"
                />
                {form.formState.errors.name && <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  {...form.register("email")} 
                  placeholder="your@email.com"
                  className="h-12 bg-background"
                />
                {form.formState.errors.email && <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  {...form.register("message")} 
                  placeholder="Tell me about your project..."
                  rows={6}
                  className="bg-background resize-none"
                />
                {form.formState.errors.message && <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>}
              </div>
              
              <Button type="submit" size="lg" className="w-full h-12 text-base" disabled={sendMessage.isPending}>
                {sendMessage.isPending ? "Sending..." : (
                  <>
                    Send Message <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
