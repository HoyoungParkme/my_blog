import { motion } from "framer-motion";
import { ArrowRight, Code, Brain, Bot, User, Award, GraduationCap, School } from "lucide-react";
import { Link } from "wouter";
import { ProjectCard } from "@/components/ProjectCard";
import { projects, profileInfo, experiences, certifications, education, academicHistory } from "@/data/portfolio";

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/5 via-background to-background" />
        
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0"
            >
              <div className="w-48 h-64 md:w-56 md:h-72 rounded-xl bg-accent/10 border-4 border-accent/20 flex items-center justify-center overflow-hidden">
                {profileInfo.profileImage ? (
                  <img 
                    src={profileInfo.profileImage} 
                    alt={profileInfo.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-24 h-24 text-accent/50" />
                )}
              </div>
            </motion.div>
            
            <div className="text-center md:text-left">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-accent/10 text-accent border border-accent/20"
              >
                {profileInfo.title}
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
              >
                안녕하세요, <span className="text-accent">{profileInfo.name}</span>입니다
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed"
              >
                {profileInfo.bio}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center md:items-start gap-4"
              >
                <Link href="/projects" className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group">
                  프로젝트 보기
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-serif text-3xl font-bold mb-4">경력</h2>
            <p className="text-muted-foreground">Career Experience</p>
          </motion.div>
          
          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 p-6 bg-background rounded-xl border border-border"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Code className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{exp.company}</h3>
                    <span className="text-sm text-muted-foreground">{exp.period}</span>
                  </div>
                  <p className="text-accent font-medium mb-2">{exp.position}</p>
                  {exp.description && (
                    <p className="text-muted-foreground text-sm">{exp.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl font-bold mb-4">전문 분야</h2>
            <p className="text-muted-foreground">Expertise</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="w-8 h-8" />,
                title: "Video Anomaly Detection",
                desc: "Computer Vision 기반 영상 이상 탐지 시스템 개발"
              },
              {
                icon: <Bot className="w-8 h-8" />,
                title: "AI Agent",
                desc: "자율적으로 작업을 수행하는 AI 에이전트 시스템 개발"
              },
              {
                icon: <Code className="w-8 h-8" />,
                title: "RAG 시스템",
                desc: "검색 증강 생성 시스템을 통한 정확한 정보 제공"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="p-4 bg-accent/10 text-accent rounded-xl mb-6">
                  {item.icon}
                </div>
                <h3 className="font-serif text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-3xl font-bold mb-4">프로젝트</h2>
              <p className="text-muted-foreground">Selected Projects</p>
            </div>
            <Link href="/projects" className="hidden md:flex items-center gap-2 text-accent font-medium hover:underline">
              전체 보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-8">
                <School className="w-8 h-8 text-accent" />
                <h2 className="font-serif text-3xl font-bold">학력</h2>
              </div>

              <div className="space-y-4">
                {academicHistory.map((edu, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 bg-card rounded-xl border border-border hover:border-accent/50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-sm">{edu.name}</h3>
                      <span className="text-xs text-muted-foreground">{edu.period}</span>
                    </div>
                    <p className="text-xs text-accent font-medium">{edu.organizer}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-8">
                <Award className="w-8 h-8 text-accent" />
                <h2 className="font-serif text-3xl font-bold">자격증</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 bg-card rounded-xl border border-border flex items-center gap-3 group hover:border-accent/50 transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span className="font-medium text-sm">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="w-8 h-8 text-accent" />
              <h2 className="font-serif text-3xl font-bold">교육 사항</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 bg-card rounded-xl border border-border hover:border-accent/50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-sm">{edu.name}</h3>
                    <span className="text-xs text-muted-foreground">{edu.period}</span>
                  </div>
                  <p className="text-xs text-accent font-medium">{edu.organizer}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
    </div>
  );
}
