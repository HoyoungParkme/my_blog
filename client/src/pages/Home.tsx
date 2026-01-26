import { motion } from "framer-motion";
import { ArrowRight, Code, Layout, Smartphone } from "lucide-react";
import { Link } from "wouter";
import { useProjects } from "@/hooks/use-projects";
import { ProjectCard } from "@/components/ProjectCard";

export default function Home() {
  const { data: projects, isLoading } = useProjects();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/5 via-background to-background" />
        
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-accent/10 text-accent border border-accent/20"
          >
            Available for freelance work
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-balance"
          >
            Crafting digital <span className="text-accent">experiences</span> with purpose.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            I'm a full-stack developer and designer who builds accessible, pixel-perfect, and performant web applications.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/projects" className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group">
              View My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/contact" className="w-full sm:w-auto px-8 py-4 bg-secondary text-secondary-foreground rounded-full font-semibold hover:bg-secondary/80 transition-colors border border-border">
              Contact Me
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services/Skills Section */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Layout className="w-8 h-8" />,
                title: "UI/UX Design",
                desc: "Creating intuitive and beautiful interfaces that users love to interact with."
              },
              {
                icon: <Code className="w-8 h-8" />,
                title: "Development",
                desc: "Building robust, scalable applications using modern technologies and best practices."
              },
              {
                icon: <Smartphone className="w-8 h-8" />,
                title: "Responsive",
                desc: "Ensuring your website looks and feels amazing on every device and screen size."
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-background hover:shadow-lg transition-all duration-300"
              >
                <div className="p-4 bg-accent/10 text-accent rounded-xl mb-6">
                  {item.icon}
                </div>
                <h3 className="font-serif text-2xl font-semibold mb-4">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Projects Preview */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-4xl font-bold mb-4">Selected Work</h2>
              <p className="text-muted-foreground">A curated selection of my recent projects.</p>
            </div>
            <Link href="/projects" className="hidden md:flex items-center gap-2 text-accent font-medium hover:underline">
              View all projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              <div className="col-span-full py-20 text-center text-muted-foreground">Loading projects...</div>
            ) : projects?.slice(0, 3).map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Link href="/projects" className="inline-flex items-center gap-2 text-accent font-medium hover:underline">
              View all projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
